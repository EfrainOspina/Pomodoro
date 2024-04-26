// Seleccionar elementos del DOM
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

// Variables del temporizador
let workTime = 25 * 60; // 25 minutos
let breakTime = 5 * 60; // 5 minutos
let currentTime = workTime;
let isWorking = true;
let intervalId;
let isRunning = false;

// Función para actualizar el display del temporizador
function updateTimerDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
      intervalId = setInterval(() => {
        currentTime--;
        updateTimerDisplay();
  
        if (currentTime === 0) {
          if (isWorking) {
            currentTime = breakTime;
            isWorking = false;
            playSound();
          } else {
            currentTime = workTime;
            isWorking = true;
            playSound();
          }
        }
      }, 1000);
    }
  }

// Función para pausar el temporizador
function pauseTimer() {
  clearInterval(intervalId);
  isRunning = false;
  startButton.textContent = 'Resume';
  startButton.onclick = startTimer;
}

// Función para reiniciar el temporizador
function resetTimer() {
  clearInterval(intervalId);
  currentTime = workTime;
  isWorking = true;
  isRunning = false;
  updateTimerDisplay();
  startButton.textContent = 'Start';
  startButton.onclick = startTimer;
}

// Función para reproducir un sonido de alarma
function playSound() {
  const audio = new Audio('alarm.mp3');
  audio.play();
}

// Agregar event listeners a los botones
startButton.onclick = startTimer;
resetButton.onclick = resetTimer;

// Inicializar el temporizador
updateTimerDisplay();
