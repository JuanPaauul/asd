import fs from "fs";
describe("Gestor Tareas", () => {
  beforeAll(() => {
    document.body.innerHTML = fs.readFileSync("index.html", "utf8");
    require("./index.js");
  });

  it("Al iniciar no hay nada en la lista de tareas", () => {
    const rows = document.getElementById("todo-table").rows.length;
    expect(rows).toEqual(1);
  });

  it("Se crea una tarea", () => {
    const taskName = document.querySelector("#task-name");
    const taskType = document.querySelector("#task-type");
    const taskLimitTime = document.querySelector("#task-limit-date");
    const TaskTags = document.querySelector("#task-tag");
    const TaskDescription = document.querySelector("#task-description");
    const submitButton = document.querySelector("#submit-button");
    
    taskName.value = "test";
    taskType.value = "test";
    taskLimitTime.value = "11/11/2000";
    TaskTags.value = "test";
    TaskDescription.value = "test";

    submitButton.click();

    const rows = document.getElementById("todo-table").rows.length;
    expect(rows).toEqual(2);
  });

  it("Se crea n tareas", (n=10) => {
    const taskName = document.querySelector("#task-name");
    const taskType = document.querySelector("#task-type");
    const taskLimitTime = document.querySelector("#task-limit-date");
    const TaskTags = document.querySelector("#task-tag");
    const TaskDescription = document.querySelector("#task-description");
    const submitButton = document.querySelector("#submit-button");
    
    for(var i=1; i<n; i++){
      taskName.value = "test";
      taskType.value = "test";
      taskLimitTime.value = "11/11/2000";
      TaskTags.value = "test";
      TaskDescription.value = "test";

      submitButton.click();
    }
    const rows = document.getElementById("todo-table").rows.length;
    expect(rows).toEqual(n+1);
  });

  afterEach(() => {
    const lista_elem = document.querySelector("#list-task");
    lista_elem.innerHTML = "";
  });
});