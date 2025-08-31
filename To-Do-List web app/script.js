const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        const span = document.createElement('span');
        span.textContent = task.text;

        const actions = document.createElement('div');
        actions.classList.add('actions');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✔';
        completeBtn.onclick = () => toggleComplete(index);

        const editBtn = document.createElement('button');
        editBtn.textContent = '✎';
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑';
        deleteBtn.onclick = () => deleteTask(index);

        actions.append(completeBtn, editBtn, deleteBtn);
        li.append(span, actions);
        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;
    tasks.push({ text, completed: false });
    taskInput.value = '';
    saveTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText;
        saveTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

addBtn.addEventListener('click', addTask);

// Add task on Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

renderTasks();
