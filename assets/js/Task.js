class Task {
    constructor(name, status = "Pendiente") {
        this.name = name;
        this.status = status;
    }
}

const TaskStatus = {
    PENDING: "Pendiente",
    COMPLETED: "Completado"
};
