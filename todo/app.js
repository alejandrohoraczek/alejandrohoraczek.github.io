//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVENTS LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkTodo);
todoList.addEventListener('click', removeTodo);
filterOption.addEventListener('click', filterTodo);

//FUNCTIONS
function addTodo(e){
    //prevent form from submitting
    e.preventDefault();

    //create DIV
    const todoDiv = document.createElement('div');

    //add class to DIV
    todoDiv.classList.add('todo');

    //create LI
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    //save local storage
    saveLocalTodos(todoInput.value);

    //check mark
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //check trash
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append to div
    todoList.appendChild(todoDiv);

    //clear input
    todoInput.value = '';
}

function removeTodo(e) {
    
    const item = e.target;
    
    //delete
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });

        
    }
}

function checkTodo(e) {
    const item = e.target;
    
    //delete
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
    });
  }

// function saveLocalTodos(todo) {
//   let todos;
//   //do i have a local storage with todos yet?
//   if(localStorage.getItem('todos') === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem('todos'));
//   }

//   todos.push(todo);
//   localStorage.setItem('todos', JSON.stringify(todos));
  
// }

function saveLocalTodos(todo ,todoState, todoPos) {
  let todos = {};
  let text;
  let pos;
  let state;

  //do i have a local storage with todos yet?
  if(localStorage.getItem('todos') === null) {
    todos[pos] = [];
    todos[text] = [];
    todos[state] = [];
    console.log(todos);
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos[text].push(todo);
  todos[state].push(todoState);
  todos[position].push(todoPos);

  localStorage.setItem('todos', JSON.stringify(todos));
  
}

function getTodos(todo) {
  let todos;
  //do i have a local storage with todos yet?
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo) {
        //create DIV
        const todoDiv = document.createElement('div');

        //add class to DIV
        todoDiv.classList.add('todo');
    
        //create LI
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);

    
        //check mark
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
    
        //check trash
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
    
        //append to div
        todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo) {
  let todos;
  //do i have a local storage with todos yet?
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));

}

/* guardar estado de completado

1) crear local storage que guarde el todo.value y el estado de incompleto (false)
  dentro de la función saveLocalTodos()
2) guardar un array que contenga true/false sobre las posiciones de los elementos del array */