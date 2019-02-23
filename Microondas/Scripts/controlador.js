var tempoPausado = 0;
var timeOut;
var timeOutAquecendo;
var started = false;

function Iniciar() {
    if (started)
        return;

    $.get("/Home/Iniciar", function (start) {
        if (start) {
            // Se o tempo não for zerado
            started = true;
            if (tempoPausado > 0) {
                iniciarCronometro(tempoPausado);
                aquecendo();
            } else {
                $(".txCaracter").html($(".txCaracter").html().charAt(0));
                $(".txStringAquecendo").html("String aquecendo");
                var texto = $(".txtTempo").val();
                var tempo = getTime(texto);

                //verifica se é valido
                if (tempo > 120) {
                    started = false;
                    $("#cuidado").html("<strong>Cuidado!</strong> Tempo máximo 2 minutos").show();
                    return;
                }

                //verifica se é valido
                var potencia = +$(".txtPotencia").val();
                if (potencia > 10 || potencia < 1) {
                    started = false;
                    $("#cuidado").html("<strong>Cuidado!</strong> Ajuste a potência entre 1 e 10").show();
                    return;
                }

                //se não esconde e inicia normalmente
                $("#cuidado").hide();
                iniciarCronometro(tempo);
                aquecendo();
            }
        }
    });
}

function Parar() {
    $.get("/Home/Parar", function (parar) {
        if (parar) {
            tempoPausado = 0;
            started = false;
            $(".txCaracter").html($(".txCaracter").html().charAt(0));
            $(".tempo").html("00:00");
            clearTimeout(timeOut);
            clearTimeout(timeOutAquecendo);
        }
    });
}

function Pausar() {
    $.get("/Home/Iniciar", function (pausar) {
        if (pausar) {
            started = false;
            tempoPausado = getTime($(".tempo").html());
            clearTimeout(timeOut);
            clearTimeout(timeOutAquecendo);
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
        $(".txtTempo").prop('disabled', false);
        $(".txtPotencia").prop('disabled', false);
        $(".txtTempo").val("02:00");
        $(".txtPotencia").val("10");
        $(".personalizado").hide();
    }
    else {
        $(".txtTempo").prop('disabled', true);
        $(".txtPotencia").prop('disabled', true);
        $(".personalizado").show();
        menuPrograma();
    }
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
                $(".txtTempo").val(result.Tempo);
                $(".txtPotencia").val(result.Potencia);
                $(".txInstrucao").html(result.Instrucao);
                $(".txCaracter").html(result.Caracter);
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function AquecimentoRapido() {
    $(".txtTempo").val("00:30");
    $(".txtPotencia").val("8");
    $('.txCaracter').html("?");
    Iniciar();
}

function aquecendo() {
    var caracter = $('.txCaracter').html().charAt(0);
    var potencia = +$(".txtPotencia").val();
    $('.txCaracter').html($('.txCaracter').html() + Array(potencia + 1).join(caracter));
    timeOutAquecendo = setTimeout(function () {
        aquecendo();
    }, 1000);
}

function Salvar(e) {
    e.preventDefault();
    var formData = $(".form-cadastro").serializeArray();
    $("#alertSucesso, #alertDanger").hide();

    if (formData) {
        var data = {};
        formData.forEach(function (obj, index) {
            data[obj.name] = obj.value;
        });
        caracter: ""
        instrucao: ""
        nome: ""

        if (data['caracter'] === "" || data['instrucao'] === "" || data['nome'] === "") {
            $("#alertDanger").html("<strong>Cuidado!</strong> Preencha todos campos").show();
            return;
        }

        var tempo = getTime(data["tempo"]);
        if (tempo > 120) {
            $("#alertDanger").html("<strong>Cuidado!</strong> Tempo máximo 2 minutos").show();
            return;
        }

        var potencia = +data["potencia"];
        if (potencia > 10 || potencia < 1) {
            $("#alertDanger").html("<strong>Cuidado!</strong> Ajuste a potência entre 1 e 10").show();
            return;
        }

        $.ajax({
            type: "POST",
            url: "/Home/NovoPrograma",
            data: data,
            dataType: "json",
            success: function (data) {
                if (data.result) {
                    $("#alertSucesso").show();
                }
            },
            error: function (err) {
                alert(err);
            }
        });
    }
}
