let tasks = [
    {
        title: "Написать Сергею с вопросом по протоколу",
        priority: "low",
        isCompleted: true,
    },
    {
        title: "Написать реферат",
        priority: "high",
        isCompleted: true,
    },
    {
        title: "Постирать носки",
        priority: "medium",
        isCompleted: false,
    },
    {
        title: "Сдать ЕГЭ",
        priority: "low",
        isCompleted: false,
    },
    {
        title: "Съездить на последнюю летнюю смену в 'Зеркальный'",
        priority: "high",
        isCompleted: false,
    },
]

function start() {
    console.log('Hello world');
    alert('111111111');
}
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

function createTask(task) {
    const newTaskEl = document.createElement('li');
    newTaskEl.classList.add("task-item");
    newTaskEl.classList.add(task.priority);

    newTaskEl.addEventListener('click', (ev) => {
        ev.currentTarget.classList.toggle('completed');
    });

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
}