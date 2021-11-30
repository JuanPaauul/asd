class Task {
    constructor(id, name, type, limitdate, tag, description) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.limitdate = limitdate;
        this.tag = tag;
        this.description = description;
        this.isDone = false;
    }
    get Id() {
		return this.id;
	}
    get Name() {
        return this.name;
    }
    get Type() {
        return this.type;
    }
    get LimitDate() {
        return this.limitdate;
    }
    get Tag() {
        return this.tag;
    }
    get Description() {
        return this.description;
    }
    get IsDone(){
        return this.isDone;
    }
    Done(){
        this.isDone = true;
    }
}

export default Task;