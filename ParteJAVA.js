const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function simular() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const velocidad = parseFloat(document.getElementById("velocidad").value);
    const angulo = parseFloat(document.getElementById("angulo").value);

    const g = 9.8;

    const rad = angulo * Math.PI / 180;

    const vx = velocidad * Math.cos(rad);
    const vy = velocidad * Math.sin(rad);

    const tiempoVuelo = (2 * vy) / g;
    const alcance = vx * tiempoVuelo;
    const alturaMax = (vy * vy) / (2 * g);

    document.getElementById("resultados").innerHTML =
        `
        <h3>Resultados</h3>
        <p>Tiempo de vuelo: ${tiempoVuelo.toFixed(2)} s</p>
        <p>Alcance: ${alcance.toFixed(2)} m</p>
        <p>Altura máxima: ${alturaMax.toFixed(2)} m</p>
        `;

    dibujarTrayectoria(vx, vy, g, tiempoVuelo);
}

function dibujarTrayectoria(vx, vy, g, tiempoTotal) {

    ctx.beginPath();
    ctx.moveTo(50, 350);

    for (let t = 0; t <= tiempoTotal; t += 0.1) {

        let x = vx * t;
        let y = vy * t - 0.5 * g * t * t;

        // Escala para visualizar mejor
        let canvasX = 50 + x * 10;
        let canvasY = 350 - y * 10;

        ctx.lineTo(canvasX, canvasY);
    }

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
}
