let tasks = [];
let taskString = '';

function addTask(){
    let  task = prompt('Agregue una tarea: ');
    if (task === "" || task === " ") {
        console.log("La tarea no puede estar vacia!")
    } else {
        tasks.push({name: task, status:'Pendiente'});
        console.log(`tarea "${task}" agregada exitosamente!!!`);
    }
}


function displayTask() {
   
    if(tasks.length === 0) {
        console.log('No hay tareas para mostrar!!')
    }
    let output = tasks.map( ({name, status}, index) => `${index+1}.- Tarea: ${name} - Estado: ${status}`).join("\n");
    
    console.log(output);
}



function completeTask(){

    if (tasks.length === 0) {
        console.log('no hay tareas para completar');
    }

    let completeDescription = `¿Que tarea desea completar? Ingrese el número de la tarea: \n`;

    tasks.forEach(({name, status}, index) => {
        if (status != 'Completado'){
            completeDescription += `${index+1}.- ${name}: ${status}\n`;
        }
    });

    let complete = parseInt(prompt(completeDescription));
    tasks[complete-1].status = "Completado";
    console.log(`Tarea ${complete} marcada como completa!!`);

}

function removeTask(){

    if (tasks.length === 0) {
        console.log('No hay tareas para eliminar');
    }

    let removeDescription = `¿Que tarea desea eliminar? Ingrese el numero: \n`;
   
    tasks.forEach(({name, status}, index) => {        
        removeDescription += `${index+1}.- ${name}: ${status}\n`; 
    });

    let remove = parseInt(prompt(removeDescription));
    tasks.splice(remove - 1, 1);
    console.log(`Tarea ${remove} eliminada con exito!!`);
   
}



function manageTask() {

    // se elimina el switch y se agrega un objeto para las acciones del menu
    const taskActions = {
        '1': addTask,
        '2': displayTask,
        '3': completeTask,
        '4': removeTask
    };
   
    const description = `===========================
    Seleccione un número de tarea:\n===========================
    1: Agregar tarea
    2: Mostrar tareas
    3: Completar tarea
    4: Eliminar tarea
    5: Salir del programa\n=========================== `;

    let option = '';
    do {
        option = prompt(description);
        const action = taskActions[option];

        if (action) {
            action();
        } else if (option !== '5') {
            console.log('Por favor, introduzca un número válido entre 1 y 5');
        }

    } while (option !== '5');

    console.log('Ha salido de la aplicación!!');

}

manageTask();
