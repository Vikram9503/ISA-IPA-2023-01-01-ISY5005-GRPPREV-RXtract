from paddleocr import PaddleOCR
import asyncio
import websockets
from io import BytesIO
from PIL import Image
import base64
import numpy as np
import json
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os


ocr = PaddleOCR(use_angle_cls=True, lang='en') # need to run only once to download and load model into memory
inventoryLink = 'https://docs.google.com/spreadsheets/d/1BiNltufbq1F4iW5SKrtP_QaQ3wxPYPhsfGPBlyvBR7g/edit?usp=sharing'

batchesRequest = {}

async def handle_image(websocket, path):
    print("WebSocket connection established")
    async for message in websocket:
        # Decode image data
        try:
            # message should include gsheet link and image
            data = json.loads(message)
            link = data["link"]
            image_data = data["image"]
            id = data["id"]
            proceed = data["proceed"]
            if id not in batchesRequest:
                batchesRequest[id] = {
                    "link":link,
                    "image": image_data,
                    "id": id
                }
            else:
                batchesRequest[id]["image"] += image_data
            if proceed:
                result = process(batchesRequest[id])
                del batchesRequest[id]
                await websocket.send(json.dumps(result))
        except Exception as e:
            await websocket.send(json.dumps({
                "ocr_result": [],
                "found_row": {}
            }))
                    
        

    print("WebSocket connection closed")

def process(data):
    link = data["link"]
    image_data = data["image"]
    inventory = load_inventroy_data(link)
    image_data = base64.b64decode(image_data)
    image = Image.open(BytesIO(image_data))   
    result = ocr.ocr(np.array(image))
    print(result)
    txts = [line[1][0] for line in result[0]]
    print(txts)
    found_row = findRow(inventory,txts)
    # for idx in range(len(result)):
    #     res = result[idx]
    #     for line in res:
    #         print(line)

    # Send OCR result back to client
    return {
        "ocr_result": result,
        "found_row": found_row
    }

def load_inventroy_data(link):
    try:
        scope = ['https://www.googleapis.com/auth/spreadsheets']
        creds = ServiceAccountCredentials.from_json_keyfile_name('./gapi.json', scope)

        # authorize access to the Google Sheet using the credentials
        client = gspread.authorize(creds)

        # open the Google Sheet by its URL or title
        # sheet = client.open_by_url('https://docs.google.com/spreadsheets/d/1BiNltufbq1F4iW5SKrtP_QaQ3wxPYPhsfGPBlyvBR7g/edit?usp=sharing').sheet1
        sheet = client.open_by_url(link).sheet1
        # or
        # sheet = client.open('your_sheet_title').sheet1

        # read data from the Google Sheet
        data = sheet.get_all_values()
        return data
    except:
        print("Failed to get inventory")
        raise Exception('Failed to get inventory')
    
def findRow(inventory,ocr_result: list):
    # assume ocr_result is a list of text
    header = inventory[0]
    foundItem = []
    for item in inventory[1:]:
        # itme[0] is the P/N
        for res in ocr_result:
            if item[0] in res:
                foundItem = item
                break
        else:
            continue
        break
    d = {}
    if len(foundItem) > 0:
        # build dict
        for idx,v in enumerate(header):
            d[v] = foundItem[idx]
    return d
    


# Start WebSocket server
async def start_server():
    async with websockets.serve(handle_image, os.environ['HOST'], os.environ['PORT']):
        await asyncio.Future()

asyncio.run(start_server())
