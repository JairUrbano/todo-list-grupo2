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
        li.classList.add('task-item');

        // Crear el ícono de check como span
        const check = document.createElement('span');
        check.classList.add('check-circle');
        check.innerHTML = '&#10003;'; // ✓ símbolo unicode

        // Evento: marcar tarea como completada
        check.addEventListener('click', () => {
            li.classList.toggle('completed');
            check.classList.toggle('checked');
        });

        const text = document.createElement('span');
        text.textContent = value;

        li.appendChild(check);
        li.appendChild(text);
        document.getElementById('taskList').appendChild(li);
        input.value = '';
    }
}

