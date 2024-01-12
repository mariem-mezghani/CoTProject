// Initialize the map
var map = L.map('map').setView([0, 0], 15);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


var currentPositionIcon = L.icon({
    iconUrl: '/img/position.png',
    iconSize: [40, 40], // Ajustez la taille de l'icône selon vos besoins
    iconAnchor: [16, 32], // Ajustez l'ancre de l'icône pour la positionner correctement
    popupAnchor: [0, -32] // Ajustez l'ancre du popup si nécessaire
});


// Function to get the current position and display address in a popup
function getCurrentPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            // Set the map view to the current position
            map.setView([lat, lon], 10);
            console.log("lat",lat,"lon",lon);

            // Add a marker with a popup displaying the address
            L.marker([lat, lon], { icon: currentPositionIcon }).addTo(map)
                .bindPopup('Your Current Location').openPopup();

          
        }, function (error) {
            alert('Error getting your location: ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Call getCurrentPosition on page load
document.addEventListener('DOMContentLoaded', getCurrentPosition);

// Function to draw directions from the current position to a specific destination
function getDirectionsToDestination(startLat, startLon, destinationLat, destinationLon) {
    // Create a routing control
    var control = L.Routing.control({
        routeWhileDragging: true
    }).addTo(map);

    // Set the waypoints without displaying them as markers
    control.setWaypoints([
        L.latLng(startLat, startLon),
        L.latLng(destinationLat, destinationLon)
    ]);

    // Event handler for removing routing control when the route is cleared
    map.on('routing:clear', function () {
        map.removeControl(control);
    });
}

// Add click events to the buttons
document.getElementById("button_zoom").onclick = function () {
    map.setView([0, 0], 2); // Adjust coordinates and zoom level as needed
};

document.getElementById("button_pos").onclick = function () {
    getCurrentPosition();
};




// Fetch data from your API
var Authorizationheader = "Bearer " + localStorage.getItem("token");


// Créez une icône personnalisée
var cameraIcon = L.icon({
    iconUrl: '/img/camera.png',
    iconSize: [40, 40], // Ajustez la taille de l'icône selon vos besoins
    iconAnchor: [16, 32], // Ajustez l'ancre de l'icône pour la positionner correctement
    popupAnchor: [0, -32] // Ajustez l'ancre du popup si nécessaire
});

$.ajax({
    url: 'https://forestfiredetection.me/api/camera',
    type: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': Authorizationheader
    },
    success: function (data) {
        var coordinatesArray = [];
        for (let i = 0; i < data.length; i++) {
            var coordinates = [data[i].latitude, data[i].longitude];
            coordinatesArray.push({"id":data[i].id,"latitude":data[i].latitude,"longitude":data[i].longitude});
            console.log("longitude", data[i].longitude, "latitude", data[i].latitude);

            // Utilisez l'icône personnalisée pour le marqueur
            L.marker(coordinates, { icon: cameraIcon }).addTo(map)
                //.bindPopup(`Camera ${i + 1}`).openPopup();
        }
        localStorage.setItem('cameraCoordinates', JSON.stringify(coordinatesArray));
        // Appelez la fonction pour dessiner les itinéraires entre les caméras
       // getDirectionsToDestination(data[0].latitude, data[0].longitude,data[1].latitude, data[1].longitude);
    }
});

// Nouveau bouton pour obtenir des directions
// Nouveau bouton pour obtenir des directions
document.getElementById("button_directions").onclick = function () {
    const storedSensorData = JSON.parse(localStorage.getItem('sensorData')) || [];
    //const newSensorData = {"id":"camera1","value":"sdfgh"};
    
    // Ajouter le nouveau JSON à la liste
    //storedSensorData.push(newSensorData);
    console.log("storedSensorData", storedSensorData);
    
    const coordinatesArray = JSON.parse(localStorage.getItem('cameraCoordinates'));
    console.log("coordinatesArray", coordinatesArray);
    const waterArray = JSON.parse(localStorage.getItem('waterCoordinates'));
    if (storedSensorData.length > 0 && coordinatesArray.length > 0) {
        storedSensorData.forEach(sensorData => {
            console.log("sensorData",sensorData);
            coordinatesArray.forEach(coordinates => {
                console.log("coordinates",coordinates);
                // Vérifiez si les IDs sont égaux
                if (sensorData.id === coordinates.id) { // Modifier ici si nécessaire
                    console.log(`ID ${sensorData.id} trouvé dans les deux listes.`);
                    startLat = coordinates.latitude; // Modifier ici si nécessaire
                    startLon = coordinates.longitude; // Modifier ici si nécessaire
                    
                    let closestCoordinates = findClosestCoordinates(coordinates, waterArray);
                    console.log("closestCoordinates", closestCoordinates);
                    if (closestCoordinates) {
                        console.log("closestCoordinates");
                        destinationLat = closestCoordinates.latitude; // Mettez à jour avec les coordonnées les plus proches
                        destinationLon = closestCoordinates.longitude; // Mettez à jour avec les coordonnées les plus proches
        
                        // Appellez la fonction pour obtenir des directions
                        getDirectionsToDestination(startLat, startLon, destinationLat, destinationLon);
        
                        
                    }
                
                    
                }
            });
        });
    } else {
        console.log('id pas trouvé');
    }
};

// Fonction pour trouver les coordonnées les plus proches
function findClosestCoordinates(coordinates, waterArray) {
    let closestCoordinates = null;
    let minDistance = Number.MAX_VALUE;

    waterArray.forEach(eauu => {
        // Calcul de la distance entre les coordonnées actuelles et celles de sensorData
        let distance = calculateDistance(coordinates, eauu );
        console.log("coordinates",coordinates,"eauu ",eauu );
        // Mise à jour des coordonnées les plus proches si la distance est plus petite
        if (distance < minDistance) {
            minDistance = distance;
            closestCoordinates = eauu;
        }
    });

    return closestCoordinates;
}

// Fonction pour calculer la distance entre deux points (utilisez la formule appropriée)
function calculateDistance(point1, point2) {
    // À compléter avec la formule de distance appropriée
    // Par exemple, vous pouvez utiliser la formule de distance euclidienne
    return Math.sqrt(Math.pow(point1.latitude - point2.latitude, 2) + Math.pow(point1.longitude - point2.longitude, 2));
}


// Créez une icône personnalisée
var eauIcon = L.icon({
    iconUrl: '/img/eau.png',
    iconSize: [40, 40], // Ajustez la taille de l'icône selon vos besoins
    iconAnchor: [16, 32], // Ajustez l'ancre de l'icône pour la positionner correctement
    popupAnchor: [0, -32] // Ajustez l'ancre du popup si nécessaire
});


var waterArray = [];
//definir les sources d'eau statiques
destLat=36.8111;
destLon=10.1258;
waterArray.push({"id":"0","latitude":destLat,"longitude":destLon});
// Add a marker for the destination position
var destinationMarker = L.marker([destLat, destLon], { icon: eauIcon }).addTo(map);

//definir les sources d'eau statiques
destLat=36.8663;
destLon=10.1954;
waterArray.push({"id":"1","latitude":destLat,"longitude":destLon});
// Add a marker for the destination position
var destinationMarker = L.marker([destLat, destLon], { icon: eauIcon }).addTo(map);

//definir les sources d'eau statiques
destLat=36.87;
destLon=10.32;
waterArray.push({"id":"2","latitude":destLat,"longitude":destLon});
// Add a marker for the destination position
var destinationMarker = L.marker([destLat, destLon], { icon: eauIcon }).addTo(map);

localStorage.setItem('waterCoordinates', JSON.stringify(waterArray));





var accesstoken = localStorage.getItem("token")
var Authorizationheader = "Bearer " + accesstoken
console.log(accesstoken)