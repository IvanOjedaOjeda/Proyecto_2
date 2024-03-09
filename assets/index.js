document.addEventListener('DOMContentLoaded', function () {
  loadTasks();
});

function addTask() {
  let taskInput = document.getElementById('task');
  let taskList = document.getElementById('task-list');

  if (taskInput.value.trim() !== '') {
      let li = document.createElement('li');
      li.innerHTML = '<span>' + taskInput.value + '</span>';
      li.innerHTML += ' <button onclick="editTask(this)">Editar</button>';
      li.innerHTML += ' <button onclick="removeTask(this)">Eliminar</button>';
      taskList.appendChild(li);

      saveTask(taskInput.value);
      taskInput.value = '';
  }
}

function editTask(button) {
  let taskToEdit = button.parentNode;
  let span = taskToEdit.querySelector('span');
  let newText = prompt('Editar tarea:', span.textContent);

  if (newText !== null) {
      span.textContent = newText;
      updateTask(taskToEdit, newText);
  }
}

function removeTask(button) {
  let taskList = document.getElementById('task-list');
  let taskToRemove = button.parentNode;
  taskList.removeChild(taskToRemove);

  deleteTask(taskToRemove.querySelector('span').textContent);
}

// Persistencia de datos con window.localStore

function createTaskElement(taskText) {
  let li = document.createElement('li');
  let span = document.createElement('span');
  span.textContent = taskText;
  let editButton = document.createElement('button');
  editButton.textContent = 'Editar';
  editButton.onclick = function () {
      editTask(this);
  };
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.onclick = function () {
      removeTask(this);
  };

  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  return li;
}

function saveTask(task) {
  let tasks = getStoredTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(task) {
  let tasks = getStoredTasks();
  let index = tasks.indexOf(task);
  if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

function updateTask(taskElement, newText) {
  let tasks = getStoredTasks();
  let oldText = taskElement.querySelector('span').textContent;
  let index = tasks.indexOf(oldText);
  if (index !== -1) {
      tasks[index] = newText;
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

function loadTasks() {
  let tasks = getStoredTasks();
  let taskList = document.getElementById('task-list');

  tasks.forEach(function (taskText) {
    let li = createTaskElement(taskText);
      taskList.appendChild(li);
  });
}

function getStoredTasks() {
  let storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}