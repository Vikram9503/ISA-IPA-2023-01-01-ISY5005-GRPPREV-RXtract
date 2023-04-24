// DOM Elements

const fileInput = document.querySelector("#file-input");
const previewImage = document.querySelector("#preview-image");
const recognizeBtn = document.querySelector("#recognize-btn");
const extractedText = document.querySelector("#extracted-text");
const sheetInput = document.querySelector("#sheet-input");
const retrievedItem = document.querySelector("#retrieved-item");

let resultFile = "";
let _socket = null;

initSocket()

// File Upload Handler
function handleFileUpload() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", (event) => {
    previewImage.src = event.target.result;
  });

  reader.readAsDataURL(file);
}

// OCR Handler
async function handleOCR() {
  // build input
  document.getElementById("loading-overlay").style.display = "block";
  let base64Image = previewImage.src.split(",")[1];
  const size = getByteSize(base64Image);
  console.log(size);
  const id = guidGenerator();
  const link = sheetInput.value;
  const limitSize = 500000;
  if (size > limitSize) {
    const batches = Math.ceil(size / limitSize);
    console.log(batches);
    const splitLen = Math.floor(base64Image.length / batches);
    console.log(splitLen);
    for (let i = 0; i < batches; i++) {
      const _image = base64Image.substring(i * splitLen, (i + 1) * splitLen);
      let proceed = false;
      if (i == batches - 1) {
        proceed = true;
      }
      console.log("send");
      console.log(proceed);
      await sendImage(_image, id, link, proceed);
    }
  } else {
    await sendImage(base64Image, id, link, true);
  }
  // const input = {
  //     "id": ""
  //     "image": previewImage.src.split(",")[1],
  //     "link": sheetInput.value
  // }
  // console.log(input)
  // document.getElementById("loading-overlay").style.display = "block";
  // await socket.send(JSON.stringify(input));
}

// Event Listeners
fileInput.addEventListener("change", handleFileUpload);
recognizeBtn.addEventListener("click", handleOCR);

async function sendImage(image, id, link, proceed) {
  const input = {
    id: id,
    image: image,
    link: link,
    proceed: proceed,
  };
  await _socket.send(JSON.stringify(input));
}

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

function getByteSize(text) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  const sizeInBytes = bytes.length;
  return sizeInBytes;
}

function initSocket() {
  const socket = new WebSocket(`ws://${config.host}:${config.port}`);


  socket.onopen = (event) => {
    console.log("WebSocket connected");
    document
      .getElementsByClassName("status-icon success")[0]
      .classList.add("show");
    document
      .getElementsByClassName("status-icon error")[0]
      .classList.remove("show");
    listenToAll(socket)
  };


  socket.onerror = (event) => {
    console.log("WebSocket error:", event);
    document
      .getElementsByClassName("status-icon success")[0]
      .classList.remove("show");
    document.getElementsByClassName("status-icon error")[0].classList.add("show");
  };

  socket.onclose = (event) => {
    console.log("WebSocket closed:", event);
    document
      .getElementsByClassName("status-icon success")[0]
      .classList.remove("show");
    document.getElementsByClassName("status-icon error")[0].classList.add("show");
    _socket = null
    setTimeout(initSocket,1000)
  };
}

function listenToAll(socket) {
  _socket = socket
  socket.onmessage = (event) => {
    // Display OCR result
    document.getElementById("loading-overlay").style.display = "none";
    console.log(event);
    let result = JSON.parse(event.data);
    const foundItem = result["found_row"];
    const ocrRawData = result["ocr_result"];
    ocrData = ocrRawData[0];
    console.log(ocrData);
  
    if (JSON.stringify(foundItem) != "{}") {
      let outputText = "";
      for (key in foundItem) {
        outputText += `${key}: ${foundItem[key]}<br>`;
      }
      retrievedItem.innerHTML = outputText;
      retrievedItem.style.color = "black";
    } else {
      retrievedItem.innerHTML = "No item found, please take another photo.";
      retrievedItem.style.color = "red";
    }
    //   extractedText.innerHTML = event.data.replace(/\n/g, '<br>');
    // const imageWidth = previewImage.naturalWidth;
    // const imageHeight = previewImage.naturalHeight;
  
    // Create overlay element
    const overlay = document.getElementById("overlay");
    while (overlay.lastElementChild) {
      overlay.removeChild(overlay.lastElementChild);
    }
    console.log(ocrData);
    // Loop through OCR data and create bounding boxes for each word
    ocrData.forEach((res) => {
      const [text, confidence] = res[1];
      let resultText = document.createElement("div");
      resultText.classList.add("result-text");
      resultText.innerHTML = `${text} (${confidence}) `;
      // resultContainer.appendChild(resultText);
      overlay.appendChild(resultText);
    });
  
    // ocrData.text.forEach((text, index) => {
    //   if (ocrData.conf[index] > -1) {
    //     // Create bounding box
    //     const box = document.createElement("div");
    //     box.className = "box";
    //     box.style.left = `${ocrData.left[index]}px`;
    //     box.style.top = `${ocrData.top[index]}px`;
    //     box.style.width = `${ocrData.width[index]}px`;
    //     box.style.height = `${ocrData.height[index]}px`;
    //     // box.innerText = text;
    //     overlay.appendChild(box);
    //     let resultText = document.createElement("div");
    //     resultText.classList.add("result-text");
    //     resultText.style.left = ocrData.left[index] + "px";
    //     resultText.style.top = ocrData.top[index] + "px";
    //     resultText.innerHTML = text;
    //     // resultContainer.appendChild(resultText);
    //     overlay.appendChild(resultText);
    //   }
    // });
  
    // // Scale and position overlay element to match image
    // overlay.style.width = `${imageWidth}px`;
    // overlay.style.height = `${imageHeight}px`;
    // overlay.style.transform = `translate(-50%, -50%) translate(${
    //   imageWidth / 2
    // }px, ${imageHeight / 2}px)`;
  };
}
