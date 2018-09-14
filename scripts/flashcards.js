let data;
let dataIndex;

if(document.querySelector(".type").id === "tableofelements"){
  dataIndex = 0;
}
else if(document.querySelector(".type").id === "LearnDutch"){
  dataIndex = 1;
}
else if(document.querySelector(".type").id === "werwerwer"){
  dataIndex = 2;
}
console.log(dataIndex);

// $(document).ready(function() {
  $.ajax({
   async: false,
   url: 'http://api.jsonbin.io/b/5b9b80fe1bf1ca33b06b0fde/latest',
   method: 'GET',
   success: function (out) {
     data = out;
   }
  });

  // console.log(data);
// })

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


console.log(data, 'outside')

let newCard = () => {
  deleteFlashcard();
}


let deleteFlashcard = () => {
  document.querySelector('#flashcard').classList.add("slide-out")
  document.querySelector('#flashcard').addEventListener("animationend", () => {
      document.querySelector('#flashcard').parentElement.removeChild(document.querySelector('#flashcard'));
      createNewFlashcard();
  });
}

let questionIndex = 0;

let createNewFlashcard = () => {
  console.log("hi");
  let flashcardContainer = document.querySelector('.flashcard-container');
  let flashcard = document.createElement('div');
  flashcardContainer.appendChild(flashcard);
  flashcard.innerHTML = `<div class="flipper" onclick="rotate();">
                    <div class="front">
                      <div class="flashcontent-container">
                        <p class="flashcontent">${data.categories[dataIndex].questions[questionIndex].question}</p>
                      </div>
                    </div>
                    <div class="back">
                      <div class="flashcontent-container">
                        <p class="flashcontent">${data.categories[dataIndex].questions[questionIndex].answer}</p>
                      </div>
                    </div>`;
  flashcard.setAttribute("id", "flashcard");
  flashcard.setAttribute("class", "slide-in");
  flashcard.addEventListener('animationend', () => {
    flashcard.classList.remove('slide-in');
    flashcard.classList.add('flip');
  })
  questionIndex++;
}

let rotate = () => {
  document.querySelector('.flipper').classList.toggle('rotate');
}

createNewFlashcard();
