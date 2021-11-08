const colorSelect = [...document.getElementsByClassName('colorSelect')],
      input = [...document.querySelectorAll("[type='text']")],
      range = [...document.querySelectorAll("[type='range']")];

let messagText = "о",
    colorsArray = [],
    brightness = .5;

const sendingData = (data) => {
  const request = new XMLHttpRequest();
  request.open('GET',
  data,
  false);
  request.send();
}

const sendMess = () => {
  colorsArray = input[0].value.split(",");
  brightness = input[1].value * 100;
  messagText = input[2].value;


  textBorder = input[3].value * (-1);
  speedLineMovement = input[4].value;

  sendingData(`http://158.46.13.26:10200/message?messag=${messagText}&colorR=${colorsArray[0]}&colorG=${colorsArray[1]
    }&colorB=${colorsArray[2]}&brightness=${brightness}&textBorder=${textBorder
    }&speedLineMovement=${speedLineMovement}`);
}

const restartMake = () => {
  sendingData('http://158.46.13.26:10200/restart?device=ok');
}

restart.addEventListener("click", restartMake);

send.addEventListener("click", sendMess);







// const rgbaToRgb = (r, g, b, a) => {
//     const r3 = Math.round(((1 - a) * 255) + (a * r));
//     const g3 = Math.round(((1 - a) * 255) + (a * g));
//     const b3 = Math.round(((1 - a) * 255) + (a * b));
//
//     const arrayRGBA = [r3, g3, b3];
//
//     send.style.backgroundColor = "rgb("+r3+","+g3+","+b3+")";
//
//     return arrayRGBA;
// }


// let ledArr = [],
//     newColorArr = [],
//     // arrayColors = [200,0,200],
//     ledColor = 300,
//     renderingColor = "hsl(300, 100%, 50%)",  //  "#A52A2A"
//     ledBrightness = "150";
//
// // #A52A2A
// function DCanvas(el) {
//
//   const ctx = el.getContext('2d');
//   const pixel = 20;
//   let is_mouse_down = false;
//
//   this.drawLine = function(x1, y1, x2, y2, color = "gray") {
//     ctx.beginPath();
//     ctx.lineJoin = 'miter';
//     ctx.lineWidth = 1;
//     ctx.moveTo(x1, y1);
//     ctx.lineTo(x2, y2);
//     ctx.stroke();
//   }
//
//   this.clear = function() {
//     ctx.clearRect(0, 0, canv[0].width, canv[0].height);
//   }
//
//   this.drawGrid = function() {
//     const w = canv[0].width;
//     const h = canv[0].height;
//     const p = w / pixel;
//     const xStep = w / p;
//     const yStep = h / p;
//     for(let x = 0; x < w; x += xStep/2.1-0.14) {
//       this.drawLine(x, 0, x, h);
//     }
//     for(let y = 0; y < h; y += yStep*2-1.2) {
//       this.drawLine(0, y, w, y);
//     }
//   }
//
//   this.calculate = function(draw = false) {
//     const w = canv[0].width;
//     const h = canv[0].height;
//     const p = w / pixel;
//
//     const xStep = w / p;
//     const yStep = h / p;
//
//     let ledCount = -1;
//
//     // const getpixelcolour = e => {
//     //   let x = e.offsetX*0.25,
//     //       y = e.offsetY*0.5,
//     //       dataPixel = ctx.getImageData(x, y, x+20, y+20);
//     //   alert(`${data.data[0]},${data.data[1]},${data.data[2]},${data.data[3]}`);
//     // }
//     // canv[0].addEventListener('click',getpixelcolour);
//
//
//     for(let x = 0; x < w; x += xStep/2.1-0.14) {
//       for(let y = 0; y < h; y += yStep*2-1.2) {
//         ledCount++;
//         const data = ctx.getImageData(x, y, xStep/2.1-0.14, yStep*2-1.2);
//         const dataPixel = ctx.getImageData(x+3.5, y+7, 1, 1);  //  3.5,7,2,4.5 ctnter
//
//         let isEmpty = true;
//         for( i = 0; i < data.data.length; i += 10 ) {
//           if (data.data[i] !== 0) {
//             isEmpty = false;
//             break;
//           }
//         }
//         // newColorArr[ledCount] = `rgb(${dataPixel.data[0]},${dataPixel.data[1]},${dataPixel.data[2]})`;
//         if(!isEmpty && draw && ledArr[ledCount] !== renderingColor)  {  //  && newColorArr[ledCount] !== "rgb(0,0,0)"
//
//           //console.log("http://url?"+ledCount);
//
//           ledArr[ledCount] = renderingColor;
//
//           // console.log(data.data[0], data.data[1], data.data[2]);
//
//           sendingData(`/color_led?ledNum=${ledCount}&ledColor=${ledColor}&ledBrightness=${ledBrightness}`);
//         }
//       }
//     }
//   }
//
//   canvWrapper.addEventListener('mousedown', function(e) {
//     is_mouse_down = true;
//     ctx.fillStyle = renderingColor;
//     ctx.strokeStyle = renderingColor;
//     ctx.lineWidth = 5;
//     ctx.beginPath();
//     ctx.arc(e.offsetX*0.25, e.offsetY*0.5, 5 / 2, 0, Math.PI * 2);
//     ctx.fill();
//
//     d.calculate(true);
//   })
//
//   canvWrapper.addEventListener('mouseup', function(e) {
//     is_mouse_down = false;
//   })
//
//   canvWrapper.addEventListener('mousemove', function(e) {
//     if(is_mouse_down) {
//       ctx.fillStyle = renderingColor;
//       ctx.strokeStyle = renderingColor;
//       ctx.lineWidth = 5;
//       ctx.lineTo(e.offsetX*0.25, e.offsetY*0.5);
//       ctx.stroke();
//       ctx.beginPath();
//       ctx.arc(e.offsetX*0.25, e.offsetY*0.5, 5 / 2, 0, Math.PI * 2);
//       ctx.fill();
//       ctx.beginPath();
//       ctx.moveTo(e.offsetX*0.25, e.offsetY*0.5);
//
//       d.calculate(true);
//     }
//   })
// //using the screen
//   el.addEventListener('touchstart', function(e) {
//     is_mouse_down = true;
//     ctx.beginPath();
//   })
//
//   el.addEventListener('touchend', function(e) {
//     is_mouse_down = false;
//   })
//
//   el.addEventListener('touchmove', function(e) {
//     if(is_mouse_down) {
//       d.calculate(true);
//       ctx.fillStyle = renderingColor;
//       ctx.strokeStyle = renderingColor;
//       ctx.lineWidth = 10;
//       ctx.lineTo(e.offsetX*0.25, e.offsetY*0.5);
//       ctx.stroke();
//       ctx.beginPath();
//       ctx.arc(e.offsetX*0.25, e.offsetY*0.5, 10 / 2, 0, Math.PI * 2);
//       ctx.fill();
//       ctx.beginPath();
//       ctx.moveTo(e.offsetX*0.25, e.offsetY*0.5);
//     }
//   })
//
//
//
//   // const getpixelcolour = e => {
//   //   let x = e.offsetX*0.25,
//   //       y = e.offsetY*0.5,
//   //       data = ctx.getImageData(x, y, x+20, y+20);
//   //   alert(`${data.data[0]},${data.data[1]},${data.data[2]},${data.data[3]}`);
//   // }
//   // canv[0].addEventListener('click',getpixelcolour);
//
//
//
//
// }
//
// const colorSet = (elem) => {
//   // canv[1].style.top = "300px";
//   if (elem.target.classList.contains = "colorSelect" && elem.target.name != "text") {
//     // for (let e of colorSelect) {
//     //   if (e.checked) {
//     //     arrayColors = e.value.split(",");
//     //   }
//     // }
//     // arrayColors = elem.target.value.split(",");
//     // renderingColor = `rgb(${elem.target.value})`;
//
//     renderingColor = `hsl(${elem.target.dataset.color},100%,50%)`;
//
//     ledColor = elem.target.value;
//
//     ledArr = [];
//   }
//   d.clear();
//   ledBrightness = input[1].value;
//   document.getElementsByClassName('rangeValue')[0].innerHTML = ledBrightness / 2.5+"%";
// }
//
// radioWrapper.addEventListener("click", colorSet);
//
// const canvCopy = new DCanvas(canv[0]);
// const d = new DCanvas(canv[1]);
//
// const sendingData = (data) => {
//   const request = new XMLHttpRequest();
//   request.open('GET',
//   data,
//   false);
//   request.send();
// }
//
// //d.drawGrid();  // ресует сетку
//
// button[0].onclick = function() {
//   d.clear();
//   canvCopy.clear();
//   sendingData(`/clear_leds`);
// }
