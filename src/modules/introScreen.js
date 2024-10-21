function typewriter(element, text, callback) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 100);
    } else if (callback) {
      callback();
    }
  }
  typing();
}

function createIntroScreen() {
  let scanlines = document.querySelector(".scanlines");
  let introScreen = document.createElement("div");
  introScreen.classList.add("introScreen");
  scanlines.prepend(introScreen);

  let introText = document.createElement("div");
  introText.classList.add("introText");
  introScreen.appendChild(introText);

  let gameBtnText = document.createElement("div");
  gameBtnText.classList.add("gameBtnText");
  introScreen.appendChild(gameBtnText);

  typewriter(introText, "What game would you like to play?", () => {
    typewriter(gameBtnText, "Battleship", () => {
      let gameBtn = document.querySelector(".gameBtnText");
      gameBtn.classList.add("gameBtn");
      let caret = document.createElement("span");
      caret.classList.add("caret");
      gameBtn.appendChild(caret);
      gameBtn.addEventListener("click", () => {
        document.getElementsByClassName("introScreen")[0].style.display =
          "none";
      });
    });
  });
}

export { createIntroScreen };
