const todoInput = document.querySelector(".add-todo input");
filters = document.querySelectorAll(".filters span"),
clearll = document.querySelector(".clear-all");
todoBox = document.querySelector(".todobox");
//todoCounter = document.querySelector(".tr");

let editId;
let isEditedTodo = false;
// set the local storage
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("span.pending").classList.remove("pending");
    btn.classList.add("pending");
    showTodo(btn.id);
  });
});

function showTodo(){
  let li = "";
  if(todos){
    todos.forEach((todo, id) => {
      let isCompleted = todo.status == "completed" ? "checked" : ""; 
      //Problems with filters
      //if(filter == todo.status || filter == "all") {
        li += `<li class="todo">
        <label for="${id}">
          <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
          <p class = "${isCompleted}">${todo.name}</p>
        </label>
        <div class="config">
          <i onclick="showMenu(this)"class="uil uil-ellipsis-h"></i>
          <ul class="todo-menu">
              <li onclick="editTodo(${id}, '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
              <li onclick="deleteTodo(${id})" ><i class="uil uil-trash"></i>Remove</li>
          </ul>
          </div>
        </li>`;
      //}
    });
  }
  todoBox.innerHTML = li;
}

showTodo("all");

function updateStatus(selectedTodo){
  let todoName = selectedTodo.parentElement.lastElementChild;
  if(selectedTodo.checked) {
    todoName.classList.add("checked");
    //for actual status: completed
    todos[selectedTodo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    //for actual status: active
    todos[selectedTodo.id].status = "active";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function showMenu(selectedTodo){
  // todo menu like gordon blue or if someone prefer edit tasks to do
  let todoMenu = selectedTodo.parentElement.lastElementChild;
  todoMenu.classList.add("show");
  document.addEventListener("click", e => {
    // to remove the menu's display
    if(e.target.tagName != "I" || e.target != selectedTodo){
      todoMenu.classList.remove("show");
    }
  });
}
function editTodo(todoId, todoName){
  //to edit our todo menu tasks
  editId = todoId;
  todoInput.value = todoName;
  isEditedTodo = true;
}

function deleteTodo(deleteid){
  //to remove useless tasks to do 
  todos.splice(deleteid, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}

clearll.addEventListener("click", () => {
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

//todoCounter.addEventListener("click", ()=> {

//});

todoInput.addEventListener( "keyup", e=> {
  let userTodo = todoInput.value.trim();
  if(e.key == "Enter" && userTodo){
    //local Storage
    if(!isEditedTodo) {
      if(!todos) {
        todos = [];
      }
      let todoInfo = {name: userTodo, status: "active"};
      todos.push(todoInfo);
    } else {
      isEditedTodo = false;
      todos[editId].name = userTodo;
    }
    todoInput.value = ""; 
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(); 
  }
});
