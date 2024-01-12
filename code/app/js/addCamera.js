document.addEventListener('DOMContentLoaded', function() {
    // nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
    // add recipe form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});
    


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
    console.log("cameras",cameras);
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



  ///////////////////////////////////////////////////////////////////////////////////////////// Add camera
  window.addCamera = async () => {
    try {
      token = localStorage.getItem("token");
      camera(token);
    } catch (error) {
      console.error('Error:', error);
    }
  };


    // Function to add a new camera
  function camera(token) {
    // Retrieve values from input fields
    const reference = document.getElementById('reference').value;
    const longitude = parseFloat(document.getElementById('longitude').value);
    const latitude = parseFloat(document.getElementById('latitude').value);

    // Validate input values
    if (!reference || isNaN(longitude) || isNaN(latitude)) {
      alert('Please fill in all the fields with valid values.');
      return;
    }

    // Prepare data for the POST request
    const data = {
      "id": reference, // Assuming you want to use the reference as the id
      "longitude": longitude,
      "latitude": latitude,
    };
    console.log("data",data);
    // Assuming you have the 'tooken' variable available
    const authorizationHeader = 'Bearer '+token;
    console.log("authorizationHeader",authorizationHeader);
    // Make an HTTP POST request to your Java backend
    fetch('https://forestfiredetection.me/api/camera', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationHeader, // Add Authorization header
      },
      body: JSON.stringify(data),
    })
      .then(async () => {
        // Handle successful response
        console.log('Camera added successfully!');
        const token = localStorage.getItem("token");
        try {
          const cameras = await getCameras(token); 
          console.log("cameras",cameras);
          updateCamerasUI(cameras);
          hideSideForm();

        } catch (error) {
          console.error('Error updating cameras:', error);
        }
      })
    
      .catch(error => {
        // Handle error
        console.error('Error adding camera:', error.message);
        // Optionally, you can display an error message to the user or perform other error-handling actions
      });
  }
 


  function hideSideForm() {
    console.log('Hiding side form');
    const sideForm = document.getElementById('side-form');
    if (sideForm) {
      sideForm.style.display = 'none';
    }
  }
  
});



