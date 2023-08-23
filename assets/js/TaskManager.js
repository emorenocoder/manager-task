class TaskManager {
    
    constructor(){
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(name) {
        if (name.trim() === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La tarea no puede estar vacía!'
            });
            return;
        }

        const task = new Task(name);
        this.tasks.push(task);
        this._showMessage('success', '¡Tarea agregada!', `Tarea "${name}" agregada exitosamente!!!`);
        this.save();
        this.renderTasks();
    }

    completeTask(index) {
        this.tasks[index].status = TaskStatus.COMPLETED;
        this._showMessage('success', '¡Tarea completada!', `Tarea ${this.tasks[index].name} marcada como completa!!`);
        this.save();
        this.renderTasks();
    }

    removeTask(index) {
        const taskName = this.tasks[index].name;
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.tasks.splice(index, 1);
                this._showMessage('success', '¡Eliminado!', `Tarea ${taskName} ha sido eliminada.`);
                this.save();
                this.renderTasks();
            }
        });
    }

    _showMessage(icon, title, text) {
        Swal.fire({ icon, title, text });
    }

    save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    renderTasks() {
        let taskTableBody = document.getElementById('taskList').getElementsByTagName('tbody')[0];
        taskTableBody.innerHTML = '';

        this.tasks.forEach((task, index) => {
            let taskRow = document.createElement('tr');
    
            // Columna Tarea
            let taskNameColumn = document.createElement('td');
            taskNameColumn.innerText = task.name;
            taskRow.appendChild(taskNameColumn);
    
            // Columna Estado
            let taskStatusColumn = document.createElement('td');
            taskStatusColumn.innerText = task.status;
            taskRow.appendChild(taskStatusColumn);
    
            // Columna Acción
            let actionColumn = document.createElement('td');
    
            // Ícono de completar
            let completeIcon = document.createElement('i');
            completeIcon.className = 'fas fa-check-circle';
            completeIcon.title = 'Completar tarea';
            completeIcon.style.cursor = 'pointer';
            completeIcon.style.color = 'green';
            completeIcon.addEventListener('click', () => {
                this.completeTask(index);
            });
            actionColumn.appendChild(completeIcon);
    
            // Espacio entre íconos
            let spacer = document.createTextNode(' ');
            actionColumn.appendChild(spacer);
    
            // Ícono de eliminar
            let deleteIcon = document.createElement('i');
            deleteIcon.className = 'fas fa-trash-alt';
            deleteIcon.title = 'Eliminar tarea';
            deleteIcon.style.cursor = 'pointer';
            deleteIcon.style.color = 'red';
            deleteIcon.addEventListener('click', () => {
                this.removeTask(index);
            });
            actionColumn.appendChild(deleteIcon);
    
            taskRow.appendChild(actionColumn);
            taskTableBody.appendChild(taskRow);
        });
    }
}