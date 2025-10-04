let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateDisplay(time) {
  const milliseconds = Math.floor((time % 1000));
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)));

  display.textContent = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(unit, length = 2) {
  return String(unit).padStart(length, '0');
}

function startStop() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 10);
    startStopBtn.textContent = 'Pause';
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startStopBtn.textContent = 'Start';
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  updateDisplay(elapsedTime);
  startStopBtn.textContent = 'Start';
  laps.innerHTML = '';
}

function lap() {
  if (!isRunning) return;
  const li = document.createElement('li');
  li.textContent = display.textContent;
  laps.appendChild(li);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
