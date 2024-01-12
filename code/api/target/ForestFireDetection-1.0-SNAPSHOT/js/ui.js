document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});



  ////////////////////////////////////////////////////////////////////////////////////////// login user
  window.loginUser = async () => {
    try {
      // Perform OAuth flow instead of direct login
      const token = await performOAuthFlow();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Base64 URL encoding
  function base64URLEncode(buffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  // Generate a random code verifier
  function generateCodeVerifier() {
    const codeVerifierLength = 43; // Length should be between 43 and 128 characters
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let codeVerifier = '';
    for (let i = 0; i < codeVerifierLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      codeVerifier += charset.charAt(randomIndex);
    }
    return codeVerifier;
  }

  // Generate code challenge from code verifier
  async function generateCodeChallenge(codeVerifier) {
    // Convert the code verifier to ArrayBuffer
    const codeVerifierBuffer = new TextEncoder().encode(codeVerifier);

    // Calculate SHA-256 hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', codeVerifierBuffer);
    // Convert the hash to base64 URL-encoded string
    const codeChallenge = base64URLEncode(hashBuffer);
    return codeChallenge;
  }


    // Function to perform the OAuth with PKCE flow
  async function performOAuthFlow() {

    // Step 0: Get user credentials (email, password)
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Step 1: Generate code verifier and code challenge
    const codeVerifier = generateCodeVerifier();
    console.log("codeVerifier:", codeVerifier)
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    console.log("codeChallenge:", codeChallenge)

    // Step 2: Make a request to /authorize
    const authorizeEndpoint = 'https://forestfiredetection.me/api/authorize';
    const myString = `${email}#` + codeChallenge;
    console.log("myString",myString)
    const buffer = new TextEncoder().encode(myString);
    console.log("clientid#codeChallenge",base64URLEncode(buffer))
    const authorizeHeaders = {
      'Pre-Authorization': `Bearer ${base64URLEncode(buffer)}`,
    };

    const authorizeResponse = await fetch(authorizeEndpoint, {
      method: 'POST',
      headers: new Headers(authorizeHeaders),
    });
    const responseText = await authorizeResponse.text();
    // Parse the JSON content
    const authorize = JSON.parse(responseText);

    // Extract the signInId value
    const signInId = authorize.signInId;
    console.log("signInId:", signInId);

    
    // Step 4: Make a request to /authenticate
    const authenticateEndpoint = 'https://forestfiredetection.me/api/authenticate/';
    const authenticateBody = {
      mail: email,
      password: password,
      signInId: authorize.signInId, // Use the signInId from the authorize response
    };

    const authenticateResponse = await fetch(authenticateEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authenticateBody),
    });

    const response_Text = await authenticateResponse.text();
    // Parse the JSON content
    const authenticate = JSON.parse(response_Text);

    // Extract the authCode value
    const authCode = authenticate.authCode;
    console.log("authCode:", authCode);
    const permissionLevel = authenticate.permissionLevel;
    console.log("permissionLevel:", permissionLevel);

    // Step 5: Make a request to /oauth/token
    const tokenEndpoint = 'https://forestfiredetection.me/api/oauth/token';
    const my_String = authCode + '#' + codeVerifier;
    console.log("authCode#codeVerifier:", my_String);
    
    const mybuffer = new TextEncoder().encode(my_String);
    
    const base64Encoded = base64URLEncode(mybuffer);
    console.log("base64Encoded de authCode#codeVerifier :", base64Encoded);
    
    const tokenHeaders = {
      'Post-Authorization': `Bearer ${base64Encoded}`,
    };
    const tokenResponse = await fetch(tokenEndpoint, {
      method: 'GET',
      headers: new Headers(tokenHeaders),
    });

    const text = await tokenResponse.text();

    // Parse the JSON content
    const auth = JSON.parse(text);

    // Extract the authCode value
    const token = auth.accessToken;


    // Step 6: Redirect to contact.html or any other page
    if (token) {
      localStorage.setItem("token", token);
      // Check permission level and redirect
      if (permissionLevel === "1") {
        window.location.href = '/pages/home.html';
      } else if (permissionLevel === "2") {
        window.location.href = '/pages/adminHome.html';
      } else {
        console.error('Unknown permission level');
      }
      } else {
      console.error('Failed to get access token');
      }
    console.log("tooken:", token);
    return token;

  }  

  
});



