import * as f from "./App.js";
import fs from "fs";
import Task from "./Task.js";
import TasksList from "./TasksList.js";

function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}
describe("Fechas", () => {
    it("deberia retornar la fecha", () => {
        var expectedDate = new Date("2021-11-10").toISOString().split('T')[0];
        expect(f.getDate("2021-11-10")).toEqual(expectedDate);
    });
    it("deberia retornar la fecha_2", () => {
        var expectedDate = new Date("2018-12-11").toISOString().split('T')[0];
        expect(f.getDate("2018-12-11")).toEqual(expectedDate);
    });
    it("deberia retornar la fecha_3", () => {
        var expectedDate = new Date("1997-05-05").toISOString().split('T')[0];
        expect(f.getDate("1997-05-05")).toEqual(expectedDate);
    });
});


describe("Categorias", () => {
    beforeAll(() => {
        document.body.innerHTML = fs.readFileSync("index.html", "utf8");
        require("./index.js");
    });

    it("deberia retornar la categoria por defecto", () => {
        const taskType = document.getElementById("task-type");
        //const boton_elem = document.getElementById("type-task").value = "Trabajo";
        if (taskType != null) {
            var categoria = String(taskType.value);
        }
        expect(categoria).toEqual("Estudio");
    });
    it("deberia retornar la categoria elegida", () => {
        const taskType = document.getElementById("task-type");
        if (taskType != null) {
            taskType.value = "Trabajo";
            var categoria = String(taskType.value);
        }
        expect(categoria).toEqual("Trabajo");
    });
    it("deberia retornar la categoria elegida", () => {
        const taskType = document.getElementById("task-type");
        if (taskType != null) {
            taskType.value = "Deberes";
            var categoria = String(taskType.value);
        }
        expect(categoria).toEqual("Deberes");
    });

    afterEach(() => {
        const lista_elem = document.querySelector("#list-task");
        lista_elem.innerHTML = "";
    });
});
describe("Etiquetas ingresadas por usuario", () => {
    it("deberia retornar la etiqueta con #", () => {
        expect(f.returnEtiqueta("etiqueta1")).toEqual("#etiqueta1");
    });
    it("deberia retornar 2 etiquetas ", () => {
        expect(f.returnEtiqueta("etiqueta1,etiqueta2")).toEqual("#etiqueta1 #etiqueta2");
    });
    it("deberia retornar 3 etiquetas ", () => {
        expect(f.returnEtiqueta("etiqueta1,etiqueta2,etiqueta3")).toEqual("#etiqueta1 #etiqueta2 #etiqueta3");
    });
    it("Deberia retornar las etiquetas sin tomar en cuenta los espacios", () => {
        expect(f.returnEtiqueta("etiqueta1, etiqueta2, etiqueta3")).toEqual("#etiqueta1 #etiqueta2 #etiqueta3");
    });
    it("Deberia retornar las etiquetas evitando etiquetas repetidas", () => {
        expect(f.returnEtiqueta("etiqueta1, etiqueta2, etiqueta2")).toEqual("#etiqueta1 #etiqueta2");
    });
});
describe("La descripcion debe ser insertada correctamente", () => {
    it("deberia retornar la descripcion", () => {
        let taskDescription = "Some Item";
        let taskTag ="tag";
        let taskName = "name";
        let taskLimitDate = "2018-12-11";
        let taskType ="type";
        let task = f.insertNewTodoInTable(taskName,taskType,taskLimitDate,taskTag,taskDescription);
        expect(task.Description).toEqual('Some Item');
    });

});
describe("Los tags deben ser insertados correctamente", () => {
    it("deberia retornar los tags", () => {
        let taskDescription = "Some Item";
        let taskTag ="tag";
        let taskName = "name";
        let taskLimitDate = "2018-12-11";
        let taskType ="type";
        let task = f.insertNewTodoInTable(taskName,taskType,taskLimitDate,taskTag,taskDescription);
        expect(task.Tag).toEqual('#tag');

    });

});
describe("el nombre debe ser insertado correctamente", () => {
    it("deberia retornar el nombre", () => {
        let taskDescription = "Some Item";
        let taskTag ="tag";
        let taskName = "name";
        let taskLimitDate = "2018-12-11";
        let taskType ="type";
        let task = f.insertNewTodoInTable(taskName,taskType,taskLimitDate,taskTag,taskDescription);
        expect(task.Name).toEqual('name');

    });

});
describe("la fecha debe ser insertada correctamente", () => {
    it("deberia retornar la fecha", () => {
        let taskDescription = "Some Item";
        let taskTag ="tag";
        let taskName = "name";
        let taskLimitDate = "2018-12-11";
        let taskType ="type";
        let task = f.insertNewTodoInTable(taskName,taskType,taskLimitDate,taskTag,taskDescription);
        expect(task.LimitDate).toEqual('2018-12-11');

    });

});
describe("El tipo de trabajo debe ser insertado correctamente", () => {
    it("deberia retornar el tipo de trabajo", () => {
        let taskDescription = "Some Item";
        let taskTag ="tag";
        let taskName = "name";
        let taskLimitDate = "2018-12-11";
        let taskType ="type";
        let task = f.insertNewTodoInTable(taskName,taskType,taskLimitDate,taskTag,taskDescription);
        expect(task.Type).toEqual('type');

    });

});

describe("Parametros de la clase Task",() => {
    it("Deberia retornar el nombre de la tarea",()=>{
      let task = new Task(0,"name","type","1/11/1111","tag","description");
      expect(task.Name).toEqual("name");
    });
    it("Deberia retornar el tipo de la tarea",()=>{
        let task = new Task(0,"name","type","1/11/1111","tag","description");
        expect(task.Type).toEqual("type");
    });
    it("Deberia retornar la fecha de la tarea",()=>{
        let task = new Task(0,"test","test","1/11/1111","tag","description");
        expect(task.LimitDate).toEqual("1/11/1111");
    });
    it("Deberia retornar la etiqueta de la tarea",()=>{
        let task = new Task(0,"test","test","1/11/1111","tag","description");
        expect(task.Tag).toEqual("tag");
    });
    it("Deberia retornar la descripcion de la tarea",()=>{
        let task = new Task(0,"test","test","1/11/1111","tag","description");
        expect(task.Description).toEqual("description");
    });
    it("Deberia retornar el nombre de una tarea editada",()=>{
        let task = new Task(0,"newName","test","1/11/1111","test","test");
        expect(task.Name).toEqual("newName");
    });
    it("Deberia retornar el estado de la tarea, se espera un false porque la tarea aun no termino",()=>{
        let task = new Task(0,"newName","test","1/11/1111","test","test");
        expect(task.IsDone).toEqual(false);
    });
    it("Deberia retornar el estado de la tarea, se espera un true porque se indico que la tarea termino",()=>{
        let task = new Task(0,"newName","test","1/11/1111","test","test");
        task.Done();
        expect(task.IsDone).toEqual(true);
    });
  });

describe("Funcionamiento de la clase TaskList",() => {
    it("Deberia agregar una Task a la lista y obtener el tamano de la misma una vez ingresado",()=>{
        let task = new TasksList();
        task.addTask("test","test","1/11/1111","test","test");
        expect(task.listLength).toEqual(1);
    });
    it("Deberia retornar el nombre de la tarea ingresada",()=>{
        let task = new TasksList();
        task.addTask("1st Task","type","1/11/1111","tag","description");
        expect(task.getTask(0).Name).toEqual("1st Task");
    });
    it("Deberia retornar el nombre de la segunda tarea ingresada",()=>{
        let task = new TasksList();
        task.addTask("1st Task","type","1/11/1111","tag","description");
        task.addTask("2nd Task","type","1/11/1111","tag","description");
        expect(task.getTask(1).Name).toEqual("2nd Task");
    });

    it("Deberia retornar la id de la tarea con el nombre indicado (buscar por nombre)",()=>{
        let task = new TasksList();
        task.addTask("1st Task","type","1/11/1111","tag","description");
        task.addTask("2nd Task","type","1/11/1111","tag","description");
        expect(task.getTaskByName("2nd Task")).toEqual([1]);
      });
      it("Deberia retornar las ids de las tareas en una lista con el nombre indicado (buscar por nombre)",()=>{
        let task = new TasksList();
        task.addTask("1st Task","type","1/11/1111","tag","description");
        task.addTask("2nd Task","type","1/11/1111","tag","description");
        task.addTask("2nd Task","2nd type","1/11/1111","2nd tag","2nd description");
        let expectedList = [1,2];
        expect(task.getTaskByName("2nd Task")).toEqual(expectedList);
      });

      it("Deberia retornar la id de la tarea con el tipo indicado (buscar por tipo)",()=>{
        let task = new TasksList();
        task.addTask("Task","type","1/11/1111","tag","description");
        task.addTask("Task","2nd type","1/11/1111","tag","description");
        expect(task.getTaskByType("2nd type")).toEqual([1]);
      });
      it("Deberia retornar las ids de las tareas en una lista con el tipo indicado (buscar por tipo)",()=>{
        let task = new TasksList();
        task.addTask("Task","1st type","1/11/1111","tag","description");
        task.addTask("Task","2nd type","1/11/1111","tag","description");
        task.addTask("Task","2nd type","1/11/1111","2nd tag","2nd description");
        let expectedList = [1,2];
        expect(task.getTaskByType("2nd type")).toEqual(expectedList);
      });

      it("Deberia retornar la id de la tarea con la fecha indicada (buscar por fecha)",()=>{
        let task = new TasksList();
        task.addTask("Task","type","1/11/1111","tag","description");
        task.addTask("Task","type","2/12/2000","tag","description");
        expect(task.getTaskByDate("2/12/2000")).toEqual([1]);
      });
      it("Deberia retornar las ids de las tareas en una lista con la fecha indicada (buscar por fecha)",()=>{
        let task = new TasksList();
        task.addTask("Task","type","1/11/1111","tag","description");
        task.addTask("Task one","type one","2/12/2000","tag one","description one");
        task.addTask("Task two","type two","2/12/2000","tag two","description two");
        let expectedList = [1,2];
        expect(task.getTaskByDate("2/12/2000")).toEqual(expectedList);
      });

      it("Deberia retornar la id de la tarea con la etiqueta indicada (buscar por etiqueta)",()=>{
        let task = new TasksList();
        task.addTask("Task","type","1/11/1111","a tag","description");
        task.addTask("Task","type","1/11/1111","another tag","description");
        expect(task.getTaskByTag("a tag")).toEqual([0]);
      });
      it("Deberia retornar las ids de las tareas en una lista con la etiqueta indicada (buscar por etiqueta)",()=>{
        let task = new TasksList();
        task.addTask("Task","type","1/11/1111","a tag","description");
        task.addTask("Task one","type one","2/12/2000","another tag","description one");
        task.addTask("Task two","type two","21/11/2000","another tag","description two");
        let expectedList = [1,2];
        expect(task.getTaskByTag("another tag")).toEqual(expectedList);
      });

      it("Deberia retornar la id de la tarea con la descripcion indicada (buscar por descripcion)",()=>{
        let task = new TasksList();
        task.addTask("Task","type","1/11/1111","a tag","a description");
        task.addTask("Task","type","1/11/1111","another tag","another description");
        expect(task.getTaskByDescription("a description")).toEqual([0]);
      });
      it("Deberia retornar las ids de las tareas en una lista con la descripcion indicada (buscar por descripcion)",()=>{
        let task = new TasksList();
        task.addTask("Task","type","1/11/1111","a tag","Hello, this is the description");
        task.addTask("Task one","type one","2/12/2000","another tag","description one");
        task.addTask("Task two","type two","21/11/2000","another tag","Hello, this is the description");
        let expectedList = [0,2];
        expect(task.getTaskByDescription("Hello, this is the description")).toEqual(expectedList);
      });
});
describe("Funcionamiento del filtro por descripcion",() => {
    it("Deberia devolver 1 tarea con la descripcion ingresada",()=>{
        let task = new TasksList();
        task.addTask("test","test","1/11/1111","test","testDescripcion");
        let filteredTasks= [];
        filteredTasks= task.getTaskByDescription("testDescripcion");
        console.log(filteredTasks.length);
        expect(filteredTasks.length).toEqual(1);
    });
    it("Deberia devolver 1 tarea con la descripcion ingresada y no la que no lleva el valor a buscar",()=>{
        let task = new TasksList();
        task.addTask("test","test","1/11/1111","test","testDescripcion");
        task.addTask("test","test","1/11/1111","test","test");
        let filteredTasks= [];
        filteredTasks= task.getTaskByDescription("testDescripcion");
        console.log(filteredTasks.length);
        expect(filteredTasks.length).toEqual(1);
    });
    it("Deberia devolver 2 tarea con la descripcion ingresada",()=>{
        let task = new TasksList();
        task.addTask("test","test","1/11/1111","test","testDescripcion");
        task.addTask("test","test","1/11/1111","test","test");
        task.addTask("test","test","1/11/1111","test","testDescripcion");
        let filteredTasks= [];
        filteredTasks= task.getTaskByDescription("testDescripcion");
        console.log(filteredTasks.length);
        expect(filteredTasks.length).toEqual(2);
    });
    
    it("Deberia devolver 2 tarea con la descripcion ingresada",()=>{
        let task = new TasksList();
        task.addTask("test","test","1/11/1111","test","testDescripcion");
        task.addTask("test","test","1/11/1111","test","test");
        task.addTask("test","test","1/11/1111","test","testDescripcion");
        task.addTask("test","test","1/11/1111","test","testDescripcion");
        task.addTask("test","test","1/11/1111","test","test");
        let filteredTasks= [];
        filteredTasks= task.getTaskByDescription("testDescripcion");
        console.log(filteredTasks.length);
        expect(filteredTasks.length).toEqual(3);
    });
});

describe("Funcionamiento del filtro por Categorías",() => {
    it("Deberia devolver 1 tarea con la categoría ingresada",()=> {
        let task = new TasksList();
        task.addTask("test","Estudio","1/11/1111","test","testDescripcion");
        let filteredTasks= [];
        filteredTasks= task.getTaskByType("Estudio");
        console.log(filteredTasks.length);
        expect(filteredTasks.length).toEqual(1);
    });
    it("Deberia devolver 2 tareas con la categoría ingresada",()=>{
        let task = new TasksList();
        task.addTask("test","Deberes","1/11/1111","test","testDescripcion");
        task.addTask("test","Deberes","1/11/1111","test","test");
        let filteredTasks= [];
        filteredTasks= task.getTaskByType("Deberes");
        console.log(filteredTasks.length);
        expect(filteredTasks.length).toEqual(2);
    });
    
    it("Deberia devolver 3 tareas con la descripcion ingresada",()=>{
        let task = new TasksList();
        task.addTask("test","Personal","1/11/1111","test","testDescripcion");
        task.addTask("test","Personal","1/11/1111","test","test");
        task.addTask("test","Personal","1/11/1111","test","testDescripcion");
        task.addTask("test","Estudio","1/11/1111","test","testDescripcion");
        task.addTask("test","Estudio","1/11/1111","test","test");
        let filteredTasks= [];
        filteredTasks= task.getTaskByType("Personal");
        console.log(filteredTasks.length);
        expect(filteredTasks.length).toEqual(3);
    });
    describe("Funcionamiento del filtro por nombres",() => {
        it("Deberia devolver 1 tarea con el nombre ingresado",()=> {
            let task = new TasksList();
            task.addTask("test","Estudio","1/11/1111","test","testDescripcion");
            let filteredTasks= [];
            filteredTasks= task.getTaskByName("test");
            console.log(filteredTasks.length);
            expect(filteredTasks.length).toEqual(1);
        });
        it("Deberia devolver 2 tareas con el nombre ingresado",()=>{
            let task = new TasksList();
            task.addTask("test","Deberes","1/11/1111","test","testDescripcion");
            task.addTask("test","Deberes","1/11/1111","test","test");
            let filteredTasks= [];
            filteredTasks= task.getTaskByName("test");
            console.log(filteredTasks.length);
            expect(filteredTasks.length).toEqual(2);
        });
        it("Deberia devolver 3 tareas con el nombre ingresado",()=>{
            let task = new TasksList();
            task.addTask("test","Personal","1/11/1111","test","testDescripcion");
            task.addTask("test","Personal","1/11/1111","test","test");
            task.addTask("test","Personal","1/11/1111","test","testDescripcion");
            task.addTask("task","Estudio","1/11/1111","test","testDescripcion");
            task.addTask("task","Estudio","1/11/1111","test","test");
            let filteredTasks= [];
            filteredTasks= task.getTaskByName("test");
            console.log(filteredTasks.length);
            expect(filteredTasks.length).toEqual(3);
        });
    });
});