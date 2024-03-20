var selected = [];
var height;
var weight;
var age;
function getage() {
    age = document.getElementById("age").value;

    if (age !== "") {
        document.getElementById("perage").classList.add("hidden");
        document.getElementById("perweight").classList.remove("hidden");
    } else {
        document.getElementById("permessage1").textContent = "Please enter your age!";
    }
}
function getweight() {
  weight = document.getElementById("weight").value;

  if (weight !== "") {
      document.getElementById("perweight").classList.add("hidden");
      document.getElementById("perheight").classList.remove("hidden");
  } else {
      document.getElementById("permessage2").textContent = "Please enter your weight!";
  }
}

function getheight(){
  height = document.getElementById("height").value;

  if (height !== "") {
      document.getElementById("perheight").classList.add("hidden");
      document.getElementById("pergoal").classList.remove("hidden");
  } else {
      document.getElementById("permessage3").textContent = "Please enter your height!";
  }
}

function getgoal(){
var fitnessGoals = document.getElementsByName("fitnessGoal");

for (const checkbox of fitnessGoals) {
    if (checkbox.checked) {
        selected.push(checkbox.value);
    }}
if (selected.length>0){
  document.getElementById("pergoal").classList.add("hidden");
  document.getElementById("perfrequency").classList.remove("hidden");
}
else{
  document.getElementById("permessage4").textContent = "Please select atleast one goal!";
}

}

function getfrequency(){
  var fitnessGoals = document.getElementsByName("frequency");
  var selectedVal = [];
  for (const checkbox of fitnessGoals) {
      if (checkbox.checked) {
          selectedVal.push(checkbox.value);
      }}
  if (selectedVal.length>=3){
    const username = sessionStorage.getItem('username');
    fetch("http://127.0.0.1:3000/api/personalize", {
            method: "POST",
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({username, age, weight, height, selected, selectedVal })
        
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to store data"); 
            }
            return response.json(); 
        })
        .then(data => {
            
            console.log("successful:", data);
        })
        .catch(error => {
            console.error(" failed:", error);
        });
        window.location.href = 'index.html#person'
  }
  else{
    document.getElementById("permessage5").textContent = "Please select atleast 3 days!";
  }
  
  }



document.addEventListener("DOMContentLoaded", function () {
    
    const textElement = document.getElementById("text");
    
    
    textElement.textContent = "";
    
    const textToAnimate = "Customize your Workouts with our Intelligent Systems.";
    
    function animateText(index) {
        if (index < textToAnimate.length) {
            textElement.textContent += textToAnimate.charAt(index);
            setTimeout(() => animateText(index + 1), 50); 
        }else {
            setTimeout(function(){textElement.style.borderRight = "none";},2000)
            setTimeout(function(){document.getElementById("perage").classList.remove("hidden");},2500)
        }
    }
    
    animateText(0);
});
