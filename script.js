let startTime;
let updatedTime;
let difference;
let running = false;
let lapTimes = [];
let interval;

const timeDisplay = document.getElementById('timeDisplay');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function toggleStopwatch() {
    if (running) {
        clearInterval(interval);
        startStopBtn.textContent = "Start";
    } else {
        startTime = new Date() - difference;
        interval = setInterval(updateTime, 1);
        startStopBtn.textContent = "Pause";
    }
    running = !running;
}

function updateTime() {
    updatedTime = new Date();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    timeDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function resetStopwatch() {
    clearInterval(interval);
    running = false;
    startStopBtn.textContent = "Start";
    timeDisplay.textContent = "00:00:00";
    lapTimes = [];
    lapList.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = timeDisplay.textContent;
        lapTimes.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}
