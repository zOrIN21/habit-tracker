const form = document.querySelector(".task-form");
const input = document.querySelector(".task-input");
const list = document.querySelector(".task-list");
let tasks = [];

const saved = localStorage.getItem("tasks");

if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach((task) => {
        addTaskToDom(task);
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

    addTaskToDom(task);
    input.value = '';

});

function addTaskToDom(task) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.id = task.id; // привязываем DOM к task по id [web:331]

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;

  const span = document.createElement('span');
  span.className = 'task-item__text';
  span.textContent = task.text;

  if (task.done) {
    span.classList.add('task-item__text--done');
  }

  const deleteButton = document.createElement('button');
  deleteButton.className = 'task-item__delete';
  deleteButton.textContent = '×';

  checkbox.addEventListener('change', () => {
    span.classList.toggle('task-item__text--done', checkbox.checked);

    // находим задачу в массиве по id
    const currentId = Number(li.dataset.id);
    const currentTask = tasks.find(t => t.id === currentId);
    if (!currentTask) return;

    currentTask.done = checkbox.checked; // обновили в массиве
    saveTasks();                         // сохранили в localStorage [web:298][web:326]
  });

  deleteButton.addEventListener('click', () => {
    const currentId = Number(li.dataset.id);

    // удаляем из массива по id
    const index = tasks.findIndex(t => t.id === currentId);
    if (index !== -1) {
      tasks.splice(index, 1);            // выкинули из массива [web:329]
      saveTasks();                       // пересохранили [web:298][web:326]
    }

    li.remove();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);

  list.appendChild(li);
};
