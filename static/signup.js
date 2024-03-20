document.getElementById("signupform").addEventListener("submit", function(event) {
  event.preventDefault(); 
  const username =   document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const verifyPassword = document.getElementById("verifypassword").value;
  const emailid = document.getElementById("emailid").value; 
  const messageElement = document.getElementById("message");

  if (emailid.indexOf("@") === -1){
      messageElement.textContent = "Invalid email";
  }
  else if (password.length < 8){
      messageElement.textContent = "Password should be at least 8 characters long!";
  }
  else if (password !== verifyPassword) {
      messageElement.textContent = "Passwords do not match!";
  } 
  else {
      messageElement.textContent = "";      
      fetch("http://127.0.0.1:3000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({ username, password, emailid })
      
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Failed to sign up"); 
          }
          return response.json(); 
      })
      .then(data => {
          
          console.log("Signup successful:", data);

      })
      .catch(error => {
          console.error("Signup failed:", error);
          
          messageElement.textContent = "Failed to sign up. Please try again later.";
      });
  }
});


const togglePassword1 = document.querySelector("#togglePassword1");
const password1 = document.querySelector("#password");

togglePassword1.addEventListener("click", function () {
  const type = password1.getAttribute("type") === "password" ? "text" : "password";
  password1.setAttribute("type", type);
  if (type === "password") {
    togglePassword1.classList.add("fa-eye-slash");
    togglePassword1.classList.remove("fa-eye");
  } else {
    togglePassword1.classList.remove("fa-eye-slash");
    togglePassword1.classList.add("fa-eye");
  }
});
const togglePassword2 = document.querySelector("#togglePassword2");
const password2 = document.querySelector("#verifypassword");

togglePassword2.addEventListener("click", function () {
  const type = password2.getAttribute("type") === "password" ? "text" : "password";
  password2.setAttribute("type", type);
  if (type === "password") {
    togglePassword2.classList.add("fa-eye-slash");
    togglePassword2.classList.remove("fa-eye");
  } else {
    togglePassword2.classList.remove("fa-eye-slash");
    togglePassword2.classList.add("fa-eye");
  }
});
