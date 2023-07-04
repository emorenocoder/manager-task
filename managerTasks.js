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

    if (tasks.length > 0){
        for (let i = 0; i < tasks.length; i++) {
            const element = tasks[i];
            let estado = 'Pendiente'; 
            
            if (element.status == "Completado"){
                estado = 'Completado';
            }
    
            console.log(`${i+1}.- tarea: ${element.name}, estado: ${estado}`);
        }
    } else {
        console.log('no hay tareas para mostrar');
    }
    
}



function completeTask(){
    if (tasks.length > 0){
        let completeDescription = `¿Que tarea desea completar? Ingrese el número de la tarea: \n`;
        
        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            completeDescription += `${index+1}.- ${element.name}: ${element.status}\n`;
        }

        let complete = parseInt(prompt(completeDescription));
        tasks[complete-1].status = "Completado";
        console.log(`Tarea ${complete} marcada como completa!!`);
    }else{
        console.log('no hay tareas para completar');
    }
}

function removeTask(){
    
    if (tasks.length > 0){
        let removeDescription = `¿Que tarea desea eliminar? Ingrese el numero: \n`;
        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            removeDescription += `${index+1}.- ${element.name}: ${element.status}\n`;
        }
        
        let remove = parseInt(prompt(removeDescription));
        tasks.splice(remove - 1, 1);
        console.log(`Tarea ${remove} eliminada con exito!!`);
    }else{
        console.log('no hay tareas para eliminar');
    }
}

function manageTask() {
    
    let option = '';
    let descripcion = `===========================
    Seleccione un numero tarea:\n===========================
    1: Agregar tarea
    2: Mostrar tareas
    3: Completar tarea
    4: Eliminar tarea
    5: Salir del programa\n=========================== `;
    do{
        option = prompt(descripcion);
        switch (option) {
            case '1':
                addTask();
                break;
            case '2':
                displayTask();
                break;
            case '3':
                completeTask();
                break;
            case '4':
                removeTask();
                break;
            case '5':
                console.log('Ha salido de la aplicacion!!');
                break;
            default:
                console.log('Ingrese un numero entre 1 y 5');
                break;
        }

    } while (option != 5);

}

manageTask();
