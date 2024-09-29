var version = document.getElementById('version'); // checking if updated
version.innerText = 'javascript 3.7'

var video = document.getElementById('video'); // video streamed 
var canvas = document.getElementById('canvas'); // hidden element 
canvas.style.visibility='hidden'; // makes canvas hidden 
var photo = document.getElementById('photo'); // where the photo is displayed
var startbutton = document.getElementById('startbutton'); // button pressed to capture the photo 

// numbers for the size... arbitrary for now! 
var width = 320; 
var height = 320; 

// get the media from the user's device 
navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("An error occurred");
      });

// take the photo 
startbutton.addEventListener(
  "click",
  (ev) => {
    takepicture();
    ev.preventDefault();
  },
  false,
);

// takes the photo 
  function takepicture() {
    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height); // original drwaing image

      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    } else {
      clearphoto();
    }
  }

// clear photo 
  function clearphoto() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }


// text recognition time 
var codeButton = document.getElementById('codeButton'); // button to be pressed to start the text recognition 
var textRecognitionResults = document.getElementById('result'); // where the text recognition results are to be displayed

// code from the documentation 
const { createWorker } = require('tesseract.js');

const worker = await createWorker('eng');

(async () => {
  const { data: { text } } = await worker.recognize("logo.JPG");
  console.log(text);
  await worker.terminate();
})();

var ver_gemini = document.getElementById("versionGemini"); // checking if updated
ver_gemini.innerText = 'javascript gemini 1.6'; 

// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "compile and only show me the compiled please";

const result = await model.generateContent(prompt);
console.log(result.response.text());
