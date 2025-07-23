function createNewList() {
    document.getElementById('newListModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('newListModal').style.display = 'none';
}

function addList() {
    const input = document.getElementById('newListName');
    const listName = input.value.trim();

    if (listName && !document.querySelector(`[data-list-name="${listName}"]`)) {
        const newListItem = document.createElement('li');
        newListItem.className = 'list-item';
        newListItem.dataset.listName = listName;

        const titleSpan = document.createElement('span');
        titleSpan.textContent = listName;
        titleSpan.className = 'list-title';

        // Botón Editar lista
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.className = 'edit-list-btn';
        editBtn.onclick = function () {
            const nuevoNombre = prompt('Editar nombre de la lista:', titleSpan.textContent);
            if (nuevoNombre && nuevoNombre !== listName) {
                const oldTasks = JSON.parse(localStorage.getItem(listName)) || [];
                localStorage.setItem(nuevoNombre, JSON.stringify(oldTasks));
                localStorage.removeItem(listName);

                titleSpan.textContent = nuevoNombre;
                newListItem.dataset.listName = nuevoNombre;
            }
        };

        // Botón Eliminar lista
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.className = 'delete-list-btn';
        deleteBtn.onclick = function () {
            localStorage.removeItem(listName);
            newListItem.remove();
        };

        // Mostrar tareas al hacer clic en el título
        titleSpan.onclick = function () {
            showTaskArea(newListItem.dataset.listName);
        };

        newListItem.appendChild(titleSpan);
        newListItem.appendChild(editBtn);
        newListItem.appendChild(deleteBtn);
        document.getElementById('list-container').appendChild(newListItem);
    }

    input.value = '';
    closeModal();
}

function showTaskArea(listName) {
    const mainArea = document.querySelector('.main-area');
    mainArea.innerHTML = ''; // Limpiar

    const header = document.createElement('h2');
    header.textContent = ` ${listName}`;

    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Nueva tarea';

    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Agregar tarea';

    const taskList = document.createElement('ul');
    taskList.className = 'task-list';

    // Cargar tareas almacenadas
    const tareasGuardadas = JSON.parse(localStorage.getItem(listName)) || [];
    tareasGuardadas.forEach(t => addTask(t.text, taskList, listName, t.done));

    addTaskBtn.onclick = function () {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText, taskList, listName, false);
            taskInput.value = '';
        }
    };

    mainArea.appendChild(header);
    mainArea.appendChild(taskInput);
    mainArea.appendChild(addTaskBtn);
    mainArea.appendChild(taskList);
}

function addTask(text, taskList, listName, isDone) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isDone;
    checkbox.onchange = () => saveTasks(listName, taskList);

    const taskSpan = document.createElement('span');
    taskSpan.textContent = text;
    if (isDone) taskSpan.style.textDecoration = 'line-through';

    checkbox.addEventListener('change', () => {
        taskSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        saveTasks(listName, taskList);
    });

    // Botón Editar tarea
    const editTaskBtn = document.createElement('buttonlapiz');
    editTaskBtn.innerHTML = '✏️';
    editTaskBtn.className = 'edit-task-btn';
    editTaskBtn.onclick = function () {
        const nuevoTexto = prompt('Editar tarea:', taskSpan.textContent);
        if (nuevoTexto) {
            taskSpan.textContent = nuevoTexto;
            saveTasks(listName, taskList);
        }
    };

    // Botón Eliminar tarea
    const deleteTaskBtn = document.createElement('buttontacho');
    deleteTaskBtn.innerHTML = '🗑️';
    deleteTaskBtn.className = 'delete-task-btn';
    deleteTaskBtn.onclick = function () {
        taskItem.remove();
        saveTasks(listName, taskList);
    };

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(editTaskBtn);
    taskItem.appendChild(deleteTaskBtn);
    taskList.appendChild(taskItem);

    saveTasks(listName, taskList);
}

function saveTasks(listName, taskList) {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(item => {
        const text = item.querySelector('span').textContent;
        const done = item.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text, done });
    });
    localStorage.setItem(listName, JSON.stringify(tasks));
}

// Cargar listas desde localStorage al iniciar
window.onload = function () {
    for (let i = 0; i < localStorage.length; i++) {
        const listName = localStorage.key(i);
        const newListItem = document.createElement('li');
        newListItem.className = 'list-item';
        newListItem.dataset.listName = listName;

        const titleSpan = document.createElement('span');
        titleSpan.textContent = listName;
        titleSpan.className = 'list-title';

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.className = 'edit-list-btn';
        editBtn.onclick = function () {
            const nuevoNombre = prompt('Editar nombre de la lista:', titleSpan.textContent);
            if (nuevoNombre && nuevoNombre !== listName) {
                const oldTasks = JSON.parse(localStorage.getItem(listName)) || [];
                localStorage.setItem(nuevoNombre, JSON.stringify(oldTasks));
                localStorage.removeItem(listName);

                titleSpan.textContent = nuevoNombre;
                newListItem.dataset.listName = nuevoNombre;
            }
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.className = 'delete-list-btn';
        deleteBtn.onclick = function () {
            localStorage.removeItem(listName);
            newListItem.remove();
        };

        titleSpan.onclick = function () {
            showTaskArea(newListItem.dataset.listName);
        };

        newListItem.appendChild(titleSpan);
        newListItem.appendChild(editBtn);
        newListItem.appendChild(deleteBtn);
        document.getElementById('list-container').appendChild(newListItem);
    }
};
