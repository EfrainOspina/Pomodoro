let countdown;
let isRunning = false;
let isWorking = true; // Variable para alternar entre trabajo y descanso
let workTime = 1 * 60; // 25 minutes in seconds
let breakTime = 1 * 60; // 5 minutes in seconds
let timeLeft = workTime; // Inicialmente establecido como tiempo de trabajo

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        countdown = setInterval(() => {
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(countdown);
                isRunning = false;
                document.title = isWorking ? "¡Tiempo de descanso!" : "¡Tiempo de trabajo!";
                if (isWorking) {
                    timeLeft = breakTime;
                    document.body.classList.remove('working');
                    document.body.classList.add('break');
                } else {
                    timeLeft = workTime;
                    document.body.classList.remove('break');
                    document.body.classList.add('working');
                }
                isWorking = !isWorking; // Alternar entre trabajo y descanso
                displayTimeLeft(timeLeft);
                startTimer(); // Iniciar el siguiente temporizador automáticamente
                return;
            }
            displayTimeLeft(timeLeft);
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(countdown);
    isRunning = false;
    isWorking = true;
    timeLeft = workTime;
    document.body.classList.remove('break');
    document.body.classList.add('working');
    displayTimeLeft(timeLeft);
}

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const li = document.createElement('li');
        li.textContent = todoText;
        todoList.appendChild(li);
        todoInput.value = '';
    }
}

function removeTodo(event) {
    const item = event.target;
    if (item.tagName === 'LI') {
        item.remove();
    }
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
addButton.addEventListener('click', addTodo);
todoList.addEventListener('click', removeTodo);

displayTimeLeft(timeLeft); // Initial display

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        // Cambio de color de fondo al iniciar el temporizador
        document.body.style.backgroundColor = isWorking ? "#0066ff" : "#00cc66";
        countdown = setInterval(() => {
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(countdown);
                isRunning = false;
                document.title = isWorking ? "¡Tiempo de descanso!" : "¡Tiempo de trabajo!";
                if (isWorking) {
                    timeLeft = breakTime;
                    document.body.style.backgroundColor = "#00cc66"; // Verde para descanso
                } else {
                    timeLeft = workTime;
                    document.body.style.backgroundColor = "#0066ff"; // Azul para trabajo
                }
                isWorking = !isWorking; // Alternar entre trabajo y descanso
                displayTimeLeft(timeLeft);
                startTimer(); // Iniciar el siguiente temporizador automáticamente
                return;
            }
            displayTimeLeft(timeLeft);
        }, 1000);
    }
}
