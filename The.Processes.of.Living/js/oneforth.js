class OneForth {
  constructor() {
    //custombool attributt tracks the scene
    //main stage box(too big)
    this.stage = document.getElementById("future-stage");
    //intsructions for users NOTE; i need 2 call the prompt text i actually want each time
    //this is only styled
    this.promptEl = document.getElementById("prompt-text");
    //deck image clicky in the center as imahe
    this.deckEl = document.getElementById("deck-image");
    //.flip-card cintainer stored in a three array idk its
    // like 4 am so we can loop them over all elements .mouseclike
    //three cards stored in an array so it can loop
    this.cardEls = [
      document.getElementById("card-0"),
      document.getElementById("card-1"),
      document.getElementById("card-2"),
    ];
    //
    //element output for text areas
    this.cardsLine = document.getElementById("cards-line"); //small summaru line
    this.storyLine = document.getElementById("story-line"); //story text
    this.interLine = document.getElementById("interpretation-line"); //main text that binds
    //helper deck and reading clas objects
    //  this.deck = new Deck();
    //  this.reading = new CardReading();

    //custom bool toggle to see which cards have been clicked to reveal fate,
    // this array is to remember whether each of the 3 cards has been clicked during the reading phase
    this.fateClicked = [false, false, false];
    //this is JUST A LOGIC THING
    this.scene = "start"; //tells what stage its in before the other things r read
    //IMPORTANT FOR WHEN  video paths r ready: note to replace

    //helper deck and reading clas objects
    this.deck = new Deck();
    this.reading = new CardReading();

    //call the event listen; make the deck clickable and make each card clickable
    this.setupEvents();
  }
  //event listeners
  setupEvents() {
    //deck click, when its clicked, only let the deck work in the start
    //If the deck is clicked later, nothing should happen
    this.deckEl.addEventListener("click", () => {
      if (this.scene === "start") {
        //this.showCards();
        this.startReading(); //im adding this
      }
    });
    //clicker loop, card elements n different behavior depending on state
  }
  // showCards() {
  //   console.log("deck clicked");
  // }
  enter() {
    //enter the prompt and card display before reset
    this.reset();

    this.deckEl.style.display = "block";
    this.deckEl.style.left = "260px";
    this.deckEl.style.top = "220px";
  }
  reset() {
    //return the empty/reset every element to its blank starting state
    //doing the exact opposite
    this.scene = "start";
    this.fateClicked = [false, false, false];
    //empty the lines
    this.cardsLine.textContent = "";
    this.storyLine.textContent = "";
    this.interLine.textContent = "";
    // with a for loop: rremove "fate-read" from the outer div,  remove "is-flipped" from the inner div (unflips the card)
    for (let i = 0; i < this.cardEls.length; i++) {
      this.cardEls[i].style.display = "none";
      this.cardEls[i].classList.remove("fate-read");
      //enables a clean like flip for now
      let inner = this.cardEls[i].querySelector(".flip-card-inner");
      inner.classList.remove("is-flipped");
    }
  }

  startReading() {
    //making new scene to be called up there, simplified before adding the helperss
    this.scene = "cardsShown";
    this.deckEl.style.display = "none";
    //where the deck is used to call the OTHER functionings aswell
    this.deck.shuffle();
    this.currentCards = this.deck.drawThree();
    //create new reading object when this is functioning
    this.reading = new CardReading();
    //pos of cards visuallly in this state
    let positions = [
      { left: "110px", top: "190px" },
      { left: "260px", top: "160px" },
      { left: "410px", top: "190px" },
    ];
    //
  }
  flipCards() {}
  readCard() {}
  showReading() {}
}
