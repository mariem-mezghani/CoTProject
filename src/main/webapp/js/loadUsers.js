/////////////////////////////////////////////////////////////////////////////////////////////// Fetch users
document.addEventListener('DOMContentLoaded', function() {
    window.onload = async () => {
        try {
        const token = localStorage.getItem("token");
        const users = await getUsers(token);
        updateUsersUI(users);
        } catch (error) {
        console.error('Error fetching users:', error);
        }
    };
    
    // Function to get users from the backend
    async function getUsers(token) {
        const Heeeaders = {
            'Authorization': 'Bearer ' + token,
        };
        const response = await fetch('https://forestfiredetection.me/api/user', {
            method: 'GET',
            headers: new Headers(Heeeaders),
        });

        console.log(" 'Bearer ' + token:", 'Bearer ' + token)
        if (!response.ok) {
        throw new Error('Failed to fetch users');
        }
        // Check if the response status is 204 (No Content)
        if (response.status === 204) {
            return []; // or any default value that makes sense for your application
        }
        console.log("response",response);
        const users = await response.json();
        console.log("users", users);
        return users;
       
    }
    
    // Function to update the UI with user data
    function updateUsersUI(users) {
        const usersContainer = document.querySelector('.users');
        usersContainer.innerHTML = ''; // Clear existing content
    
        users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'card-panel user white row';
        
        const userImage = document.createElement('img');
        userImage.src = '/img/user1.png';
        userImage.alt = 'user thumb';
        userImage.className = 'user-image'; // Ajoutez cette classe
        
        const userDetails = document.createElement('div');
        userDetails.className = 'user-details';
        
        const userTitle = document.createElement('div');
        userTitle.className = 'user-title';
        userTitle.textContent = `Email: ${user.mail}`;
        
        const userIngredients = document.createElement('div');
        userIngredients.className = 'user-ingredients';
        userIngredients.textContent = `Fullname: ${user.fullname}`;
        
        const userDelete = document.createElement('div');
        userDelete.className = 'user-delete';
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'material-icons';
        deleteIcon.textContent = 'delete_outline';
        
        userDelete.appendChild(deleteIcon);
        userDetails.appendChild(userTitle);
        userDetails.appendChild(userIngredients);
        userCard.appendChild(userImage);
        userCard.appendChild(userDetails);
        userCard.appendChild(userDelete);
        usersContainer.appendChild(userCard);
            
        });
    }
  
  
})
  
  
  
  
  