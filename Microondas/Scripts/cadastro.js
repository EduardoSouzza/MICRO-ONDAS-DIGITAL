$(function () {
    $('form').submit(function (e) {
        e.preventDefault();
        var formData = $("form").serializeArray();
        $("#alertSucesso, #alertDanger").hide();

        var data = {};
        formData.forEach(function (obj, index) {
            data[obj.name] = obj.value;
        });

        if (data) {
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
                url: "/Cadastro/NovoPrograma",
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
    });
});
