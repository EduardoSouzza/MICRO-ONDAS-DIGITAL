var tempoPausado = 0;
var timeOut;
var timeOutAquecendo;
var started = false;
var main;

function Iniciar() {
    var value = +($("#tipoPrograma").val());

    if (value === 0)
        this.iniciarProgramaPadrao();
    else
        this.iniciarProgramaCustomizado();

}

function iniciarProgramaCustomizado() {
    if (started)
        return;
    var programa = $("#cbPrograma option:selected").text();
    $.ajax({
        url: '/Home/IniciarPrograma',
        type: 'Post',
        data: {
            nome: programa
        },
        success: function (data) {
            if (data.invalid) {
                $("#cuidado").html("<strong>Cuidado!</strong> " + data.result).show();
                return;
            } else {
                $("#cuidado").hide();
                main = data.result;
                started = true;
                iniciarCronometro(getTime(data.result.tempo));
                aquecendo();
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function iniciarProgramaPadrao() {
    if (started)
        return;


    var programa;
    var tempo = getTime($(".txtTempo").val());
    var potencia = $(".txtPotencia").val();
    var caracter = $(".txCaracter").html().charAt(0);

    if (main && main.nome === "Aquecimento Rápido") {
        programa = main;
    } else {
        programa = {
            nome: "ProgramaPadrao",
            tempo: tempo,
            potencia: potencia,
            caracter: caracter
        };
    }

    $.ajax({
        url: '/Home/IniciarProgramaPadrao',
        type: 'Post',
        data: programa,
        success: function (data) {
            if (data.invalid) {
                $("#cuidado").html("<strong>Cuidado!</strong> " + data.result).show();
                return;
            } else {
                $("#cuidado").hide();
                main = data.result;
                started = true;
                iniciarCronometro(getTime(data.result.tempo));
                aquecendo();
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function AquecimentoRapido() {
    if (started)
        return;
    $.ajax({
        url: '/Home/InicioRapido',
        type: 'Post',
        success: function (data) {
            if (data.invalid) {
                $("#cuidado").html("<strong>Cuidado!</strong> " + data.result).show();
                return;
            } else {
                $("#cuidado").hide();
                $(".txCaracter").html(data.result.caracter);
                main = data.result;
                started = true;
                iniciarCronometro(getTime(data.result.tempo));
                aquecendo();
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function Parar() {
    //atualiza o tempo no main
    $.ajax({
        url: '/Home/Parar',
        type: 'Post',
        data: main,
        success: function (data) {
            if (data.result) {
                main = data.result;
                started = false;
                tempoPausado = 0;
                $(".txCaracter").html(main.caracter);
                $(".tempo").html("00:00");
                clearTimeout(timeOut);
                clearTimeout(timeOutAquecendo);
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function Pausar() {
    //atualiza o tempo no main
    main.tempo = getTime($(".tempo").html());
    $.ajax({
        url: '/Home/Pausar',
        type: 'Post',
        data: main,
        success: function (data) {
            if (data.result.paused) {
                main = data.result;
                started = false;
                tempoPausado = main.tempo;
                clearTimeout(timeOut);
                clearTimeout(timeOutAquecendo);
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function getTime(texto) {
    var strMinutos = +texto.substring(0, texto.indexOf(":"));
    var strSegundos = +texto.substring(texto.indexOf(":") + 1);
    return (strMinutos * 60) + strSegundos;
}

function iniciarCronometro(tempo) {
    if (tempo >= 0) {
        var min = parseInt(tempo / 60);
        var seg = tempo % 60;
        if (min < 10) {
            min = "0" + min;
            min = min.substr(0, 2);
        }
        if (seg <= 9) {
            seg = "0" + seg;
        }
        horaImprimivel = min + ':' + seg;
        $(".tempo").html(horaImprimivel);
        timeOut = setTimeout(function () {
            iniciarCronometro(tempo);
        }, 1000);
        tempo--;
    } else {
        started = false;
        clearTimeout(timeOutAquecendo);
        $(".txStringAquecendo").html("String aquecida");
    }
}

function menuEscolha() {
    var value = +($("#tipoPrograma").val());
    if (value === 0) {
        resetInfo();
    }
    else {
        $(".txtTempo").prop('disabled', true);
        $(".txtPotencia").prop('disabled', true);
        $(".personalizado").show();
        menuPrograma();
    }
    Pausar();
}

function resetInfo() {
    if (main)
        main.nome = "";
    $(".txtTempo").prop('disabled', false);
    $(".txtPotencia").prop('disabled', false);
    $(".txtTempo").val("02:00");
    $(".txtPotencia").val("10");
    $(".personalizado").hide();
    $(".txCaracter").html("#");
}

function menuPrograma() {
    var value = +($("#cbPrograma").val());
    $.ajax({
        url: '/Home/GetPrograma',
        type: 'GET',
        data: {
            index: value
        },
        success: function (result) {
            if (result) {
                $(".txtTempo").val(result.tempo);
                $(".txtPotencia").val(result.potencia);
                $(".txInstrucao").html(result.instrucao);
                $(".txCaracter").html(result.caracter);
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function aquecendo() {
    var caracter = $('.txCaracter').html().charAt(0);
    var potencia = +$(".txtPotencia").val();
    $('.txCaracter').html($('.txCaracter').html() + Array(potencia + 1).join(caracter));
    timeOutAquecendo = setTimeout(function () {
        aquecendo();
    }, 1000);
}
