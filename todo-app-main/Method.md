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
     1- tomar INDEX del div y ¿guardalos como array? entonces tendría todos los
        index de los to-do que hay que eliminar
     2- loopear sobre los divs y buscar el que tiene clase 'completed'.
     3- eliminar div del document object 
     4- modificar el estado de los to-do correspondientes

    */
}
 allowReorder(todosLosDivs){
     /*
    !!! en el parámetro meto todos los divs con los elementos
    1- haré un bucle por cada elemento de la lista
    agregando la propiedad draggable="true".
    2- agregar parámetro más en el html con la posición actual en la lista
    3- al momento de comenzar el drag, tomar el índice de la posicion y reemplazarlo a él y sus datos en el div original.
    4- tomar los valores intermedios entre los dos índices y les restamos uno. de esa manera, reposicionamos todos los elementos.
    5- guardar la posición de cada elemento en un array que se actualice cada vez que se añade o elimina elementos. guardarlo en cookie.
     */
 }


```



### Agregar TODO

1. Cada TODO irá en un elemento <li>
2. Tendremos un <input> el cual guardaremos su valor en un array