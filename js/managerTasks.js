let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(){
    let taskName = document.getElementById('inputTask').value;
    document.getElementById('inputTask').value = "";

    if (taskName.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La tarea no puede estar vacía!'
        });
    } else {
        tasks.push({name: taskName, status:'Pendiente'});
        Swal.fire({
            icon: 'success',
            title: '¡Tarea agregada!',
            text: `Tarea "${taskName}" agregada exitosamente!!!`
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function renderTasks() {
    let taskTableBody = document.getElementById('taskList').getElementsByTagName('tbody')[0];
    taskTableBody.innerHTML = '';

    tasks.forEach((task, index) => {
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
            completeTask(index);
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
            removeTask(index);
        });
        actionColumn.appendChild(deleteIcon);

        taskRow.appendChild(actionColumn);
        taskTableBody.appendChild(taskRow);
    });
}

function completeTask(index){
    tasks[index].status = "Completado";
    Swal.fire({
        icon: 'success',
        title: '¡Tarea completada!',
        text: `Tarea ${tasks[index].name} marcada como completa!!`
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function removeTask(index){
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
        let taskRemoved = tasks[index].name;
        if (result.isConfirmed) {
            tasks.splice(index, 1);
            Swal.fire(
                '¡Eliminado!',
                `Tarea ${taskRemoved} ha sido eliminada.`,
                'success'
            );
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    });
}

window.onload = function() {
	renderTasks();
}