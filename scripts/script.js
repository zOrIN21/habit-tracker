const form = document.querySelector(".task-form");
const input = document.querySelector(".task-input");
const list = document.querySelector(".task-list");
let tasks = [];

const saved = localStorage.getItem("tasks");

if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach((task) => {
        addTaskToDom(task.text, task.done);
    })
}

function saveTasks() {
    localStorage.setItem("tasks",JSON.stringify(tasks))
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();

    if (!text) {
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        done: false,
    };

    tasks.push(task);
    saveTasks();

    addTaskToDom(task.text, task.done);
    input.value = '';

});

function addTaskToDom(text, done = false) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.className = 'task-item__text';
    span.textContent = text;

    if(done) {
        span.classList.add("task-item__text--done");
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-item__delete';
    deleteButton.textContent = '×';

    checkbox.addEventListener('change', () => {
        span.classList.toggle('task-item__text--done', checkbox.checked);
    });

    deleteButton.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    list.appendChild(li);
};
