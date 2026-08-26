const botaoBuscar = document.getElementById("buscar");

botaoBuscar.addEventListener("click", buscarClima);

function buscarClima() {

    const cidade = document.getElementById("cidade").value.trim();

    if (cidade === "") {
        alert("Digite o nome de uma cidade.");
        return;
    }

    const chaveApi = "57b9ce320b83b2c27b014b7d47c86b5a";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chaveApi}&units=metric&lang=pt_br`;

    fetch(url)

        .then(function(resposta) {

            if (!resposta.ok) {
                throw new Error("Cidade não encontrada.");
            }

            return resposta.json();
        })

        .then(function(dados) {

            console.log(dados);

            document.getElementById("nomeCidade").textContent =
                dados.name;

            document.getElementById("temperatura").textContent =
                dados.main.temp.toFixed(1);

            document.getElementById("descricao").textContent =
                dados.weather[0].description;

            document.getElementById("sensacao").textContent =
                dados.main.feels_like.toFixed(1);

            document.getElementById("umidade").textContent =
                dados.main.humidity;

            const ventoKmH = dados.wind.speed * 3.6;

            document.getElementById("vento").textContent =
                ventoKmH.toFixed(1);
        })

        .catch(function(erro) {

            console.log("Erro:", erro);

            alert("Não foi possível encontrar a cidade.");
        });
}

async function carregarClima() {
    // Exemplo: coordenadas de São Paulo
    const url = 'https://open-meteo.com';
    
    const resposta = await fetch(url);
    const dados = await resposta.json();
    
    // Pega as primeiras 24 horas de dados
    const horas = dados.hourly.time.slice(0, 24).map(t => t.slice(11, 16)); // Formato HH:MM
    const temperaturas = dados.hourly.temperature_2m.slice(0, 24);
    const umidade = dados.hourly.relative_humidity_2m.slice(0, 24);
    const chuva = dados.hourly.precipitation.slice(0, 24);
    const vento = dados.hourly.wind_speed_10m.slice(0, 24);

    const ctx = document.getElementById('climaGrafico').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: horas,
            datasets: [
                {
                    label: 'Temperatura (°C)',
                    data: temperaturas,
                    borderColor: 'rgb(255, 99, 132)',
                    yAxisID: 'y'
                },
                {
                    label: 'Umidade (%)',
                    data: umidade,
                    borderColor: 'rgb(54, 162, 235)',
                    yAxisID: 'y1'
                },
                {
                    label: 'Vento (km/h)',
                    data: vento,
                    borderColor: 'rgb(75, 192, 192)',
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { type: 'linear', position: 'left' },
                y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false } }
            }
        }
    });
}

carregarClima();




