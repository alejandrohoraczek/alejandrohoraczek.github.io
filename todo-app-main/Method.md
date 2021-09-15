### Cómo toglear light/dark mode

1. Primero crear variables en el CSS con los colores correspondientes a cada modo
2. Agregar al HTML las clases del modo por defecto (¿light mode?)
3. En JS llamar a los nodos HTML que tengan las clases y aplicarles a todos una clase CSS
    que cambia de modo. 
    ```html
    <div class="element dark"></div>
    ```

### Estructura objeto TODO

text:
state: completed || active 
index:

### Funciones

```js
addTodo(){
    //
}
removeTodo(){
    //
}

completeTodo(){
    /* load the localstorage in a var
    then get the array index of the todo i completed
    then remove that index and save a new one in the same position

    localstorage must be stringified? so i can splice the index and insert a new one
*/
}

filterTodo(){
    /* 
    
    */
}

clearCompleted(){
    /*
     
    */
}

```



### Agregar TODO

1. Cada TODO irá en un elemento <li>
2. Tendremos un <input> el cual guardaremos su valor en un array