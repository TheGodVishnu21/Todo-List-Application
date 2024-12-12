const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

addBtn.addEventListener('click', () => {
    const userInput = input.value.trim();
    if (userInput) {
        const todo = { id: Date.now(), value: userInput, completed: false };
        todos.push(todo);
        input.value = '';
        renderTodos();
        saveTodos();
    }
});

clearBtn.addEventListener('click', () => {
    todos = [];
    renderTodos();
    saveTodos();
});

function deleteItem(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
    saveTodos();
}

function editItem(id) {
    const todo = todos.find(todo => todo.id === id);
    const newValue = prompt('Edit the todo:', todo.value);
    if (newValue && newValue.trim() !== '') {
        todo.value = newValue.trim();
        renderTodos();
        saveTodos();
    }
}

function toggleCompletion(id) {
    const todo = todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    renderTodos();
    saveTodos();
}

function renderTodos() {
    todoList.innerHTML = '';
    const completedTasks = todos.filter(todo => todo.completed).length;
    const pendingTasks = todos.length - completedTasks;

    const statusIndicator = document.createElement('div');
    statusIndicator.innerHTML = `
        <span>Completed: ${completedTasks}</span>
        <span> | </span>
        <span>Pending: ${pendingTasks}</span>
    `;

    todoList.appendChild(statusIndicator);

    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.className = `list-group-item list-item ${todo.completed ? 'completed' : ''}`;

        listItem.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleCompletion(${todo.id})">
            <span>${todo.value}</span>
            <span>
                <button class="btn btn-light btn-sm" onclick="editItem(${todo.id})">Edit</button>
                <button class="btn btn-light btn-sm" onclick="deleteItem(${todo.id})">Delete</button>
            </span>
            <span class="completion-status ${todo.completed ? 'completed' : 'pending'}">
                ${todo.completed ? 'Completed' : 'Pending'}
            </span>
        `;

        todoList.appendChild(listItem);
    });
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

renderTodos();