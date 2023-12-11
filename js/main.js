 const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
    const todosContainer = document.getElementById('todos');
    const errorMessage = document.getElementById('errorMessage');
	
	 getTodos();

    async function getTodos() {
      try {
        const response = await fetch(apiUrl);
        const todos = await response.json();
        displayTodos(todos);
      } catch (error) {
        showError('Failed to fetch todos');
      }
    }

    function displayTodos(todos) {
      todosContainer.innerHTML = '';
      todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
          <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleCompletion(${todo.id})">
          <span>${todo.title}</span>
          <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todosContainer.appendChild(todoItem);
      });
    }

    async function addTodo() {
      const titleInput = document.getElementById('title');
      const titleTitle = titleInput.value;

      if (!titleTitle) {
        showError('Please enter a title');
        return;
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: titleTitle,
            completed: false,
          }),
        });
        const title = await response.json();
        getTodos();
        titleInput.value = '';
      } catch (error) {
        showError('Failed to add a new todo');
      }
    }

    async function toggleCompletion(todoId) {
      try {
        const response = await fetch(`${apiUrl}/${todoId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: true,
          }),
        });
        const updatedTodo = await response.json();
        getTodos();
      } catch (error) {
        showError('Failed to update todo completion status');
      }
    }

    async function deleteTodo(todoId) {
      try {
        await fetch(`${apiUrl}/${todoId}`, {
          method: 'DELETE',
        });
        getTodos();
      } catch (error) {
        showError('Failed to delete todo');
      }
    }

    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 3000);
    }