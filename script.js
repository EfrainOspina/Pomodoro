const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const container = document.querySelector('.container');
const text = document.querySelector('.text');

let workTime = 0.1 * 50; // 25 minutos
let breakTime = 0.1 * 60; // 5 minutos
let currentTime = workTime;
let isWorking = true;
let intervalId;
let isRunning = false;

function updateTimerDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
function playSound() {
  const audio = new Audio('/Utilidades/iphoneradar_bd8398fb5078630 (mp3cut.net).mp3');
  audio.play();
}

function startTimer() {
  if (!isRunning) {
    intervalId = setInterval(() => {
      currentTime--;
      updateTimerDisplay();
      if (currentTime === 0) {
        clearInterval(intervalId);
        if (isWorking) {
          currentTime = breakTime;
          isWorking = false;
          startButton.style.backgroundColor = '#7abf85';
          container.style.backgroundColor = '#7abf85';
          text.textContent = "Descanso"
          playSound();
          setTimeout(() => {
            startButton.style.backgroundColor = '';
            container.style.backgroundColor = '';
            text.textContent = "¡Enfocado y en marcha!"
            startTimer(); 
          }, 4000); 
        } else {
          currentTime = workTime;
          isWorking = true;
          container.style.backgroundColor = ''; 
          startButton.style.backgroundColor = '';
          text.textContent = "¡Enfocado y en marcha!"
          playSound();
        }
      }
    }, 1000);
    isRunning = true;
    startButton.textContent = 'Reset';
    startButton.onclick = resetTimer;
  } else {
    resetTimer();
  }
}
function resetTimer() {
  clearInterval(intervalId);
  currentTime = workTime;
  isWorking = true;
  isRunning = false;
  updateTimerDisplay();
  container.style.backgroundColor = '';
  startButton.style.backgroundColor = '';
  startButton.textContent = 'Iniciar';
  startButton.onclick = startTimer;
}



startButton.onclick = startTimer;

updateTimerDisplay();
