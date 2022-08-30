const gameContainer = document.getElementById("game");
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
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
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
    newDiv.setAttribute("id",Math.floor(Math.random() * 5000));
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
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
        setTimeout(() => {
          this_div.style.backgroundColor = "white";     
        }, 1000)
      }

      if (c==2){
        if(pairColor[0]!=pairColor[1]){
          setTimeout(() => {
            this_div.style.backgroundColor = "white";
            secondDiv = this_div;
          }, 1000)
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
            this_div.style.backgroundColor = "white";
            secondDiv = this_div;
          }, 1000)
        }
        setTimeout(() => {
          c = 0;
          pairColor = [];
          pairID = [];
        }, 1000)
      }
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */