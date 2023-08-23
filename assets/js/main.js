const taskManager = new TaskManager();

window.onload = function() {
    taskManager.renderTasks();

    document.getElementById('addTaskBtn').addEventListener('click', () => {
        const taskName = document.getElementById('inputTask').value;
        taskManager.addTask(taskName);
        document.getElementById('inputTask').value = "";
    });
};
