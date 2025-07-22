// Mostrar el modal
function createNewList() {
    document.getElementById('newListModal').style.display = 'block';
}

// Cerrar el modal
function closeModal() {
    document.getElementById('newListModal').style.display = 'none';
}

// Añadir nueva lista desde el modal
function addList() {
    const input = document.getElementById('newListName');
    const listName = input.value.trim();

    if (listName) {
        const newListItem = document.createElement('li');
        newListItem.className = 'list-item';
        newListItem.textContent = listName;
        document.getElementById('list-container').appendChild(newListItem);
    }

    input.value = '';      // Limpiar campo
    closeModal();          // Cerrar modal
}
