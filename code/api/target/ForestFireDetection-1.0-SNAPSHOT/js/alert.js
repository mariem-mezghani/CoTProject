document.addEventListener('DOMContentLoaded', function () {

    const notificationIcon = document.getElementById('notification-icon');
    const notificationBadge = document.getElementById('notification-badge'); 

    // Vérifiez si le tableau existe dans localStorage
    const storedSensorData = JSON.parse(localStorage.getItem('sensorData')) || [];

    // Connect to WebSocket
    const socket = new WebSocket('ws://localhost:8080/pushes');
    console.log("websocket", socket);

    // Listen for WebSocket messages
    socket.addEventListener('message', function (event) {
        const sensorData = JSON.parse(event.data);
        console.log("sensorData", sensorData);

        // Ajoutez la nouvelle donnée au tableau existant
        storedSensorData.push(sensorData);

        // Mettez à jour le localStorage avec le nouveau tableau
        localStorage.setItem('sensorData', JSON.stringify(storedSensorData));

        updateNotificationBadge(); // Met à jour le badge de notification à chaque nouvelle donnée
    });

    // Function to update the notification badge
    function updateNotificationBadge() {
        const currentBadgeValue = parseInt(notificationBadge.innerText);
        notificationBadge.innerText = currentBadgeValue + 1;
    }


    notificationIcon.addEventListener('click', function (event) {
        window.location.href = '/pages/alert.html';

    });


    });