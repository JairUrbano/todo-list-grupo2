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

        const titleSpan = document.createElement('span');
        titleSpan.textContent = listName;
        titleSpan.className = 'list-title';

        // Botón Editar lista
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.className = 'edit-list-btn';
        editBtn.onclick = function () {
            const nuevoNombre = prompt('Editar nombre de la lista:', titleSpan.textContent);
            if (nuevoNombre) {
                titleSpan.textContent = nuevoNombre;
            }
        };

        // Botón Eliminar lista
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.className = 'delete-list-btn';
        deleteBtn.onclick = function () {
            newListItem.remove();
        };

        // Mostrar tareas al hacer clic en el título
        titleSpan.onclick = function () {
            showTaskArea(listName);
        };

        newListItem.appendChild(titleSpan);
        newListItem.appendChild(editBtn);
        newListItem.appendChild(deleteBtn);
        document.getElementById('list-container').appendChild(newListItem);
    }

    input.value = '';
    closeModal();
}

// Mostrar tareas
function showTaskArea(listName) {
    const mainArea = document.querySelector('.main-area');
    mainArea.innerHTML = ''; // Limpiar

    const header = document.createElement('h2');
    header.textContent = `Tareas de: ${listName}`;

    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Nueva tarea';

    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Agregar tarea';
    const taskList = document.createElement('ul');
    taskList.className = 'task-list';

    addTaskBtn.onclick = function () {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText, taskList);
            taskInput.value = '';
        }
    };

    mainArea.appendChild(header);
    mainArea.appendChild(taskInput);
    mainArea.appendChild(addTaskBtn);
    mainArea.appendChild(taskList);
}

// Añadir una tarea
function addTask(text, taskList) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const taskSpan = document.createElement('span');
    taskSpan.textContent = text;

    // Botón Editar tarea
    const editTaskBtn = document.createElement('button');
    editTaskBtn.innerHTML = '✏️';
    editTaskBtn.className = 'edit-task-btn';
    editTaskBtn.onclick = function () {
        const nuevoTexto = prompt('Editar tarea:', taskSpan.textContent);
        if (nuevoTexto) {
            taskSpan.textContent = nuevoTexto;
        }
    };

    // Botón Eliminar tarea
    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.innerHTML = '🗑️';
    deleteTaskBtn.className = 'delete-task-btn';
    deleteTaskBtn.onclick = function () {
        taskItem.remove();
    };

    taskItem.appendChild(taskSpan);
    taskItem.appendChild(editTaskBtn);
    taskItem.appendChild(deleteTaskBtn);
    taskList.appendChild(taskItem);
}