let allLists = JSON.parse(localStorage.getItem("todoLists")) || [];
let currentEdit = { type: "", listId: null, taskId: null };

function saveToStorage() {
  localStorage.setItem("todoLists", JSON.stringify(allLists));
}

function generateId() {
  return Date.now().toString();
}

function createList() {
  const input = document.getElementById("listNameInput");
  const name = input.value.trim();
  if (!name) return alert("Ponle un nombre a la lista");
  allLists.push({ id: generateId(), name, tasks: [] });
  saveToStorage();
  input.value = "";
  renderLists();
}

function openModal(type, listId, taskId = null) {
  currentEdit = { type, listId, taskId };
  const modal = document.getElementById("modal");
  const input = document.getElementById("modalInput");
  const title = document.getElementById("modalTitle");

  if (type === "list") {
    const list = allLists.find(l => l.id === listId);
    input.value = list.name;
    title.textContent = "Editar nombre de la lista";
  } else {
    const list = allLists.find(l => l.id === listId);
    const task = list.tasks.find(t => t.id === taskId);
    input.value = task.name;
    title.textContent = "Editar tarea";
  }

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function confirmEdit() {
  const input = document.getElementById("modalInput").value.trim();
  if (!input) return;

  if (currentEdit.type === "list") {
    const list = allLists.find(l => l.id === currentEdit.listId);
    list.name = input;
  } else {
    const list = allLists.find(l => l.id === currentEdit.listId);
    const task = list.tasks.find(t => t.id === currentEdit.taskId);
    task.name = input;
  }

  saveToStorage();
  closeModal();
  renderLists();
}

function deleteList(id) {
  if (confirm("¿Eliminar esta lista?")) {
    allLists = allLists.filter(l => l.id !== id);
    saveToStorage();
    renderLists();
  }
}

function addTask(listId, inputEl) {
  const name = inputEl.value.trim();
  if (!name) return;
  const list = allLists.find(l => l.id === listId);
  list.tasks.push({ id: generateId(), name, completed: false });
  inputEl.value = "";
  saveToStorage();
  renderLists();
}

function toggleTask(listId, taskId) {
  const list = allLists.find(l => l.id === listId);
  const task = list.tasks.find(t => t.id === taskId);
  task.completed = !task.completed;
  saveToStorage();
  renderLists();
}

function deleteTask(listId, taskId) {
  const list = allLists.find(l => l.id === listId);
  list.tasks = list.tasks.filter(t => t.id !== taskId);
  saveToStorage();
  renderLists();
}

function renderLists() {
  const container = document.getElementById("listsContainer");
  container.innerHTML = "";

  allLists.forEach(list => {
    const listDiv = document.createElement("div");
    listDiv.className = "card";


    listDiv.innerHTML = `
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-xl font-bold text-gray-800">${list.name}</h2>
        <div class="space-x-2">
          <button onclick="openModal('list', '${list.id}')" class="btn-icon">✏️</button>
          <button onclick="deleteList('${list.id}')" class="btn-icon text-red-500 hover:text-red-600">🗑️</button>
        </div>
      </div>

      <div class="space-y-1">
        ${list.tasks.map(task => `
          <div class="flex justify-between items-center task">
            <div class="flex items-center gap-2">
              <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask('${list.id}', '${task.id}')">
              <span class="${task.completed ? "completed" : ""}">${task.name}</span>
            </div>
            <div class="space-x-1">
              <button onclick="openModal('task', '${list.id}', '${task.id}')" class="btn-icon">✏️</button>
              <button onclick="deleteTask('${list.id}', '${task.id}')" class="btn-icon text-red-500 hover:text-red-600">🗑️</button>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="flex gap-2 mt-4">
        <input type="text" id="input-${list.id}" placeholder="Nueva tarea" class="input">
        <button onclick="addTask('${list.id}', document.getElementById('input-${list.id}'))" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Agregar</button>
      </div>
    `;

    container.appendChild(listDiv);
  });
}

renderLists();
