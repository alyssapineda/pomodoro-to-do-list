let timer_countdown = document.querySelector("#timer-el");

//create addItem function
function addItem() {
  //declares constant accepting elements with an id form as argument
  const value = document.querySelector('#form').value;
  //declares constant accepting elements with an id items as argument
  const ul = document.querySelector("#items");
  //create button element
  const btn = document.createElement('button');
  //create an attribute to button element                        
	btn.setAttribute('data-delete','');

  //if value given is empty show an alert to inform user
  if (value === '') {                             
    alert("Oops, you forgot to write your task!");
    return
  } 
  // calls checkSpace function to show an alert if user enters spaces as entry
  else if (checkSpace(value)) {
    alert("Oops, you entered a blank task!");
    return
  }
  // creates an li element
  const li = document.createElement("li");              
  // adds li elements into html
  li.innerHTML = value; 
  // appends button element with li element in HTML document                                  
  li.appendChild(btn);
  // appends li element in ul element in HTML document  
  ul.appendChild(li);                                  
  // when user clicks on li element, put a strike through the text
  li.onclick = (entry) => {
    li.classList.toggle("strike");
  }
  // allows user to remove list item when button is clicked
  btn.onclick = (event) => {
    const li = event.target.parentNode;
    li.remove()
  }
  // erases user's previous entry, if input successfully entered console shows success
  document.querySelector("#form").value = "";
  console.log("Success");            
}

//Logic for the error functions
//Checks if item only contains spaces
function checkSpace(str) {
  // call the trim() method on the string. If the string has a length of 0 then the string contains only spaces
  return str.trim().length === 0; 
}

//POMODORO TIMER
let startingTime = 25;
let time = startingTime * 60; //in seconds
let timerPaused = true;

let startingbreakTime = 15;
let breakTime = startingbreakTime * 60; // in seconds
let breaktimerPaused = true;

//TIMER DISPLAY FUNCTION
function displayTime(time) {
    const minute = Math.floor(time/60)
    const seconds = Math.floor(time % 60);
    timer_countdown.textContent = `${minute<10 ? '0': ''}${minute}:${seconds<10 ? '0': ''}${seconds}`
}

function displaybreakTime(time) {
    const minute = Math.floor(time/60)
    const seconds = Math.floor(time % 60);
    timer_countdown.textContent = `${minute<10 ? '0': ''}${minute}:${seconds<10 ? '0': ''}${seconds}`
}


const countDown = setInterval(() => {
    if (!timerPaused) {
        time--;
        displayTime(time)

        if(time <= 0 || time <1) {
            clearInterval(countDown);
        }
    }
},1000)


//START TIMER FUNCTION
function timerStart() {
    timerPaused = false;
    breaktimerPaused = true;
}
//PAUSE TIMER FUNCTION
function timerPause() {
    timerPaused = true;
    breaktimerPaused = true;
}

// RESET TIMER FUNCTION
function timerReset() {
    timer_countdown.textContent = '25:00';
    time = startingTime * 60;
    timerPaused = true;
    breaktimerPaused = true;
}

//BREAK TIMER FUNCTION
function timerBreak() {
  timer_countdown.textContent = '15:00';
  breaktimerPaused = false;
  const breakcountDown = setInterval(() => {
    if (!breaktimerPaused) {
      breakTime--;
      displaybreakTime(breakTime)

      if(breakTime <= 0 || time < 1) {
        clearInterval(breakcountDown)
      }
    }
},1000)
}


