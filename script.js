const counter = document.getElementById('counter');
const idDays = document.getElementById('days');
const idHours = document.getElementById('hours');
const idMinutes = document.getElementById('minutes');
const idSeconds = document.getElementById('seconds');
const currentDate = document.getElementById('currentDate');
const form = document.getElementById('form');
const button = document.getElementById('btn');
let countdown;

button.addEventListener("click", function() {
  clearInterval(countdown);
  const myDate = form.value;
  prepareCounter(myDate);
  countdown = setInterval(function() {
    prepareCounter(myDate)
  }, 1000);
  form.value = '';
  localStorage.setItem("date", myDate);
  let currentText = `Enter your date (Current Date: ${myDate})`;
  currentDate.textContent = currentText;
});

function createCounter(ms) {
  let seconds = ms / 1000;
  const days = parseInt(seconds / 86400);
  seconds = seconds % 86400;
  const hours = parseInt(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = parseInt(seconds / 60);
  seconds = Math.round(seconds % 60);
  //const hour = Math.floor(beforeSec / 60 / 60) % 24;
  //const days = Math.floor(beforeSec / 60 / 60 / 24);
  updateCounter(days, hours, minutes, seconds);
};

function updateCounter(days, hours, minutes, seconds) {
  idDays.removeChild(idDays.firstChild);
  idDays.appendChild(createSpan(days));
  idHours.removeChild(idHours.firstChild);
  idHours.appendChild(createSpan(hours));
  idMinutes.removeChild(idMinutes.firstChild);
  idMinutes.appendChild(createSpan(minutes));
  idSeconds.removeChild(idSeconds.firstChild);
  idSeconds.appendChild(createSpan(seconds));
};

function createSpan(textInput) {
  let x = document.createElement('SPAN');
  x.className = "white bg-black";
  let y = document.createTextNode(`${textInput}`);
  x.appendChild(y);
  return x;
};

function prepareCounter(dateValue) {
  const myDate = new Date(dateValue);
  const difference = myDate - Date.now();
  if(difference <= 0) {
    clearInterval(countdown);
    updateCounter(0, 0, 0, 0);
    currentDate.textContent = "Enter your date";
    alert("Timer over");
  }
  else {
    createCounter(difference);
  }
};

window.onload = function() {
  let myDateString = localStorage.getItem("date");
  let myDate = new Date(myDateString);
  let now = Date.now() 
  let myCurrentDifference = myDate - now;
  if(myDateString != null && myCurrentDifference > 0) {
    countdown = setInterval(function() {
      prepareCounter(myDateString);
    }, 1000);
    let currentText = document.createTextNode(` (Current Date: ${myDateString})`);
    currentDate.appendChild(currentText);
  }
};
