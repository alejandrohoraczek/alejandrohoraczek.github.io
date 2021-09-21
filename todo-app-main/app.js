//Declarations
const todoInput = document.querySelector('#todoInput');
const sendTodoBtn = document.querySelector('.sendTodoBtn');
const todoList = document.querySelector('.todo-list > ul');
const emptyDiv = document.querySelector('#empty');
const checkTodo = document.querySelectorAll('#todoCheck');
const deleteTodoBtn = document.querySelectorAll('.delete');
const filterAll = document.querySelector('#all');
const filterActive = document.querySelector('#active');
const filterCompleted = document.querySelector('#completed');
const clearCompleted = document.querySelector('#clearCompleted');
const urlParams = new URLSearchParams(window.location.search).get('filter')
const itemsLeft = document.querySelector('#itemsLeft')

//Event listeners

document.addEventListener('DOMContentLoaded', filterTodos(urlParams));
sendTodoBtn.addEventListener('click', addTodo);
// el forEach de abajo quizas se pueda eliminar, o quizas no
checkTodo.forEach((checkboxes) => {
    checkboxes.addEventListener('click', completeTodo);
});
deleteTodoBtn.forEach((e) => {
    console.log(e);
    e.addEventListener('click', deleteTodo);
});
clearCompleted.addEventListener('click', clearCompletedTodos);
document.addEventListener('DOMContentLoaded', allowReorder);

//Functions

function addTodo(e) {
    //prevent default behaviour (refresh)
    e.preventDefault();
    const todoChildren = todoList.children;
    let index;

    if (!localStorage.getItem('savedTodos')) {
        index = 0;
    } else {
        index = Object.keys(JSON.parse(localStorage.getItem('savedTodos'))).length; //deberia ser el ultimo index del localstorage guardado + 1
    }
    //take input from user. capitalize
    input = todoInput.value[0].toUpperCase() + todoInput.value.substring(1);

    if (!todoInput.value || /^\s*$/.test(todoInput.value) === false) {

        //DIV, which is gonna wrap the todo
        const createDiv = document.createElement('div');
        //add class to new div
        createDiv.classList.add('todo-info');
        createDiv.setAttribute('data-index', index)


        //create LI and P that are gonna go inside the DIV created before,
        // give its class, store its todo value and append it to the DIV
        const newTodo = document.createElement('li');
        const newParagraph = document.createElement('p');

        //creating delete button

        const deleteBtn = document.createElement('img');
        deleteBtn.className = 'delete delete-transition'
        deleteBtn.src = 'images/icon-cross.svg';
        deleteBtn.alt = 'Delete';

        newParagraph.innerText = input;

        //creating checkbox element
        const newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        newCheckbox.name = 'todoCheck';
        newCheckbox.id = 'todoCheck';

        newTodo.classList.add('list-item');

        if (document.querySelectorAll('li').length === 0) {
            emptyDiv.classList.add('fade');
            emptyDiv.addEventListener('transitionend', (e) => {
                emptyDiv.style.display = 'none';

            })

        }

        setTimeout(function () {
            newTodo.appendChild(newCheckbox);
            newTodo.appendChild(newParagraph);
            newTodo.appendChild(deleteBtn);
            createDiv.appendChild(newTodo);
            todoList.appendChild(createDiv);
        }, document.querySelectorAll('li').length === 0 ? 500 : 0);

        //Injecting the <div><li><input><p></p><img></li></div> inside the <ul>



        //saving todo
        saveTodo(input, index);

        //clear input
        todoInput.value = '';

        //attaching the events listeners to the new todo
        newCheckbox.addEventListener('click', completeTodo);
        deleteBtn.addEventListener('click', deleteTodo);
    } else {
        alert('You must have something better to do than nothing! 😅')
        todoInput.value = '';
    }

    //update items left
    itemsLeftFn();
}


function completeTodo(e) {



    let todosCompletedObj; //variable where i'll store all the localstorage values
    let todosCompletedString; //variable in array form to get lenght
    let todosCompletedArray;
    let todosCompletedNewArray; //new array to save to localstorage

    const isTodoCompleted = e.target.checked;
    const todoParagraph = e.target.nextElementSibling;
    const todoDiv = e.target.parentNode.parentNode; //DIV contains LI
    const todoIndex = parseInt(todoDiv.getAttribute('data-index'), 10);

    if (!localStorage.getItem('savedTodos')) {
        todosCompletedObj = [];
    } else {
        todosCompletedObj = JSON.parse(localStorage.getItem('savedTodos'));
        todosCompletedString = localStorage.getItem('savedTodos');
        todosCompletedArray = Object.entries(todosCompletedObj);
    }

    // console.log(todosCompletedObj) //obj
    // console.log(typeof todosCompletedString) //string
    // console.log(todosCompletedArray) //obj

    for (let properties of todosCompletedObj) {
        // console.log(`the key is ${key} and the value is ${value}`)
        // console.log(`value ${todosCompletedObj[text]}`)
        propertiesParsed = JSON.parse(properties);

        if (propertiesParsed.indexes === todoIndex && propertiesParsed.state == 'active') {
            propertiesParsed.state = 'completed';

            /*the following code could be used in the 
            removeTodo function */

            propertiesStringy = JSON.stringify(propertiesParsed)
            todosCompletedObj.splice(propertiesParsed.indexes, 1, propertiesStringy)
            localStorage.setItem('savedTodos', JSON.stringify(todosCompletedObj))

            todoParagraph.classList.toggle('completed')
            break;

            /* !!! Agregar checked en el botón !!! */

            //            todosCompletedNewArray = Object.fromEntries(todosCompletedArray)
        } else if (propertiesParsed.indexes === todoIndex && propertiesParsed.state == 'completed') {
            propertiesParsed.state = 'active';

            propertiesStringy = JSON.stringify(propertiesParsed)
            todosCompletedObj.splice(propertiesParsed.indexes, 1, propertiesStringy)
            localStorage.setItem('savedTodos', JSON.stringify(todosCompletedObj))

            todoParagraph.classList.toggle('completed')

        }
    }

    //update items left
    itemsLeftFn();
}

function deleteTodo(e, todo) {




    const todoToDelete = e.path[2]; // todo DIV
    const todoToDeleteIndex = parseInt(todoToDelete.getAttribute('data-index'), 10);
    const todoText = todoToDelete.querySelector('p').innerText;

    let deleteFromLocalObj;
    let deleteFromLocalString;
    let deleteFromLocalArray;
    //if i dont have todo's saved, want to create an empty string
    //where i'm going to save the todo.
    //else, i'm going to load them
    if (localStorage.getItem('savedTodos') === null) {
        deleteFromLocalObj = [];
    } else {
        deleteFromLocalObj = JSON.parse(localStorage.getItem('savedTodos'));
        deleteFromLocalString = localStorage.getItem('savedTodos');
        deleteFromLocalArray = Object.entries(deleteFromLocalObj);
    }

    for (let properties of deleteFromLocalObj) {
        propertiesParsed = JSON.parse(properties);

        if (propertiesParsed.indexes === todoToDeleteIndex) {
            propertiesParsed.state = 'deleted';

            /*the following code could be used in the 
            removeTodo function */

            propertiesStringy = JSON.stringify(propertiesParsed)
            deleteFromLocalObj.splice(propertiesParsed.indexes, 1, propertiesStringy)
            localStorage.setItem('savedTodos', JSON.stringify(deleteFromLocalObj))

            todoToDelete.remove();
            break;
        }
    }
    if (document.querySelectorAll('li').length === 0) {
        emptyDiv.classList.remove('fade');
        emptyDiv.innerHTML = '<p>Keep on doing, keep on making.</p>'
        emptyDiv.style.display = 'block';
    }

    //update items left
    itemsLeftFn();
}

function saveTodo(todo, index) {
    //Declare object where i'm gonna save the TodoClass object
    let TodoToSave;
    //if i dont have todo's saved, want to create an empty string
    //where i'm going to save the todo.
    //else, i'm going to load them
    if (localStorage.getItem('savedTodos') === null) {
        TodoToSave = [];
    } else {
        TodoToSave = JSON.parse(localStorage.getItem('savedTodos'));
    }

    // create an object where i'm saving each todo's index, state and text

    let TodoClass = {
        indexes: index,
        state: `active`,
        text: todo
    };


    TodoToSaveString = JSON.stringify(TodoClass);

    TodoToSave.push(TodoToSaveString);

    localStorage.setItem('savedTodos', JSON.stringify(TodoToSave));
}

function getAllTodos() {
    let todosToLoad;

    if (localStorage.getItem('savedTodos') === null) {
        todosToLoad = [];
    } else {
        todosToLoad = JSON.parse(localStorage.getItem('savedTodos'));
    }


    todosToLoad.forEach(todo => {

        const todos = JSON.parse(todo);


        if (todos.state !== 'deleted') {

            //DIV, which is gonna wrap the todo
            const createDiv = document.createElement('div');
            //add class to new div
            createDiv.classList.add('todo-info');
            createDiv.setAttribute('data-index', todos.indexes);


            //create LI and P that are gonna go inside the DIV created before,
            // give its class, store its todo value and append it to the DIV
            const newTodo = document.createElement('li');
            const newParagraph = document.createElement('p');

            //asinging class to <p> if completed or not

            todos.state === "completed" ? newParagraph.classList.add('completed') : null;

            //creating delete button

            const deleteBtn = document.createElement('img');
            deleteBtn.className = 'delete'
            deleteBtn.src = 'images/icon-cross.svg';
            deleteBtn.alt = 'Delete';

            newParagraph.innerText = todos.text;

            //creating checkbox element
            const newCheckbox = document.createElement('input');
            newCheckbox.type = 'checkbox';
            newCheckbox.name = 'todoCheck';
            newCheckbox.id = 'todoCheck';
            if (todos.state === 'completed') {
                newCheckbox.checked = true;
            }

            newTodo.classList.add('list-item');

            //Injecting the <div><li><input><p></p><img></li></div> inside the <ul>
            newTodo.appendChild(newCheckbox);
            newTodo.appendChild(newParagraph);
            newTodo.appendChild(deleteBtn);
            createDiv.appendChild(newTodo);
            todoList.appendChild(createDiv);

            newCheckbox.addEventListener('click', completeTodo);
            deleteBtn.addEventListener('click', deleteTodo);
        }


    })

    if (document.querySelectorAll('li').length !== 0) {
        emptyDiv.classList.remove('fade');
        emptyDiv.style.display = 'none';

    }

    filterAll.firstChild.classList.add('active');


}

function getCompletedTodos() {
    let todosToLoad;

    if (localStorage.getItem('savedTodos') === null) {
        todosToLoad = [];
    } else {
        todosToLoad = JSON.parse(localStorage.getItem('savedTodos'));
    }


    todosToLoad.forEach(todo => {
        // console.log(JSON.parse(todo));

        const todos = JSON.parse(todo);


        if (todos.state === 'completed') {

            //DIV, which is gonna wrap the todo
            const createDiv = document.createElement('div');
            //add class to new div
            createDiv.classList.add('todo-info');
            createDiv.setAttribute('data-index', todos.indexes);


            //create LI and P that are gonna go inside the DIV created before,
            // give its class, store its todo value and append it to the DIV
            const newTodo = document.createElement('li');
            const newParagraph = document.createElement('p');

            //asinging class to <p> 

            newParagraph.classList.add('completed');

            //creating delete button

            const deleteBtn = document.createElement('img');
            deleteBtn.className = 'delete'
            deleteBtn.src = 'images/icon-cross.svg';
            deleteBtn.alt = 'Delete';

            newParagraph.innerText = todos.text;

            //creating checkbox element
            const newCheckbox = document.createElement('input');
            newCheckbox.type = 'checkbox';
            newCheckbox.name = 'todoCheck';
            newCheckbox.id = 'todoCheck';
            newCheckbox.checked = true;

            newTodo.classList.add('list-item');

            //Injecting the <div><li><input><p></p><img></li></div> inside the <ul>
            newTodo.appendChild(newCheckbox);
            newTodo.appendChild(newParagraph);
            newTodo.appendChild(deleteBtn);
            createDiv.appendChild(newTodo);
            todoList.appendChild(createDiv);

            newCheckbox.addEventListener('click', completeTodo);
            deleteBtn.addEventListener('click', deleteTodo);
        }


    })

    if (document.querySelectorAll('li').length !== 0) {
        emptyDiv.classList.remove('fade');
        emptyDiv.style.display = 'none';
    } else {
        emptyDiv.firstElementChild.innerText = `You haven't completed nothing... yet.`
    }

    filterCompleted.firstChild.classList.add('active');

}

function getActiveTodos() {
    let todosToLoad;

    if (localStorage.getItem('savedTodos') === null) {
        todosToLoad = [];
    } else {
        todosToLoad = JSON.parse(localStorage.getItem('savedTodos'));
    }


    todosToLoad.forEach(todo => {
        // console.log(JSON.parse(todo));

        const todos = JSON.parse(todo);


        if (todos.state === 'active') {

            //DIV, which is gonna wrap the todo
            const createDiv = document.createElement('div');
            //add class to new div
            createDiv.classList.add('todo-info');
            createDiv.setAttribute('data-index', todos.indexes);


            //create LI and P that are gonna go inside the DIV created before,
            // give its class, store its todo value and append it to the DIV
            const newTodo = document.createElement('li');
            const newParagraph = document.createElement('p');


            //creating delete button

            const deleteBtn = document.createElement('img');
            deleteBtn.className = 'delete'
            deleteBtn.src = 'images/icon-cross.svg';
            deleteBtn.alt = 'Delete';

            newParagraph.innerText = todos.text;

            //creating checkbox element
            const newCheckbox = document.createElement('input');
            newCheckbox.type = 'checkbox';
            newCheckbox.name = 'todoCheck';
            newCheckbox.id = 'todoCheck';

            newTodo.classList.add('list-item');

            //Injecting the <div><li><input><p></p><img></li></div> inside the <ul>
            newTodo.appendChild(newCheckbox);
            newTodo.appendChild(newParagraph);
            newTodo.appendChild(deleteBtn);
            createDiv.appendChild(newTodo);
            todoList.appendChild(createDiv);

            newCheckbox.addEventListener('click', completeTodo);
            deleteBtn.addEventListener('click', deleteTodo);
        }


    })

    if (document.querySelectorAll('li').length !== 0) {
        emptyDiv.classList.remove('fade');
        emptyDiv.style.display = 'none';

    }

    filterActive.firstChild.classList.add('active');

}

function filterTodos(filter) {
    itemsLeftFn();
    switch (filter) {
        case 'active':
            getActiveTodos();
            break;
        case 'completed':
            getCompletedTodos();
            break;
        default:
            getAllTodos();
            break;
    }
}

function clearCompletedTodos() {
    const nodeList = document.querySelectorAll('.todo-info');
    let todosToComplete = [];

    nodeList.forEach(todo => {
        const nodeListIndex = parseInt(todo.getAttribute('data-index'), 10);
        const hasActiveClass = todo.querySelector('p');

        if (hasActiveClass.classList.contains('completed')) {
            todosToComplete.push(nodeListIndex);
            todo.remove();
        }
    })

    let clearCompletedObj;
    let clearCompletedArray;


    if (localStorage.getItem('savedTodos') === null) {
        clearCompletedObj = [];
    } else {
        clearCompletedObj = JSON.parse(localStorage.getItem('savedTodos'));
        clearCompletedArray = Object.entries(clearCompletedObj);
    }

    for (let properties of clearCompletedObj) {
        propertiesParsed = JSON.parse(properties);

        for (let index = 0; index < todosToComplete.length; index++) {

            if (propertiesParsed.state === 'completed' && propertiesParsed.indexes === todosToComplete[index]) {
                propertiesParsed.state = 'deleted';

                /*the following code could be used in the 
                removeTodo function */

                propertiesStringy = JSON.stringify(propertiesParsed)
                clearCompletedObj.splice(propertiesParsed.indexes, 1, propertiesStringy)
                localStorage.setItem('savedTodos', JSON.stringify(clearCompletedObj))

            }

        }


    }
    //update items left
    itemsLeftFn();

}

function itemsLeftFn() {
    let itemsLeftLocal;
    let itemsLeftCounter = 0;

    if (localStorage.getItem('savedTodos') === null) {
        itemsLeftLocal = [];
    } else {
        itemsLeftLocal = JSON.parse(localStorage.getItem('savedTodos'));
    }

    for (let prop of itemsLeftLocal) {
        let propParsed = JSON.parse(prop)
        if (propParsed.state === 'active') {
            itemsLeftCounter += 1;
        }
    }

    itemsLeft.innerText = `${itemsLeftCounter} items left`
}

function allowReorder() {
    let allDivs = todoList.childNodes;

    let index = 0; //initialize 
    let savePos = [];

    allDivs.forEach(div => {
        div.setAttribute('draggable', 'true'); //set draggability to each div
        div.setAttribute('data-pos', index); //set the position
        index++; //add 1 for every div

        savePos.push(index)

        console.log(savePos)
    })

    //Event Listeners
}

allowReorder(); //eliminar cuando sea necesario
addEventListeners();

function dragStart(e) {
    const dragListItems = document.querySelectorAll('.todo-info');


    let dragStartIndex = e.target.getAttribute('data-index'); //get attribute with position
    let dragStartPos = e.target.getAttribute('data-pos'); //get attribute with position
    e.target.classList.add('drag') //adding class drag to element which is being dragged
    e.dataTransfer.setData('index', dragStartIndex);
    e.dataTransfer.setData('pos', dragStartPos);
    console.log('Event: ', 'dragstart', e);

    let allButSelected = document.querySelectorAll('.todo-info:not(.drag)');
    allButSelected.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

function dragEnter(e) {


    console.log('Event: ', 'dragenter', fromIndex, fromPos);
    e.target.style.opacity = 0.4;
}

function dragLeave(e) {


    console.log('Event: ', 'dragleave', e);
    e.target.style.opacity = 1;
}

function dragOver(e) {


    console.log('Event: ', 'dragover');
    e.preventDefault();
}

function dragDrop(e) {

    console.log('Event: ', 'drop', e);

    let dragStartIndex = e.dataTransfer.getData('index');
    let dragStartPos = e.dataTransfer.getData('pos');
    let dragEndIndex = e.target.getAttribute('data-index');
    let dragEndPos = e.target.getAttribute('data-pos');

    console.log(dragStartIndex, dragStartPos, dragEndIndex, dragEndPos)

    swapItems(dragStartIndex, dragStartPos, dragEndIndex, dragEndPos);

    e.target.style.opacity = 1;
}

// Swap list items that are drag and drop
function swapItems(fromIndex, fromPos, toIndex, toPos) {
    const allDivs = document.querySelectorAll('.todo-info');

    const itemOne = allDivs[fromIndex];
    const itemTwo = allDivs[toIndex];

    console.log(itemOne)
    console.log(itemTwo)

    // todoList.childNodes[fromIndex].appendChild(itemTwo);
    // todoList.childNodes[toIndex].appendChild(itemOne);
}


function addEventListeners() {
    const dragListItems = document.querySelectorAll('.todo-info');
    const todoList = document.querySelectorAll('.todo-list > ul');

    // todoList.forEach((draggable, index) => {
    //     draggable.addEventListener('dragstart', dragStart(index));
    // });
    dragListItems.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    // dragListItems.forEach(item => {
    //     item.addEventListener('dragover', dragOver);
    //     item.addEventListener('drop', dragDrop);
    //     item.addEventListener('dragenter', dragEnter);
    //     item.addEventListener('dragleave', dragLeave);
    // });
}

/* Datos
1)  sendTodoBtn y e.target son el mismo valor
2) No se puede crear un LI dentro del UL,
tengo que crear el LI en el document.object y luego adherirlo
al UL.
*/