document.getElementById("loginform").addEventListener("submit", function(event) {
    event.preventDefault(); 
    console.log('submit pressed');
    const username =   document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById("message");

        messageElement.textContent = "";      
        fetch("http://127.0.0.1:3000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({ username, password })
        
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to login"); 
            }
            return response.json(); 
        })
        .then(data => {
            
            console.log("login successful:", data);
            messageElement.textContent = "login successful";
            sessionStorage.setItem('username',username);
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error("login failed:", error);
            
            messageElement.textContent = "Failed to login. Please try again later.";
        });
    
  });
  