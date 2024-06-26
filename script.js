const StartButton = document.getElementById("StartButton");
const text = document.getElementById("text");
const cycleCountDisplay = document.getElementById("cycleCountDisplay"); // Elemento para mostrar el ciclo actual

//agrego el evento al boton
StartButton.addEventListener("click", startTimer);
//VARIABLES
let timer;
let time = 1 * 10;
let isWorking = true;
let isRunning = false;
let cycleCount = 0; // Variable para contar los ciclos del temporizador

function updateTimerDisplay() {
  //ACTUALIZAR EL TIEMPO
  const minutes = Math.floor(time / 60); //CALCULAR LOS MINUTOS RESTANTES
  const seconds = time % 60; //CALCULAR LOS SEGUNDOS RESTANTES
  document.getElementById("timer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`; // PARA ACUTUALIZAR LOS NUMEROES EN VEZ DE 5 SERIA 05
}

function updateCycleCountDisplay() {
  cycleCountDisplay.textContent = `Ciclo: ${cycleCount}`;
  cycleCountDisplay.style.color = "white";
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
        cycleCount++; // Incrementar el contador de ciclos
        updateCycleCountDisplay(); // Actualizar la visualización del ciclo actual
        //alert(isWorking ? "Tomate un descanso" : "Es tiempo de trabajar"); //quitar esta linea si no soluciono la demora del sonido
        if (isWorking) {
          time = 1 * 5; //DESCANSO
          isWorking = false;
          text.textContent = "¡Descanso!";
          text.style.color = "#006600";
          playSound();
        } else {
          time = 1 * 10; //TRABAJO
          isWorking = true;
          text.textContent = "¡Enfocado!";
          text.style.color = "#ff0000";
          playSound();
        }
        updateTimerDisplay();
        StartButton.textContent = "Iniciar";

        if (cycleCount === 7) {
          time = 1 * 20;
          cycleCount = -1; // Reiniciar el contador de ciclos
          text.textContent = "Es hora del descanso largo";
          text.style.fontSize = "1.2rem";
          text.style.color = "#006600";

          updateTimerDisplay();
          playSound();
        }
      }
    }, 1000);
    StartButton.textContent = "Reiniciar";
  } else {
    clearInterval(timer);
    time = isWorking ? 1 * 10 : 1 * 5; // Reinicia el tiempo según el estado actual (trabajo o descanso)
    updateTimerDisplay();
    isRunning = false;
    StartButton.textContent = "Iniciar";
  }
}

//funcion para sonido
function playSound() {
  const audio = new Audio(
    "Utilidades/iphoneradar_bd8398fb5078630 (mp3cut.net).mp3"
  );
  audio.play();
}

updateTimerDisplay(); //actualizar la visualización del temporizador
updateCycleCountDisplay(); // Actualizar la visualización del ciclo actual

function addTask() {
  let input = document.getElementById("taskInput").value.trim();
  let maxLength = 30;

  if (input.length > maxLength) {
    input = input.substring(0, maxLength);
  }

  let ul = document.getElementById("taskList");

  // Verificar si ya hay 8 tareas en la lista
  if (ul.children.length >= 8) {
    alert("¡Ya has agregado el máximo de 8 tareas!");
    return;
  }

  if (input === "") {
    alert("Por favor ingresa una tarea.");
    return;
  }

  let li = document.createElement("li");
  li.appendChild(document.createTextNode(input));
  ul.appendChild(li);
  document.getElementById("taskInput").value = "";

  // Agregar función para eliminar tarea al hacer clic en ella
  li.onclick = function () {
    this.parentNode.removeChild(this);
  };
}

// Funcion del boton
function toggleConfig() {
  let configContainer = document.getElementById("configContainer");
  configContainer.style.display =
    configContainer.style.display === "none" ? "block" : "none";
}
function closeConfig() {
  let configContainer = document.getElementById("configContainer");
  configContainer.style.display = "none";
}

function saveConfig() {
  let workTimeInput = document.getElementById("workTime");
  let breakTimeInput = document.getElementById("breakTime");
  if (isWorking) {
    time = workTimeInput.value * 60;
  } else {
    time = breakTimeInput.value * 60;
  }
  alert("Configuración guardada");
  updateTimerDisplay();
  closeConfig();
}
