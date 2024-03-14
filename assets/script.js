$(document).ready(function () {
    const key = "10160150253498321";

    $('form').submit(function (event) {
        event.preventDefault();

        let heroId = $('#buscar').val();

        if (!isNaN(parseFloat(heroId)) && isFinite(heroId)) {
            $.ajax({
                url: 'https://superheroapi.com/api.php/' + key + '/' + heroId,
                method: 'GET',
                success: function (response) {
                    renderizarInformacion(response);
                },

                error: function () {
                    mostrarError('No se encontró ningún superhéroe con el ID proporcionado.');
                }
            });
        } else {
            mostrarError('Por favor ingresa un número válido para buscar un superhéroe.');
        }
    });
});

function renderizarInformacion(superhero) {
    $('#cards-container').empty();

    const $card =
        $('<div class="card">').append(
            $('<img class="card-img-top" src="' + superhero.image.url + '" alt="' + superhero.name + '">'), // Agregar imagen
            $('<div class="card-body">').append(
                $('<h5 class="card-title">').text(superhero.name),
                $('<p class="card-text">').text('Inteligencia: ' + superhero.powerstats.intelligence)
            )
        );

    $('#cards-container').append($card);
    renderizarGrafico(superhero.powerstats);
}

function renderizarGrafico(powerstats) {
    let dataPoints = [];

    for (let stat in powerstats) {
        dataPoints.push({
            y: parseInt(powerstats[stat]),
            label: stat
        });
    }

    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Estadísticas de poder"
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: dataPoints
        }]
    });

    chart.render();
}

function mostrarError(mensaje) {
    alert(mensaje);
}
