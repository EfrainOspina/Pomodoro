//ELEMENTOS LLAMADOS POR EL DOM
const StartButton = document.getElementById('StartButton');
const container = document.getElementById('container');
const text = document.getElementById('text');

//agrego el evento al boton
StartButton.addEventListener("click",startTimer) 
//VARIABLES 
let timer;
let time = 1 * 10  ;
let isWorking = true;
let isRunning = false;

function updateTimerDisplay() { //ACTUALIZAR EL TIEMPO
  const minutes = Math.floor(time / 60); //CALCULAR LOS MINUTOS RESTANTES
  const seconds = time % 60;    //CALCULAR LOS SEGUNDOS RESTANTES
  document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;  // PARA ACUTUALIZAR LOS NUMEROES EN VEZ DE 5 SERIA 05
}

//funcion para iniciar el cronometro
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (time > 0) {
        time--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        alert(isWorking ? "Tomate un descanso" : "Es tiempo de trabajar");//quitar esta linea si no soluciono la demora del sonido
        if (isWorking) {
          time = 1 * 5; //DESCANSO
          isWorking = false;
          container.style.backgroundColor = '#5DD384';
          text.textContent = 'Descansa';
          StartButton.style.backgroundColor = '#5DD384';
          playSound()
        } else {
          time = 1 * 10; //TRABAJO
          isWorking = true;
          container.style.backgroundColor = '';
          text.textContent = '¡Enfocado y en marcha!';
          StartButton.style.backgroundColor = '';

          playSound()
        }
        updateTimerDisplay();
        StartButton.textContent = 'Iniciar'; 
      }
    }, 1000);
    StartButton.textContent = 'Reiniciar'; 
  } else {
    clearInterval(timer);
    time = isWorking ? 1 * 10 : 1* 5; // Reinicia el tiempo según el estado actual (trabajo o descanso)
    updateTimerDisplay();
    isRunning = false;
    StartButton.textContent = 'Iniciar'; 
  }
}
//funcion para sonido
function playSound() {
  const audio = new Audio('Utilidades/iphoneradar_bd8398fb5078630 (mp3cut.net).mp3');
  audio.play(); 
}

updateTimerDisplay(); //actualizar la visualización del temporizador 

