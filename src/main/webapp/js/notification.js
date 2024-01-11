document.addEventListener('DOMContentLoaded', function () {
    const sensorDataContainer = document.getElementById('sensor-data-container'); // Get the container when needed
    window.onload = async () => {
        try {
        const storedSensorData = JSON.parse(localStorage.getItem('sensorData'));
        displaySensorData(storedSensorData);
        } catch (error) {
        console.error('Error fetching users:', error);
        }
    };
    function displaySensorData(sensorData) {
        console.log("displaySensorData");
        
        if (!sensorDataContainer) {
            console.error("Container element is null. Aborting displaySensorData.");
            return;
        }
       
        // Assurez-vous que sensorData est un tableau avant de l'itérer
        if (Array.isArray(sensorData)) {
            sensorData.forEach(data => {
                const sensorDataElement = document.createElement('div');
                sensorDataElement.innerHTML = `
                    <p>ID du capteur: ${data.id}</p>
                    <img style="max-width: 100%; height: auto;" src="data:image/jpeg;base64,${data.value}" alt="Image du capteur">
                    `;
                sensorDataContainer.appendChild(sensorDataElement);
            });
        }
}}
)