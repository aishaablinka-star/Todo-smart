
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function load() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      tasks = JSON.parse(data);
    } catch (e) {
      tasks = [];
      console.error("Erreur JSON:", e);
    }
  }
}
function getVisibleTasks() {
  if (currentFilter === "active") return tasks.filter(t => !t.done);
  if (currentFilter === "done") return tasks.filter(t => t.done);
  return tasks; // all
}
function updateCounter() {
  const remaining = tasks.filter(t => !t.done).length;
  counter.textContent = ${remaining} restantes;
}
function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "item";
  if (task.done) li.classList.add("done");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;
  checkbox.addEventListener("change", () => toggleTask(task.id));
  li.appendChild(checkbox);

  const span = document.createElement("span");
  span.className = "text";
  span.textContent = task.text;
  li.appendChild(span);

  const spacer = document.createElement("div");
  spacer.className = "spacer";
  li.appendChild(spacer);

  const btn = document.createElement("button");
  btn.className = "icon-btn";
  btn.textContent = "Supprimer";
  btn.addEventListener("click", () => deleteTask(task.id));
  li.appendChild(btn);

  return li;
}
> 萧染:
function render() {
  taskList.innerHTML = "";
  const visibleTasks = getVisibleTasks();
  visibleTasks.forEach(task => taskList.appendChild(createTaskElement(task)));
  updateCounter();
}
function addTask(text) {
  text = text.trim();
  if (!text) return; // refuse vide

  const task = {
    id: Date.now().toString(),
    text,
    done: false
  };
  tasks.push(task);
  save();
  render();
}
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.done = !task.done;
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}
> 萧染:
function setActiveFilterButton(activeBtn) {
  filterBtns.forEach(btn => btn.classList.remove("is-active"));
  activeBtn.classList.add("is-active");
}
> 萧染:
// Ajouter tâche
addBtn.addEventListener("click", () => {
  addTask(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
});

taskInput.addEventListener("keydown", e => {
  if (e.key === "Enter") addBtn.click();
});

// Filtre
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    setActiveFilterButton(btn);
    render();
  });
});

// Supprimer terminées
clearDoneBtn.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
});

// Tout supprimer
clearAllBtn.addEventListener("click", () => {
  tasks = [];
  save();
  render();
});
load();
render();