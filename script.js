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

        newListItem.addEventListener('click', function () {
            showListView(listName);
        });

        document.getElementById('list-container').appendChild(newListItem);
    }

    input.value = '';
    closeModal();
}

function showListView(title) {
    document.querySelector('.welcome-message').style.display = 'none';
    const listView = document.querySelector('.list-view');
    listView.style.display = 'block';

    document.getElementById('selectedListName').textContent = title;
    document.getElementById('taskList').innerHTML = ''; // limpia tareas anteriores
    document.getElementById('taskInput').value = '';
}

function addTask() {
    const input = document.getElementById('taskInput');
    const value = input.value.trim();

    if (value) {
        const li = document.createElement('li');
        li.className = 'task-item';

        const checkbox = document.createElement('span');
        checkbox.className = 'custom-checkbox';
        checkbox.addEventListener('click', () => {
            checkbox.classList.toggle('checked');
            li.classList.toggle('completed');
        });

        const text = document.createElement('span');
        text.textContent = value;

        li.appendChild(checkbox);
        li.appendChild(text);

        document.getElementById('taskList').appendChild(li); // al final
        input.value = '';
    }
}
