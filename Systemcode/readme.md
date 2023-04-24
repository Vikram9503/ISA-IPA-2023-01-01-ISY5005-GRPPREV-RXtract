# Xtract

This is a MVP project to demo the capabilities to extract texts from a image and find a relevant product in the inventory.

## Environment
Python3.9
## Dependencies / Packages
paddlepaddle  
websockets  
numpy  
gspread

## Running the application

1. Install the dependecies `pip install -r requirement.txt`
2. Need to get a service account from google ([Doc](https://cloud.google.com/iam/docs/service-accounts-create "Doc"))
3. Put the exported json file under the Systemcode directory
4. Update the `start.sh` first two lines to be your `HOST` and `PORT`. Default host is `127.0.0.1`, port is `8081`
5. Run `sh start.sh`
6. A page will be opened up and wait for the light change to green and you can start using it

## Using the application
This is the portal page. You can change the inventory list by changing the `Google Sheet Inventory:`. For this guide, i am using [this public sheet](https://docs.google.com/spreadsheets/d/1BiNltufbq1F4iW5SKrtP_QaQ3wxPYPhsfGPBlyvBR7g/edit?usp=sharing "this public sheet")
![1](Systemcode/demo/1.png)
To start, you can click `choose file` and upload a label. For this sample, i am using `web/images/test2.jpg`. There would be a preview for the uploaded image.
![2](Systemcode/demo/2.png)
Click `Recognize Text` to start the process. After processing, the system would help you to find the item in the inventory and also display all the texts detected from the image.
![3](Systemcode/demo/3.png)

**Note**: If you need to test it in mobile, please use a valid `HOST` instead of localhost as well as hosting the webpage (`web`) in a server. 

