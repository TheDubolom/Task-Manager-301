const keyStorage = 'task-list';
const taskStorage = {
    save: (tasks) => {
        const taskAsStr = JSON.stringify(tasks);
        localStorage.setItem(keyStorage, taskAsStr);
    },
    get: () => {
        const tasks = localStorage.getItem(keyStorage);
        return JSON.parse(tasks);
    },
    init: () => {
        if (localStorage.getItem(keyStorage) === null) {
            taskStorage.save([]);
        }
    }
};

taskStorage.init()

document
    .addEventListener('keydown',
        (ev) => {
            if (ev.key === 'Enter') {
                addTask();
            }
        });

const taskListEl = document.getElementById("task-list");
const addButton = document.getElementById("add-btn");
const inputTaskEl = document.getElementById("input-task");
addButton.onclick = addTask;

let tasks = taskStorage.get();

function createTask(task) {
    const newTaskEl = document.createElement('li');
    newTaskEl.classList.add("task-item");
    newTaskEl.classList.add(task.priority);

    newTaskEl.addEventListener('click', (ev) => {
        ev.currentTarget.classList.toggle('completed');
    });

    if (task.isCompleted === true){
        newTaskEl.classList.add('completed');
    }

    newTaskEl.innerHTML = `
    <span class="task-content">${task.title}</span>
    <div class="task-actions">
        <button class="task-btn"><span class="material-symbols-outlined">stylus</span></button>
        <button class="task-btn" onclick="this.parentNode.parentNode.remove()">
            <span class="material-symbols-outlined">delete</span>
        </button>
    </div>`
    taskListEl.append(newTaskEl);
}

tasks.forEach(createTask);

function addTask() {
    const taskTitle = inputTaskEl.value;
    const newTaskEl = document.createElement('li');

    if(taskTitle) {
        const task = {
            title: taskTitle,
            isCompleted: false,
            priority: 'low'
        }

        newTaskEl.classList.add("task-item");
        newTaskEl.classList.add("low-priority");

        newTaskEl.addEventListener('click', (ev) => {
            ev.currentTarget.classList.toggle('completed');
        });

        newTaskEl.innerHTML = `
        <span class="task-content">${taskTitle}</span>
        <div class="task-actions">
            <button class="task-btn"><span class="material-symbols-outlined">stylus</span></button>
            <button class="task-btn" onclick="this.parentNode.parentNode.remove()">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>`
        if (Boolean(taskTitle) === true) {
            taskListEl.append(newTaskEl);
        }
        tasks.push(task);
        taskStorage.save(tasks);
        inputTaskEl.value = null;
    };
}