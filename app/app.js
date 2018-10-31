window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imageObj = document.getElementById("img");

imageObj.onload = function() { 
  ctx.drawImage(imageObj, 0, 0, 800, 500);
  ctx.font = '105px Megrim';
  setTimeout(write, 0);
};

function write(){
  ctx.fillStyle = "white";
  ctx.textBaseline = "top";
  ctx.fillText("Think Out", 140, 40);
  ctx.fillText("Develop", 160, 140);
  ctx.fillText("Test", 250, 240);
  ctx.fillText("Optimice", 160, 340);
}

canvas.addEventListener("mousemove", makeTransparent);

function makeTransparent(e){
  e.preventDefault();
  let pos_x = e.screenX;
  let pos_y = e.screenY;
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "#0066FF";
  ctx.beginPath();
  ctx.arc(pos_x - 20, pos_y - 100, 200, 0, 2 * Math.PI, true);
  ctx.fill(); 
}


// timeline
const timeline = document.getElementById("timeLine");
timeline.addEventListener("click", openYear);

const tl_content = document.getElementById("timeline-content")


function openYear(e){
  e.preventDefault();
  Array.from(timeline.children).forEach(el => {
    if (el === e.target) { el.classList.add("selected");} 
    else { el.classList.remove("selected");}
  });  
  
  let id = e.target.id;
  let content = document.getElementById(`tl-${id}`);
  Array.from(tl_content.children).forEach (el => {
    if (el === content) { el.classList.remove("hidden");}
    else { el.classList.add("hidden");}
  });  
};

document.addEventListener("DOMContentLoaded", getAPI);
let default_content = document.getElementById("tl-default");
let quote = document.createElement("p");

function getAPI(e) {
  fetch("https://quotes.rest/qod")
    .then(response => response.json())
    .then(data => default_content.appendChild(quote).innerHTML = `${data.contents.quotes[0].quote} - ${data.contents.quotes[0].author}`)
};





