abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function pintarGantt(procesos, lugar) {

    var taskNames = [];
    var tasks = [];
    var numeroProcesos = procesos.length;

    var procesoAux;
    for (var i = 0; i < numeroProcesos; i++) {
        taskNames[i] = abc[i];
        procesoAux = procesos[i];
        tasks = tasks.concat(dividirProceso(procesoAux, i));
    }
    //console.log(tasks);

    var taskStatus = {
        "E": "bar",
        "L": "bar-failed",
        "S": "bar-running",
        "B": "bar-killed",
        "T": "bar-B"

    };


    tasks.sort(function (a, b) {
        return a.endDate - b.endDate;
    });
    var maxDate = tasks[tasks.length - 1].endDate;
    tasks.sort(function (a, b) {
        return a.startDate - b.startDate;
    });
    var minDate = tasks[0].startDate;

    var format = "%M:%S";

    var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
    gantt(tasks, lugar);

}

/* funcion para crear una tarea en el formato indicado */
function crearTask(ti, tf, estado, nombre) {
    var tiSegundos = ti % 60;
    var tiMinutos = parseInt(ti / 60);
    var tfSegundos = tf % 60;
    var tfMinutos = parseInt(tf / 60);
    var tarea = {"startDate": new Date("Sun Dec 09 00:" + tiMinutos + ":" + tiSegundos + " EST 2012"), "endDate": new Date("Sun Dec 09 00:" + tfMinutos + ":" + tfSegundos + " EST 2012"), "taskName": nombre, "status": estado}
    return tarea;
}

/* funcion para armar el arreglo con los nombres de los procesos */
function taskNames() {

}


/*  funcion para dividir el proceso en tareas */
function dividirProceso(proceso, nombre) {
    var numeroInstantes = proceso.length;
    var ti;
    var tf;
    var estado;
    var contadorTasks = 0;
    var arregloTasks = [];

    if (numeroInstantes > 0) {
        estado = proceso[0][1];
        ti = proceso[0][0];
    }

    for (var i = 1; i < numeroInstantes; i++) {
        if (proceso[i][1] != estado) {
            tf = proceso[i][0];
            arregloTasks[contadorTasks] = crearTask(ti, tf, estado, abc[nombre]);
            contadorTasks++;
            ti = tf;
            estado = proceso[i][1];
        }
    }

    if (numeroInstantes > 0) {
        tf = proceso[numeroInstantes - 1][0] + 1;
        arregloTasks[contadorTasks] = crearTask(ti, tf, estado,abc[nombre]);
    }
    return arregloTasks;
}