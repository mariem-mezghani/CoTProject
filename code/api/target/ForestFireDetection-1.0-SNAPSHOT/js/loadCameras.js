/////////////////////////////////////////////////////////////////////////////////////////////// Fetch cameras
document.addEventListener('DOMContentLoaded', function() {
    window.onload = async () => {
        try {
        const token = localStorage.getItem("token");
        const cameras = await getCameras(token);
        updateCamerasUI(cameras);
        } catch (error) {
        console.error('Error fetching cameras:', error);
        }
    };
    
    // Function to get cameras from the backend
    async function getCameras(token) {
        const Heeeaders = {
            'Authorization': 'Bearer ' + token,
        };
        const response = await fetch('https://forestfiredetection.me/api/camera', {
            method: 'GET',
            headers: new Headers(Heeeaders),
        });

        console.log(" 'Bearer ' + token:", 'Bearer ' + token)
        if (!response.ok) {
        throw new Error('Failed to fetch cameras');
        }
        // Check if the response status is 204 (No Content)
        if (response.status === 204) {
            return []; // or any default value that makes sense for your application
        }
        console.log("response",response);
        const cameras = await response.json();
        console.log("cameras", cameras);
        return cameras;
       
    }
    
    // Function to update the UI with camera data
    function updateCamerasUI(cameras) {
        const camerasContainer = document.querySelector('.cameras');
        camerasContainer.innerHTML = ''; // Clear existing content
    
        cameras.forEach(camera => {
        const cameraCard = document.createElement('div');
        cameraCard.className = 'card-panel camera white row';
    
        const cameraImage = document.createElement('img');
        cameraImage.src = '/img/camera.jpg';
        cameraImage.alt = 'camera thumb';
    
        const cameraDetails = document.createElement('div');
        cameraDetails.className = 'camera-details';
    
        const cameraTitle = document.createElement('div');
        cameraTitle.className = 'camera-title';
        cameraTitle.textContent = camera.id;
    
        const cameraIngredients = document.createElement('div');
        cameraIngredients.className = 'camera-ingredients';
        cameraIngredients.textContent = `Longitude: ${camera.longitude}, Latitude: ${camera.latitude}`;
    
        const cameraDelete = document.createElement('div');
        cameraDelete.className = 'camera-delete';
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'material-icons';
        deleteIcon.textContent = 'delete_outline';

        cameraDelete.appendChild(deleteIcon);
        cameraDetails.appendChild(cameraTitle);
        cameraDetails.appendChild(cameraIngredients);
        cameraCard.appendChild(cameraImage);
        cameraCard.appendChild(cameraDetails);
        cameraCard.appendChild(cameraDelete);
        camerasContainer.appendChild(cameraCard);
        });
    }
  
  
})
  
  
  
  
  