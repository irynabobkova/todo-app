const todoInput = document.querySelector('.todo-input');
const todoAddButton = document.querySelector('.todo-add-button');
const todoList = document.querySelector('.todo-list'); 
const form = document.querySelector('form')
const todoClearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('.filter')


// function which loads all event listeners
loadEventListeners(); 
function loadEventListeners() {
    todoAddButton.addEventListener('click', addTodo);
    todoList.addEventListener('click', deleteTodo);
    todoClearBtn.addEventListener('click', deleteAllTodoItems);
    filter.addEventListener('keyup', filterTodo);
 //   document.addEventListener('DOMContentLoaded', getItems)
}

function addTodo(event) {
  event.preventDefault();
// Create li element with class
  const li = document.createElement('li');
  li.className = 'collection-item';
  // Create text node 
  li.appendChild(document.createTextNode(todoInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  todoList.appendChild(li);

  storeTodoInSessionStorage(todoInput.value);

  // Clear input
  todoInput.value = '';
}


function deleteTodo(event) {
 event.preventDefault(); 
 if(event.target.parentElement.classList.contains('delete-item')) {
     event.target.parentElement.parentElement.remove();
 }
}

function deleteAllTodoItems() {
    //todoList.innerHTML = '';
    while(todoList.firstChild) {
        todoList.removeChild(todoList.firstChild); //this one is faster
    }
}

function filterTodo(event) {
    const text = event.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(todos){
        const todo = todos.firstChild.textContent;
        if(todo.toLowerCase().indexOf(text) != -1){
            todos.style.display = 'block';
            } else {
             todos.style.display = 'none';
    }
    });
}


function storeTodoInSessionStorage(item) {
  let items;
  if(sessionStorage.getItem('todos') === null){
    items = [];
  } else {
    items = JSON.parse(sessionStorage.getItem('todos'));
  }

  items.push(item);
  sessionStorage.setItem('todos', JSON.stringify(items));
}


