    // Fonction pour effectuer la déconnexion
    window.logout = function() {
        // Effacez le token ou toute autre donnée de session que vous avez stockée
        localStorage.removeItem('token');
    
        // Redirigez l'utilisateur vers la page de connexion ou une autre page appropriée
        window.location.href = '/index.html';
      };