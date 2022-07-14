var procesador1 = new Procesador();
var p1 = 0;
var hilo1;

$(document).ready(function() {

    procesador1.CalcularRendimiento();
    $("#vrendimiento1").html(dibujarRendiminetos(procesador1.rendimientoProcesos));

    preestablecer();  

    function crear() {
        var nombre = $("#nombre1").val();
        var tiempo = $("#Prioridad").val();
        var prioridad = $("#Prioridad").val();
        var tini = procesador1.cronometro+1;
        var disponible = 1;
        var proceso = new Proceso(p1, nombre, tiempo, tini, disponible, prioridad);
        procesador1.CrearProceso(proceso);
        p1++;
        preestablecer();
        $("#listos1").html(dibujarCola(procesador1.listos)); 
    }

    $("#crear").click(function() {
        crear();
    });

-
    $("#ejecutar1").click(function() {
        $("#ejecutar1").attr("disabled", true);
        $("#interrumpir1").attr("disabled", false);
        hilo1 = setInterval(function() {
            procesador1.CorrerProcesador(disponibles);
            $("#listos1").html(dibujarCola(procesador1.listos));
            $("#bloqueados1").html(dibujarCola(procesador1.bloqueados));
            $("#terminados1").html(dibujarCola(procesador1.terminados));
            $("#SeccionCritica").html(dibujarCola(procesador1.CPU));
            $("#cronometro1").text(procesador1.cronometro);

            $("#dGantt1").html("");
            pintarGantt(procesador1.estados, "#dGantt1");

            procesador1.CalcularRendimiento();
            $("#vrendimiento1").html(dibujarRendiminetos(procesador1.rendimientoProcesos));

        }, 1000);

    });

    $("#interrumpir1").click(function() {
        $("#interrumpir1").attr("disabled", true);
        $("#ejecutar1").attr("disabled", false);
        procesador1.DetenerProcesador(disponibles);
        clearInterval(hilo1);
        $("#listos1").html(dibujarCola(procesador1.listos));
        $("#bloqueados1").html(dibujarCola(procesador1.bloqueados));
        $("#terminados1").html(dibujarCola(procesador1.terminados));
    });


});

abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function preestablecer() {
    $("#nombre1").val(abc[p1]);
    $("#tiempo1").val(Math.floor((Math.random() * 10) + 1));
    $("#Prioridad").val(Math.floor((Math.random() * 4) + 1));
}

function dibujarCola(cola) {
    var colaAux = new Cola();
    var textoCola = "";
    var procesoAux;
    while (!cola.Listavacia()) {
        procesoAux = cola.Listaatender();
        textoCola += dibujarProceso(procesoAux);
        colaAux.Listainsertar(procesoAux);
    }
    while (!colaAux.Listavacia()) {
        procesoAux = colaAux.Listaatender();
        cola.Listainsertar(procesoAux);
    }
    return textoCola;
}

function dibujarProceso(proceso) {
    var procesoAux = "<tr>";
    procesoAux += "<td>" + proceso.nombre + "</td>";
    procesoAux += "<td>" + "T.Rafaga:" + proceso.tiempo + "</td>";
    procesoAux += "</tr>";
    return procesoAux;
}


function dibujarRendiminetos(procesos) {
    var texto = "<tr><td>Nombre</td><td>Tiempo Llegada</td><td>Tiempo Rafaga</td><td>Tiempo Comienzo</td><td>Tiempo Finalizacion</td><td>Tiempo Retorno</td><td>Tiempo Espera</td></tr>";
    for (var i = 0; i < procesos.length; i++) {
        texto += "<tr><td>"+abc[i]+"</td>";
        for (var j = 1; j < 7; j++) {
                texto += "<td>" + procesos[i][j] + "</td>";
        }
        texto += "</tr>";
    }
    return texto;
}
