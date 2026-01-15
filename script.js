// --- 1. Date & Time ---
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').innerText = now.toLocaleDateString('en-US', options);
}
updateDate();

// --- 2. Weather API (Open-Meteo) ---
// Note: I used coordinates for Dasmariñas, PH (14.3294, 120.9367).
// You can change these numbers to any city's coordinates.
async function fetchWeather() {
    const lat = 14.3294;
    const lon = 120.9367;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const temp = data.current_weather.temperature;
        
        document.getElementById('weather-display').innerHTML = `
            <div class="weather-info">${temp}°C</div>
            <div>Wind Speed: ${data.current_weather.windspeed} km/h</div>
        `;
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById('weather-display').innerText = "Failed to load weather.";
    }
}
fetchWeather();

// --- 3. Crypto API (CoinGecko) ---
async function fetchCrypto() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';

    try {
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById('btc-price').innerText = `$${data.bitcoin.usd}`;
        document.getElementById('eth-price').innerText = `$${data.ethereum.usd}`;
    } catch (error) {
        console.error("Error fetching crypto:", error);
    }
}
fetchCrypto();

// --- 4. To-Do List with Local Storage ---
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load tasks from storage on startup
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    tasks.forEach(task => createTaskElement(task));
}

function addTask() {
    const taskText = todoInput.value;
    if (taskText === '') return;

    createTaskElement(taskText);
    saveTaskToStorage(taskText);
    todoInput.value = ''; // Clear input
}

function createTaskElement(text) {
    const li = document.createElement('li');
    li.innerText = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function() {
        li.remove();
        removeTaskFromStorage(text);
    };

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

function saveTaskToStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    tasks.push(task);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    tasks = tasks.filter(task => task !== taskToDelete);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// Add event listener to button
addBtn.addEventListener('click', addTask);