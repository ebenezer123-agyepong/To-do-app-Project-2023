// Selecting elements
const todoInput = document.querySelector("#todo-input");
const submitInput = document.querySelector("#submit");
const todosContainer = document.querySelector(".todos");
const completedCount = document.querySelector(".completedCount");
const remarks = document.querySelector(".remarks");
const footer = document.querySelector(".footer");

// Initializing variables and loading previous todos from local storage
var elem = null;
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to update local storage with current todos
function updateLocalStorage() {
localStorage.setItem("todos", JSON.stringify(todos));
}

// Loading previous todos and updating completed count
window.addEventListener("load", () => {
todos.forEach((t) => {
newTodo(t.value, t.checked);
countComplted();
});
});

// Function to update UI in case there are no todos
function updateUi(notodos) {
if (notodos) {
remarks.querySelectorAll("div").forEach((d) => {
d.style.display = "none";
});
const p = document.createElement("p");
p.textContent = "No todos ";
remarks.appendChild(p);
remarks.style.borderRadius = "8px";
footer.style.display = "none";
} else {
footer.style.display = "block";
remarks.style.borderRadius = "0px";
remarks.style.borderBottomLeftRadius = "8px";
remarks.style.borderBottomRightRadius = "8px";
remarks.querySelector("p").remove();
remarks.querySelectorAll("div").forEach((d) => {
d.style.display = "flex";
});
}
}

// Adding event listener to todo input for "Enter" key press
todoInput.addEventListener("keyup", function (e) {
if (e.key === "Enter" || e.keyCode === 13) {
if (e.target.value !== "") createTodo(e.target.value);
}
});

// Adding event listener to submit button click
submitInput.addEventListener("click", () => {
if (todoInput.value !== "") createTodo(todoInput.value);
});

// Function to create a new todo and add to todos array and local storage
function createTodo(value) {
todos.push({ value: value, checked: false });
localStorage.setItem('todos', JSON.stringify(todos))
newTodo(value);
todoInput.value = "";
countComplted();
if (todos.length > 0 && todos.length < 2) {
updateUi(false);
}
}

// Function to update the "checked" status of a todo
function updateTodos(value, bool) {
todos.forEach((t) => {
if (t.value === value) {
t.checked = bool;
}
});
}

// Function to update the completed count
function countComplted() {
  completedCount.textContent = `${todos.filter((t) => t.checked === false).length
    } items left`;
}

// Function to toggle the theme
function changeTheme() {
document.body.classList.toggle("light");
}

// Function to clear completed todos
function clearCompleted() {
todos = todos.filter((t) => t.checked !== true);
document.querySelectorAll(".todo").forEach((todo) => {
if (todo.querySelector("input").checked) {
todo.remove();
}
});
localStorage.setItem('todos', JSON.stringify(todos)); // update local storage
if (todos.length === 0) {
updateUi(true);
}
}

function showAll(e) {
  // Remove the "filterActive" class from all filters and add it to the "All" filter
  document.querySelectorAll(".filters div").forEach((d, i) => {
    if (i === 0) {
      d.classList.add("filterActive");
    } else {
      d.classList.remove("filterActive");
    }
  });
  // Show all todos
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
  });
}

function filterCompleted() {
  // Remove the "filterActive" class from all filters and add it to the "Completed" filter
  document.querySelectorAll(".filters div").forEach((d, i) => {
    if (i === 2) {
      d.classList.add("filterActive");
    } else {
      d.classList.remove("filterActive");
    }
  });
  // Show completed todos and hide incomplete todos
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
    if (!todo.querySelector("input").checked) {
      todo.style.display = "none";
    }
  });
}

function filterActive(e) {
  // Remove the "filterActive" class from all filters and add it to the "Active" filter
  document.querySelectorAll(".filters div").forEach((d, i) => {
    if (i === 1) {
      d.classList.add("filterActive");
    } else {
      d.classList.remove("filterActive");
    }
  });
  // Show incomplete todos and hide completed todos
  document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
    if (todo.querySelector("input").checked) {
      todo.style.display = "none";
    }
  });
}

// Create a Sortable object for the todos container
var el = document.querySelector(".todos");
var sortable = Sortable.create(el, {
  onEnd: function (evt) {
    // Get the moved todo
    const todo = evt.item;
    const value = todo.querySelector("p").textContent;
    // Remove the todo from the todos array
    let index = todos.findIndex((t) => t.value === value);
    todos.splice(index, 1);

    // Add the todo back to the todos array in its new position
    if (todo.nextSibling) {
      let index1 = todos.findIndex(
        (t) => t.value === todo.nextSibling.querySelector("p").textContent
      );
      todos.splice(index1, 0, {
        value: value,
        checked: todo.querySelector("input").checked,
      });
    } else {
      todos.push({
        value: value,
        checked: todo.querySelector("input").checked,
      });
    }
  },
});
