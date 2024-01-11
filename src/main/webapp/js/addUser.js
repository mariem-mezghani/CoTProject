document.addEventListener('DOMContentLoaded', function() {
    // nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
    // add recipe form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});
  
  
    //////////////////////////////////////////////////////////////////////////////////////// register user
    window.addUser = async () => {
      const fullname = document.getElementById('fullname').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      const userData = {
        fullname: fullname,
        mail: email,
        password: password,
        permissionLevel: 1, // Set the desired permission level
      };
  
      try {
        const response = await fetch('https://forestfiredetection.me/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response.ok) {
          console.log('User registered successfully');

          // Redirect to about.html
          window.location.href = '/pages/adminHome.html';
        } else {
          console.error('Failed to register user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  });