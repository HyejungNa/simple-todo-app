let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let taskList = [];

addButton.addEventListener('click', addTask);

function addTask() {
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  render();
}

function render() {
  let resultHtml = '';
  for (let i = 0; i < taskList.length; i++) {
    resultHtml += `<div class="task">
    <div>${taskList[i]}</div>
    <div><button>Check</button> <button>Delete</button></div>
  </div>`;
  }
  document.getElementById('task-board').innerHTML = resultHtml;
}
