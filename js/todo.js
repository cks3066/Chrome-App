const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
const NUMTODO_KEY = "countToDos";

let toDos = [];
let countToDos = 0;

const savedNumToDos = localStorage.getItem(NUMTODO_KEY);
if (savedNumToDos !== null) {
  countToDos = parseInt(savedNumToDos);
}
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  if (countToDos !== 0) {
    countToDos--;
    localStorage.setItem(NUMTODO_KEY, countToDos);
  }
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newToDoObj) {
  const li = document.createElement("li");
  li.className = "toDo";
  li.id = newToDoObj.id;
  const span = document.createElement("span");
  span.innerText = newToDoObj.text;
  const button = document.createElement("button");
  button.className = "toDoButton";
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  if (countToDos < 5) {
    countToDos++;
    localStorage.setItem(NUMTODO_KEY, countToDos);
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
      text: newTodo,
      id: Date.now(),
    };
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
  } else {
    alert("To Do List가 가득 찼습니다.");
  }
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
