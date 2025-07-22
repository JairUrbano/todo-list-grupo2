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

        // Crear un span para el nombre de la lista
        const nameSpan = document.createElement('span');
        nameSpan.textContent = listName;

        // Crear el icono de tacho de basura
        const trashIcon = document.createElement('span');
        trashIcon.className = 'trash-icon';
        trashIcon.innerHTML = '🗑️';
        trashIcon.title = 'Borrar lista';

        // Evento para eliminar la lista
        trashIcon.onclick = function(e) {
            e.stopPropagation();
            newListItem.remove();
        };

        newListItem.appendChild(nameSpan);
        newListItem.appendChild(trashIcon);

        document.getElementById('list-container').appendChild(newListItem);
    }

    input.value = '';      // Limpiar campo
    closeModal();       
}   // Cerrar