let data;

window.onload = () => {
  createNewFlashcard();

  $.ajax({
    async: false,
    url: 'http://api.jsonbin.io/b/5b9b80fe1bf1ca33b06b0fde/latest',
    method: 'GET',
    success: function (out) {
      data = out;
    }
  });

}

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

let clickedOnCurrentCard = 0;

let createNewFlashcard = () => {
  console.log("hi");
  let flashcardContainer = document.querySelector('.flashcard-container');
  let flashcard = document.createElement('div');
  flashcardContainer.appendChild(flashcard);
  flashcard.innerHTML = `<div class="flipper" onclick="rotate();">
                    <div class="front">
                      <div class="flashcontent-container">
                        <p class="flashcontent">jhbdsew</p>
                      </div>
                    </div>
                    <div class="back">
                      <div class="flashcontent-container">
                        <p class="flashcontent">an snvovfrne</p>
                      </div>
                    </div>`;
  flashcard.setAttribute("id", "flashcard");
  flashcard.setAttribute("class", "slide-in");
  flashcard.addEventListener('animationend', () => {
    flashcard.classList.remove('slide-in');
    flashcard.classList.add('flip');
  })
}

let rotate = () => {
  document.querySelector('.flipper').classList.toggle('rotate');
}
