const gameContainer = document.getElementById("game");
const scoreH2 = document.getElementById("score");
const bestH2 = document.getElementById("best");
const reset = document.getElementById("reset");
let best = parseInt(localStorage.getItem("best")) || 1000000000;
let score = 0;
let firstDiv;
let secondDiv;
let firstColor;
let c = 0;
let pairColor = [];
let pairID = [];
let doneList = [];
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "yellow",
  "yellow",
  "black",
  "black",
  "red",
  "blue",
  "green",
  "orange",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute("id",Math.floor(Math.random() * 5000000));
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (COLORS.length>doneList.length){
    score++;
  }
  scoreH2.innerText = `Your score : ${score} !`
  
  let this_div = event.target;
  console.log("you just clicked", this_div.className);
  console.log(this_div.id);
  console.log(doneList)
  if (!doneList.includes(this_div.id)){
    c++;
    console.log(c);
    // you can use event.target to see which element was clicked
    if (c<3){
      this_div.style.backgroundColor = this_div.className;
      pairColor.push(this_div.className);
      pairID.push(this_div.id);
      console.log(pairColor);
      console.log(pairID);
    }

    if(pairColor.length < 3){
      if (c==1){
        firstDiv = this_div;
        // setTimeout(() => {
        //   this_div.style.backgroundColor = "white";     
        // }, 500)
      }

      if (c==2){
        secondDiv = this_div;
        if(pairColor[0]!=pairColor[1]){
          setTimeout(() => {
            firstDiv.style.backgroundColor = "white";
            secondDiv.style.backgroundColor = "white"; 
          }, 500)
        }
        else if ((pairColor[0]==pairColor[1])&&(pairID[0]!=pairID[1])){
          let pair_divs = document.getElementsByClassName(pairColor[0]);
          for(let divs of pair_divs){
            divs.style.backgroundColor = pairColor[0];
          }
          doneList.push(pairID[0]);
          doneList.push(pairID[1]);
        }
        else{
          setTimeout(() => {
            firstDiv.style.backgroundColor = "white";
            secondDiv.style.backgroundColor = "white"; 
          }, 500)
        }
        c = 0;
        pairColor = [];
        pairID = [];
      }
    }
  }
  if (COLORS.length==doneList.length){
    const finalScore = score;
    scoreH2.innerText = `Your FINAL score is : ${finalScore} !  Refresh to reset !`
    reset.innerText = "Click here to reset best score !";
    reset.addEventListener("click", handleRestClick);
    if(finalScore<best){
      localStorage.setItem("best", finalScore);
      bestH2.innerText = `Best score : ${finalScore} !`;
    }
  }
}

function handleRestClick(e){
  localStorage.setItem("best", 1000000000);
  location.reload();
}

// when the DOM loads
createDivsForColors(shuffledColors);
bestH2.innerText = `Best score : ${best} !   `
/* */