function createNewList() {
    document.getElementById('newListModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('newListModal').style.display = 'none';
}

function addList() {
    const input = document.getElementById('newListName');
    const listName = input.value.trim();

    if (listName) {
        const newListItem = document.createElement('li');
        newListItem.className = 'list-item';
        newListItem.textContent = listName;

        // Cuando se hace clic en una lista
        newListItem.addEventListener('click', function () {
            showListAsTable(listName);
        });

        document.getElementById('list-container').appendChild(newListItem);
    }

    input.value = '';
    closeModal();
}

function showListAsTable(title) {
    const mainArea = document.querySelector('.main-area');
    mainArea.innerHTML = `
        <div class="table-container">
            <div class="table-header">${title}</div>
            <div class="table-body">
                <ul id="taskList"></ul>
                <div class="task-input">
                    <input type="text" id="taskInput" placeholder="Escribe una tarea..." />
                    <button onclick="addTask()">Añadir</button>
                </div>
            </div>
        </div>
    `;
}

function addTask() {
    const input = document.getElementById('taskInput');
    const value = input.value.trim();

    if (value) {
        const li = document.createElement('li');
        li.textContent = `• ${value}`;
        document.getElementById('taskList').appendChild(li);
        input.value = '';
    }
}
