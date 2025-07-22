
// Función para crear nuevas listas
function createNewList() {
    const listName = prompt('Introduce el nombre de la nueva lista:');
    if (listName) {
        const newListItem = document.createElement('li');
        newListItem.className = 'list-item';
        newListItem.textContent = listName;
        document.getElementById('list-container').appendChild(newListItem);
    }
}
