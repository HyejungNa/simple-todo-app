let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll('.task-tabs div');
let taskList = [];
let mode = 'all';
let filterList = [];

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask(event);
  }
});
// 인풋창에 enter입력시 아이템 추가하기

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}

function addTask() {
  const taskContent = taskInput.value.trim();
  if (!taskContent) {
    alert('Please enter a task.');
    return;
  }

  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = '';
  render();
}

function render() {
  let list = [];

  if (mode === 'all') {
    list = taskList;
  } else if (mode === 'ongoing' || mode === 'done') {
    list = filterList;
  }
  let resultHtml = '';
  for (let i = 0; i < list.length; i++) {
    const task = list[i];
    //변경전: if (list[i].isCompleted == true) {
    if (task.isComplete) {
      //변경후: isComplete가 true일 때만 조건을 만족하도록하기
      resultHtml += `<div class="task">
        <div class='task-done'>${list[i].taskContent}</div>
        <div class='task-button'>
        <button onClick='toggleComplete("${list[i].id}")'> 
        <i class="fa-solid fa-rotate-left"></i>
        </button>
        <button onclick='deleteTask("${list[i].id}")'><i class="fa-regular fa-trash-can"></i></button></div>
      </div>`;
    } else {
      resultHtml += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div class='task-button'>
      <button onClick='toggleComplete("${list[i].id}")'> <i class="fa-solid fa-circle-check"></i></button> 
      <button onclick='deleteTask("${list[i].id}")'><i class="fa-regular fa-trash-can"></i></button></div>
    </div>`;
    }
  }
  document.getElementById('task-board').innerHTML = resultHtml;
}

function toggleComplete(id) {
  // console.log('id:', id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      // taskList[i].isComplete = true;
      // 변경전 : isComplete를 항상 true로 설정하면, 이미 완료된 할 일을 다시 미완료 상태로 변경할 수 없음
      // 변경후 : isComplete 값을 반전시키도록 변경함으로써 클릭할 때마다 완료 상태와 미완료 상태를 전환가능
      taskList[i].isComplete = !taskList[i].isComplete; // 작업의 완료 상태를 반전시킴
      updateFilterList(taskList[i]); // 해당 작업을 기준으로 filterList 업데이트
      break;
    }
  }
  render();
  // console.log(taskList);
}

function updateFilterList(task) {
  let indexInFilter = filterList.findIndex((item) => item.id === task.id);

  if (indexInFilter !== -1) {
    filterList[indexInFilter].isComplete = task.isComplete;
  } else {
    filterList.push(task);
  }

  if (task.isComplete && mode === 'ongoing') {
    // '진행 중' 탭에서 완료된 항목을 제거
    filterList = filterList.filter((item) => !item.isComplete);
  } else if (!task.isComplete && mode === 'done') {
    // '완료' 탭에서 미완료된 항목을 제거
    filterList = filterList.filter((item) => item.isComplete);
  }
}

function deleteTask(id) {
  // deleteTask() 함수가 taskList에서만 삭제하고있어 All탭에서만 삭제되고 있음
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  // deleteTask() 함수를 filterList에서도 사용하면 다른탭에서도 삭제 가능
  for (let i = 0; i < filterList.length; i++) {
    if (filterList[i].id === id) {
      filterList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];

  if (mode === 'all') {
    render();
  } else if (mode === 'ongoing') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log('ongoing', filterList);
  } else if (mode === 'done') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log('done', filterList);
  }
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
