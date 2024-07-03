let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let taskList = [];

addButton.addEventListener('click', addTask);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHtml = '';
  for (let i = 0; i < taskList.length; i++) {
    const task = taskList[i];

    //변경전: if (taskList[i].isCompleted == true) {
    if (task.isComplete) {
      //변경후: isComplete가 true일 때만 조건을 만족하도록하기
      resultHtml += `<div class="task">
        <div class='task-done'>${taskList[i].taskContent}</div>
        <div class='task-button'>
        <button onClick='toggleComplete("${taskList[i].id}")'> 
        <i class="fa-solid fa-rotate-left"></i>
        </button>
        <button onclick='deleteTask("${taskList[i].id}")'><i class="fa-regular fa-trash-can"></i></button></div>
      </div>`;
    } else {
      resultHtml += `<div class="task">
      <div>${taskList[i].taskContent}</div>
      <div class='task-button'>
      <button onClick='toggleComplete("${taskList[i].id}")'> <i class="fa-solid fa-circle-check"></i></button> 
      <button onclick='deleteTask("${taskList[i].id}")'><i class="fa-regular fa-trash-can"></i></button></div>
    </div>`;
    }
  }
  document.getElementById('task-board').innerHTML = resultHtml;
}

function toggleComplete(id) {
  console.log('id:', id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      // taskList[i].isComplete = true; // 변경전 : isComplete를 항상 true로 설정하면, 이미 완료된 할 일을 다시 미완료 상태로 변경할 수 없음
      // 변경후 : isComplete 값을 반전시키도록 변경함으로써 클릭할 때마다 완료 상태와 미완료 상태를 전환가능
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
