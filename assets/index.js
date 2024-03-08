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

  deleteTask(taskToRemove.textContent);
}

function saveTask(task) {
  // Implementar la lógica para guardar la tarea (puede usar localStorage o una API, según sus necesidades).
}

function deleteTask(task) {
  // Implementar la lógica para eliminar la tarea (puede usar localStorage o una API, según sus necesidades).
}

function updateTask(taskElement, newText) {
  // Implementar la lógica para actualizar la tarea (puede usar localStorage o una API, según sus necesidades).
}

function loadTasks() {
  // Implementar la lógica para cargar las tareas almacenadas (puede usar localStorage o una API, según sus necesidades).
}
