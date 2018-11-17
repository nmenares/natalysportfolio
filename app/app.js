window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

window.onscroll = function() {
  const navbar = document.getElementById("navBar");
  if (this.screenY >= 20) { navbar.style.boxShadow= "0px 0px 21px #252839";}
};

//canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.fillStyle = "#ffffff";
ctx.rect(0, 0, 800, 500);
ctx.fill();
ctx.font = "100px Megrim";

setTimeout(write, 1);

function write(){
  ctx.fillStyle = "#252839";
  ctx.textBaseline = "top";
  ctx.fillText("Think Out", 180, 40);
  ctx.fillText("Develop", 200, 140);
  ctx.fillText("Test", 290, 240);
  ctx.fillText("Optimize", 200, 340);
}

canvas.addEventListener("mousemove", makeTransparent, true);

function makeTransparent(e){
  e.preventDefault();
  let pos_x = e.screenX;
  let pos_y = e.screenY;
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "#0066FF";
  ctx.beginPath();
  ctx.arc(pos_x - 200, pos_y - 200, 300, 0, 2 * Math.PI, true);
  ctx.fill(); 
}

// timeline
const timeline = document.getElementById("timeLine");
timeline.addEventListener("click", openYear, false);
let id,
    content

const tl_content = document.getElementById("timeline-content");

function openYear(e){
  e.preventDefault();
  id = e.target.id;
  year = document.getElementById(`${id}`);
  content = document.getElementById(`tl-${id}`);

  Array.from(timeline.children).forEach(el => {
    if (el === year) { el.classList.add("selected") } 
    else { el.classList.remove("selected"); }
  });  
    
  Array.from(tl_content.children).forEach (el => {
    if (el === content) { el.classList.remove("hidden");}
    else { el.classList.add("hidden");}
  });  
};

//swipe timeline on mobile
tl_content.addEventListener("touchstart", handleStartTouching, false);

let startX,
    startY,
    distX,
    distY,
    elapsedTime,
    startTime

const threshold = 50,
      allowedTime = 200

function handleStartTouching(e){
  tl_content.addEventListener("touchmove", e => e.preventDefault(), false);
  tl_content.addEventListener("touchend", handleEndTouching, false);
  e.preventDefault();
  const touchObj = e.changedTouches[0];
  distX = 0;
  startX = touchObj.pageX;
  startY = touchObj.pageY;
  startTime = new Date().getTime();
};

function handleEndTouching(e){
  e.preventDefault();
  const touchObj = e.changedTouches[0];
  distX = touchObj.pageX - startX;
  distY = touchObj.pageY - startY;
  elapsedTime = new Date().getTime() - startTime;
  const rightSwipeBol = (elapsedTime <= allowedTime && Math.abs(distX) >= threshold);
  if(rightSwipeBol) { handleSwipe(); }
  else if(Math.abs(distY) > 5) { activeScroll(); };
};

function handleSwipe() {
  if (year) {
    if (distX > 0 && year.id !== "2012") {
      changeYear(-1);
    } else if (distX < 0 && year.id !== "2018") {
      changeYear(1);
    };
  };
};

function changeYear(x) {
  year.classList.remove("selected");
  content.classList.add("hidden");
  id = (parseInt(year.id, 10) + x).toString();
  year = document.getElementById(`${id}`);
  content = document.getElementById(`tl-${id}`);
  year.classList.add("selected");
  content = document.getElementById(`tl-${id}`);
  content.classList.remove("hidden");
};

function activeScroll(e){
    window.scrollBy({left: 0, top: (- 2 * distY) , behavior: "smooth"});
};

//quote
document.addEventListener("DOMContentLoaded", getAPI, true);
const default_content = document.getElementById("quote");
const quote = document.createElement("p");

function getAPI(e) {
  fetch("https://quotes.rest/qod")
    .then(response => response.json())
    .then(data => default_content.appendChild(quote).innerHTML = `"${data.contents.quotes[0].quote}" - ${data.contents.quotes[0].author}`)
};





