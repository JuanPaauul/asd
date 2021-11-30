import fs from "fs";
describe("Gestor Tareas", () => {
  beforeAll(() => {
    document.body.innerHTML = fs.readFileSync("index.html", "utf8");
    require("./index.js");
  });

  it("deberia mostrar la tarea creada", () => {
    const tarea_elem = document.querySelector("#task-name");
    const boton_elem = document.querySelector("#submit-button");
    const lista_elem = document.querySelector("#list-task");
    tarea_elem.value = "Primera Tarea";
    boton_elem.click();
    let tabla = document.getElementById("todo-table").rows;
    let last = tabla[tabla.length - 1];
    let cell = last.cells[1];
    let value = cell.innerHTML
    expect(value).toEqual("Primera Tarea");
  });

  it("deberia mostrar la tarea filtrada por etiqueta", () => {
    const tarea_elem = document.querySelector("#task-name");
    const etiqueta_elem = document.querySelector("#task-tag");
    const input_etiqueta_elem = document.querySelector("#task-filter-input");
    const boton_elem = document.querySelector("#submit-button");
    const filterboton_elem = document.querySelector("#filter-button");
    const lista_elem = document.querySelector("#list-task");
    tarea_elem.value = "Primera Tarea";
    etiqueta_elem.value="Etiqueta";
    boton_elem.click();
    input_etiqueta_elem.value="Etiqueta";
    filterboton_elem.click();
    let tabla_filtrada=document.getElementById("todo-table-filter").rows;
    let last = tabla_filtrada[tabla_filtrada.length - 1];
    let cell = last.cells[4];//valor en la columna 4 de la ultima fila de la tabla filtrada que corresponde a las etiquetas
    let cell2=last.cells[1];// valor en la columna 1 de la ultima fila de la tabla filtrada q corresponde al nombre
    let value1 = cell.innerHTML;
    let value2=cell2.innerHTML;
    expect(value2).toEqual("Primera Tarea");
    expect(value1).toEqual("#Etiqueta");
  });

  it("deberia mostrar la tarea filtrada por fecha", () => {
    const tarea_elem = document.querySelector("#task-name");
    const dateLimit=document.querySelector("#task-limit-date");
    const filteroption=document.querySelector("#task-filter");
    const etiqueta_elem = document.querySelector("#task-tag");
    const input_filter= document.querySelector("#task-filter-input");
    const boton_elem = document.querySelector("#submit-button");
    const filterboton_elem = document.querySelector("#filter-button");
    const lista_elem = document.querySelector("#list-task");
    tarea_elem.value = "Primera Tarea";
    dateLimit.value="2021-11-22";
    etiqueta_elem.value="Etiqueta";
    boton_elem.click();
    input_filter.value="2021-11-22";
    filteroption.value="FechaF";
    filterboton_elem.click();
    let tabla_filtrada=document.getElementById("todo-table-filter").rows;
    let last = tabla_filtrada[tabla_filtrada.length - 1];
    let cell = last.cells[3];//valor en la columna 4 de la ultima fila de la tabla filtrada que corresponde a las etiquetas
    let cell2=last.cells[1];// valor en la columna 1 de la ultima fila de la tabla filtrada q corresponde al nombre
    let value1 = cell.innerHTML;
    let value2=cell2.innerHTML;
    expect(value2).toEqual("Primera Tarea");
    expect(value1).toEqual("2021-11-22");
  });


  it("Al iniciar no hay nada en la lista de tareas", () => {
    const lista_elem = document.querySelector("#list-task");
    expect(lista_elem.innerHTML).toEqual("");
  });

  afterEach(() => {
    const lista_elem = document.querySelector("#list-task");
    lista_elem.innerHTML = "";
  });
});