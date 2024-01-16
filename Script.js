// Generar opciones de días y meses dinámicamente
const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');
const timeSelect = document.getElementById('time');

for (let i = 1; i <= 31; i++) {
    const daySuffix = getDaySuffix(i);
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i + daySuffix;
    daySelect.appendChild(option);
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
for (const month of months) {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = month;
    monthSelect.appendChild(option);
}

for (let hour = 6; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = (hour < 10 ? '0' : '') + (hour > 12 ? hour - 12 : hour);
        const formattedMinute = (minute === 0 ? '00' : minute);
        const period = hour >= 12 ? 'PM' : 'AM';
        const time = `${formattedHour}:${formattedMinute}${period}`;
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    }
}


function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

function copyToClipboard() {
    const confirmationMessage = document.getElementById('generatedConfirmation').textContent;
    
    // Crear un elemento de texto temporal y copiar el mensaje
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = confirmationMessage;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    // Informar al usuario que el mensaje ha sido copiado
    //alert('Confirmation message copied to clipboard!');
}

function clearConfirmation() {
    // Limpiar el contenido del mensaje generado
    document.getElementById('generatedConfirmation').textContent = '';
}


function generateConfirmation() {
    const patientName = document.getElementById('patientName').value;
    const day = daySelect.options[daySelect.selectedIndex].text;  // Obtener el texto de la opción seleccionada
    const month = monthSelect.value;
    const time = timeSelect.value;
    const timeZone = document.getElementById('timeZone').value;
    const priceInput = document.getElementById('price');
    const price = '$' + priceInput.value.replace(/^\$/, '');  // Añadir $ si no está presente
    const last4CardNumbers = document.getElementById('last4CardNumbers').value;

    // Construir el mensaje de confirmación sin comillas dobles
    const confirmationMessage = `
Hi, This is Telemind Clinic.

Dear ${patientName},

This message is to remind you that you have an appointment scheduled for the ${day} of ${month} at ${time} ${timeZone}.
We would like to let you know that due to the late reschedule policy, we need you to confirm your attendance at least 48 hours before your appointment, otherwise your appointment will be unconfirmed and your space will still be available, and another patient could use it. You will be charged a $74.99 fee for not complying with the policy. By confirming your appointment, you guarantee your space and avoid inconveniences for your appointment. 

We see that your appointment will have a cost of ${price}.

If you have any questions, please contact us at 725-333-2411.

Have a great day, take care.
`;

    // Mostrar el mensaje generado
    document.getElementById('generatedConfirmation').textContent = confirmationMessage;
}
