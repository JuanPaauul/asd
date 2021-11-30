import * as f from "./App.js";
import TasksList from "./TasksList.js";

const form = document.querySelector("#Organizador-form");
const filterform = document.querySelector("#filter-form");
const dataTable = document.querySelector("#todo-table");
var btnfilter = document.getElementById("#filter-button");

var todoIndex = 0;
var todoData = {};

let listOfTasks = new TasksList();
const listTask = document.querySelector("#list-task");
const taskName = document.querySelector("#task-name");
const taskType = document.querySelector("#task-type");
const taskLimitDate = document.querySelector("#task-limit-date");
const taskTags = document.querySelector("#task-tag");
const taskDescription = document.querySelector("#task-description");
const taskFilter = document.getElementById("task-filter");
const taskCategories = document.querySelector("#category-filter");

function fillValuesToTable(table, task) {
    let newTodoRowRef = table.insertRow(-1);
    newTodoRowRef.insertCell(0).textContent = task.Id;
    newTodoRowRef.insertCell(1).textContent = task.Name;
    newTodoRowRef.insertCell(2).textContent = task.Type;
    newTodoRowRef.insertCell(3).textContent = task.LimitDate;
    newTodoRowRef.insertCell(4).textContent = task.Tag;
    newTodoRowRef.insertCell(5).textContent = task.Description;
}

function addTasksToList(task) {
    let todoTableRef = document.getElementById("todo-table");
    let newTodoRowRef = todoTableRef.insertRow(-1);
    newTodoRowRef.insertCell(0).textContent = task.Id;
    newTodoRowRef.insertCell(1).textContent = task.Name;
    newTodoRowRef.insertCell(2).textContent = task.Type;
    newTodoRowRef.insertCell(3).textContent = task.LimitDate;
    newTodoRowRef.insertCell(4).textContent = task.Tag;
    newTodoRowRef.insertCell(5).textContent = task.Description;
    newTodoRowRef.insertCell(6).innerHTML = "<button class='todo-table-button'>Marcar como terminado</button>";
    newTodoRowRef.insertCell(7).innerHTML = "<a href='#' class='btn btn-danger' name='delete'>Eliminar Tarea</a>";
}

function filtertasks(tasksFiltered) {
    let todoDoneTableRef = document.getElementById("todo-table-filter");

    tasksFiltered.forEach(task => {
        let newTodoRowRef = todoDoneTableRef.insertRow(-1);
        newTodoRowRef.insertCell(0).textContent = task.Id;
        newTodoRowRef.insertCell(1).textContent = task.Name;
        newTodoRowRef.insertCell(2).textContent = task.Type;
        newTodoRowRef.insertCell(3).textContent = task.LimitDate;
        newTodoRowRef.insertCell(4).textContent = task.Tag;
        newTodoRowRef.insertCell(5).textContent = task.Description;
    });
}

function clearTable(TableID) {
    let TableRef = document.getElementById(TableID).rows;
    let size = TableRef.length;
    for (let i = 1; i < size; i++) {
        TableRef[i].remove();
    }
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    var taskCreate = f.insertNewTodoInTable(taskName.value, taskType.value, taskLimitDate.value, taskTags.value, taskDescription.value);
    addTasksToList(taskCreate);
    form.reset();
});

dataTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-table-button')) {
        var tableRow = e.target.closest('tr');
        var task = f.markTaskAsDone(tableRow);
        fillValuesToTable(document.getElementById("todo-done-table"), task);
        tableRow.remove();
    }
    if (e.target.classList.contains('edit-table-button')) {
        f.editTask(e.target.closest('tr'));
    }
    f.deleteTask(e.target);
});

filterform.addEventListener("submit", (event) => {
    //filterform.reset();
    event.preventDefault();
    clearTable("todo-table-filter");
    let tipoFiltro = document.getElementById("task-filter");
    let elementoABuscar = document.getElementById("task-filter-input");
    var categoriaABuscar = taskCategories.options[taskCategories.selectedIndex];
    let tasks;
    switch (tipoFiltro.value) {
        case "EtiquetasF":
            tasks = f.filtrarEtiquetas(elementoABuscar.value);
            break;
        case "FechaF":
            tasks = f.filtrarFechas(elementoABuscar.value);
            break;
        case "DescripcionF":
            tasks = f.filtrarDescripcion(elementoABuscar.value);
            break;
        case "Categoria":
            tasks = f.filtrarCategoria(categoriaABuscar.value);
            break;
        case "NombreF":
            tasks = f.filtrarNombre(elementoABuscar.value);
            break;
        case "Semana":
            tasks = f.filtrarPorSemana(elementoABuscar.value);
            break;
        default:
            console.log("no eligio bien");
            break;
    }
    if (tasks.length > 0) {
        filtertasks(tasks);
    }
    filterform.reset();
});

taskFilter.addEventListener("change", function() {
    if (taskFilter.value == "Categoria") {
        taskCategories.style.display = "block";
    } else {
        taskCategories.style.display = "none";
    }
});