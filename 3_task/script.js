const wsUri = "wss://echo-ws-service.herokuapp.com";

const output = document.getElementById("output");
const sendMess = document.querySelector('.send');
const geo = document.querySelector('.geo');



let websocket;

function writeToScreen(message) {
    let pre = document.createElement("p");
    let val = document.getElementById('elem1').value;
    pre.innerHTML = val;
    output.appendChild(pre);
}

sendMess.addEventListener('click', () => {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
        writeToScreen("CONNECTED");
    };
    websocket.onclose = function(evt) {
        writeToScreen("DISCONNECTED");
    };
    websocket.onmessage = function(evt) {
        writeToScreen(
            '<span style="color: blue;">RESPONSE: ' + evt.data + '</span>'
        );
    };
    websocket.onerror = function(evt) {
        writeToScreen(
            '<span style="color: red;">ERROR:</span> ' + evt.data
        );
    };
});


sendMess.addEventListener('click', () => {
    const message = 'Test message';
    writeToScreen(message);
    websocket.send(message);
});

//const status = document.querySelector('#status');
//const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.j-btn-test');
let e = document.createElement('a');
var node = document.createElement("a");
// Функция, выводящая текст об ошибке
const error = () => {
    output.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    console.log('position', position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let e = document.createElement('a');
    e.href = 'https://www.openstreetmap.org/#map=18/${latitude}/${longitude}';
    output.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    e.textContent = 'Геолокация';
    // e.appendChild(document.createTextNode('ссылка'));
    output.appendChild(e);
    //mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    //mapLink.textContent = 'Ссылка на карту';


}
btn.addEventListener('click', () => {
    e.href = '';
    e.textContent = '';
    if (!navigator.geolocation) {
        output.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        output.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});