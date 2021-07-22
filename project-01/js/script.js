// Define UI Elements

let form        = document.querySelector('#task_form');
let inputTask   = document.querySelector('#input_task');
let filterTask  = document.querySelector('#task_filter');
let taskList    = document.querySelector('#tasks');
let clearTask   = document.querySelector('#clear_task');

// Define Event Listners 

form.addEventListener('submit', addTask);
taskList.addEventListener('click', closeTask);
clearTask.addEventListener('click', clearAll);
filterTask.addEventListener('keyup', filterNow);
document.addEventListener('DOMContentLoaded', loadTask);


// Define Function

function addTask(e) {
  if(inputTask.value === '') {
    alert('Empty Task!! Add Task...');
  }else {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(inputTask.value + ' '));
    taskList.appendChild(li);
    let close = document.createElement('a');
    close.setAttribute('href', '#');
    close.innerHTML = 'x';
    li.appendChild(close);

    // Local Storage
    storeTaskInLocalStorage(inputTask.value)

    inputTask.value = '';
  }
  e.preventDefault();
}

// Remove Task 

function closeTask(r) {
  if(r.target.hasAttribute('href')) {
    if(confirm("Are you sure?")) {
      let ele = r.target.parentElement;
      ele.remove();

      removeFromLocalStorage(ele);
    }
  }
}

// Remove All 

function clearAll(a) {
  if(confirm("Are you want to clear all ?")) {
    taskList.innerHTML = '';
  }
  localStorage.clear();
}

// Filter

function filterNow(f) {
  let filter = f.target.value.toLowerCase();
  document.querySelectorAll('li').forEach(task => {
    let item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(filter)!= -1) {
      task.style.display = 'block';
    }else {
      task.style.display = 'none';
    }
  })
}

// Local Storage 

function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTask() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(task + ' '));
    taskList.appendChild(li);
    let close = document.createElement('a');
    close.setAttribute('href', '#');
    close.innerHTML = 'x';
    li.appendChild(close);
  })
}

// Remove from LS

function removeFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  let li = taskItem;
  li.removeChild(li.lastChild); // Delete x
  tasks.forEach((task, index)=> {
    if(li.textContent.trim() === task) {
      tasks.splice(index, 1)
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}