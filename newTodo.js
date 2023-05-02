function newTodo(value, completed = false) {
  // Create DOM elements
  const todo = document.createElement("div");
  const todoText = document.createElement("p");
  const todoCheckBox = document.createElement("input");
  const todoCheckBoxLabel = document.createElement("label");
  const todoCross = document.createElement("span");

  // Set properties for each element
  todoText.textContent = value;
  todoCheckBox.type = "checkbox";
  todoCheckBox.id = `${value.replace(/\s+/g, "")}`;
  todoCheckBox.name = `${value.replace(/\s+/g, "")}`;
  todoCheckBox.title = "checkbox";
  todoCheckBox.checked = completed;
  todoCheckBoxLabel.htmlFor = `${value.replace(/\s+/g, "")}`;

  // Add event listeners for checkbox and todoText
  todoCheckBoxLabel.addEventListener("click", function (e) {
    if (todoCheckBox.checked) {
      todoText.classList.remove("strikethrough");
      todoCheckBoxLabel.classList.remove("active");
      updateTodos(value, false);
      updateLocalStorage();
      countComplted();
    } else {
      updateTodos(value, true);
      updateLocalStorage();
      countComplted();
      todoText.classList.add("strikethrough");
      todoCheckBoxLabel.classList.add("active");
    }
  });

  todoText.addEventListener("click", function (e) {
    if (todoCheckBox.checked) {
      todoCheckBox.checked = false;
      todoText.classList.remove("strikethrough");
      todoCheckBoxLabel.classList.remove("active");
      updateTodos(value, false);
      updateLocalStorage();
      countComplted();
    } else {
      todoCheckBox.checked = true;
      updateTodos(value, true);
      updateLocalStorage();
      countComplted();
      todoText.classList.add("strikethrough");
      todoCheckBoxLabel.classList.add("active");
    }
  });

  // Add event listener for todoCross
  todoCross.addEventListener("click", function (e) {
    e.target.parentElement.remove();
    todos = todos.filter((t) => t.value !== value);
    updateLocalStorage();
    countComplted();
    if (todos.length === 0) {
      updateUi(true);
    }
  });

  // Add classes to each element
  todo.classList.add("todo");
  todoCheckBoxLabel.classList.add("circle");
  if (todoCheckBox.checked) {
    todoCheckBoxLabel.classList.add("active");
    todoText.classList.add("strikethrough");
  }
  todoCross.classList.add("cross");

  // Append elements to todo div and todosContainer
  todo.appendChild(todoCheckBox);
  todo.appendChild(todoCheckBoxLabel);
  todo.appendChild(todoText);
  todo.appendChild(todoCross);
  todosContainer.appendChild(todo);

  // Update local storage with updated todos array
  updateLocalStorage();
}
