// Definimos todos los inputs
timeInputs = document.querySelectorAll("input[id^='timeInput']");
// Definimos todas las manecillas de horas
hourHands = document.querySelectorAll("line[class^='hours']");
// Definimos todas las manecillas de minutos
minuteHands = document.querySelectorAll("line[class^='minutes']");
// Creamos la rotación de las líneas de hora de los relojes
for (let i = 0; i < timeInputs.length; i++) {
    calculateLines(i+1);
}
// Actualiza la hora y los grados de las manecillas del reloj
function updateTime(num) {
    let value = timeInputs[num].value;
    // Borrar caracteres que no sean números
    value = value.replace(/\D/g, '');
    // Limitar a 4 caracteres
    if (value.length > 4) {
        value = value.substr(0, 4);
    }
    // Agregar ":" después de los primeros 2 caracteres
    if (value.length > 2) {
        value = value.substr(0, 2) + ':' + value.substr(2);
    }
    // Actualizar el valor del campo de entrada
    timeInputs[num].value = value;
    if (value.length == 5) {
        timeComponents = value.split(":");
        const hours = parseInt(timeComponents[0]);
        const minutes = parseInt(timeComponents[1]);
        if (hours > 24 || minutes > 59) {
            document.getElementById("wrong").style.display = "block";
            showwrong("Aquesta hora no és correcta");
            setTimeout(function () {
                wrong.style.display = "none";
            }, 1500);
        } else {
            calculateHourDegrees(hours, minutes, num); // Calcula los grados de la manecilla de las horas
            calculateMinuteDegrees(minutes, num); // Calcula los grados de la manecilla de los minutos
        }
    }
}
// Mapea linealmente un valor de un rango a otro rango
function linearMap(value, min, max, newMin, newMax) {
    return newMin + (newMax - newMin) * (value - min) / (max - min);
}
// Calcula los grados de rotación de las líneas del reloj principal
function calculateLines(num) {
    const lines = document.querySelectorAll(".line" + num);
    const numberLines = lines.length;
    for (let i = 0; i < numberLines; i++) {
        const line = lines[i];
        const angle = linearMap(i, 0, numberLines, 0, 360);
        line.style.transform = `rotate(${angle}deg)`;
    }
}
// Calcula los grados de rotación de la manecilla de las horas del reloj principal
function calculateHourDegrees(hours, minutes, num) {
    const hourHand = document.querySelector(".hours");
    const hourDegrees = linearMap(hours % 12, 0, 12, 0, 360) + linearMap(minutes, 0, 60, 0, 30);
    hourHands[num].style.transform = `rotate(${hourDegrees}deg)`;
}
// Calcula los grados de rotación de la manecilla de los minutos del reloj principal
function calculateMinuteDegrees(minutes, num) {
    const minuteHand = document.querySelector(".minutes");
    const minuteDegrees = linearMap(minutes, 0, 60, 0, 360);
    minuteHands[num].style.transform = `rotate(${minuteDegrees}deg)`;
}
// Muestra un mensaje de error
function showwrong(message) {
    var messageDiv = document.getElementById("wrong");
    messageDiv.innerText = message;
}