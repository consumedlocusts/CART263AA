class OneForth {
  constructor() {
    //custombool attributt tracks the scene
    //main stage box(too big)
    this.stage = document.getElementById("future-stage");
    //intsructions for users NOTE; i need 2 call the text i actually want each time
    //this is only styled
    this.tellEl = document.getElementById("tell-text");
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
    //null 4 now
    this.reading = new CardReading();
    // this.reading = new CardReading();
    //this array gets the later stored 3 cards drawn from the deck
    this.currentCards = [];
    //call the event listen; make the deck clickable and make each card clickable
    this.setupEvents();
  }
  //event listeners
  setupEvents() {
    //deck click, when its clicked, only let the deck work in the start
    //If the deck is clicked later, nothing should happen
    this.deckEl.addEventListener("click", () => {
      let scene = this.stage.getAttribute("custom-bool");
      if (this.scene === "start") {
        //this.showCards();
        this.startReading(); //im adding this
        // } else if (scene === "") {
      }
    });
    //clicker loop, card elements n different behavior depending on state
  }
  // showCards() {
  //   console.log("deck clicked");
  // }
  enter() {
    console.log("future entered");
    //enter card display before reset
    this.reset();
    //text call

    //positioned upon the stage, css doing rest of work
    this.deckEl.style.left = "260px";
    this.deckEl.style.top = "220px";
    //makes it visible
    this.deckEl.style.display = "block";
    //updated text call w method
    this.setTell("CLICK THE DECK TO SHUFFLE");
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
    //make deck visible again
    this.deckEl.style.display = "block";
    // with a for loop: rremove "fate-read" from the outer div,  remove "is-flipped" from the inner div (unflips the card)
    for (let i = 0; i < this.cardEls.length; i++) {
      //hide the card like t the beginning, cards should not be visible yet
      this.cardEls[i].style.display = "none";
      //css based
      this.cardEls[i].classList.remove("fate-read");
      //enables a clean like flip for now
      //find the inner flip container for this card then have the class "is-flipped" belongs on .flip-card-inner, not the outer container
      let inner = this.cardEls[i].querySelector(".flip-card-inner");
      //remove flip so the card returns to its front
      inner.classList.remove("is-flipped");
      //clear stored data test
      this.currentCards = [];
      this.reading = null;
    }
  }

  startReading() {
    //making new scene to be called up there, simplified before adding the helperss
    this.scene = "cardsShown";
    this.deckEl.style.display = "none";
    //where the deck is used to call the OTHER functionings aswell
    //shuffle the deck so order becomes random / changes the internal order of this.deck.cards
    this.deck.shuffle();
    //picks the first 3 cards from the shuffled deck then  currentCards becomes an array of 3 card objects
    this.currentCards = this.deck.drawThree();
    //create new reading object when this is functioning
    this.reading = new CardReading(this.currentCards);
    //pos of cards visuallly in this state, the appearing list of screen positions for the 3 cards
    let positions = [
      { left: "110px", top: "190px" },
      { left: "260px", top: "160px" },
      { left: "410px", top: "190px" },
    ];
    //loopthru them
    for (let i = 0; i < this.cardEls.length; i++) {
      //store current card and matching positions
      let card = this.cardEls[i];
      let position = positions[i];
      card.style.display = "block";
      card.style.left = position.left;
      card.style.top = position.top;
      //get the image element inside the back side of the card
      //let backImage = card.querySelector(".flip-card-back img");
    }
  }
  flipCards() {
    //reading scene
    this.scene = "reading";
    //update primp text
    this.tellElEl.textContent = "CLICK EACH CARD";
    //loop to flip
    for (let i = 0; i < this.cardEls.length; i++) {
      //find the flip-card-inner element for this card rn
      let inner = this.cardEls[i].querySelector(".flip-card-inner");
      //then add the CSS class that triggers the flip animation
      inner.classList.add("is-flipped");
    }
  }
  readCard(index) {
    //handles the clicking one spec card during actual reading phase but doesnt generate the whole reading immidiately
    //marks them as "read" when all three r done then showreading. index per card

    //prevents repeated clicks problems so if this card was already clicked before do nothing and leave immediately
    if (this.fateClicked[index]) {
      return;
    }
    //mark this card as clicked/read
    this.fateClicked[index] = true;
    //add the CSS to cliked card
    this.cardEls[index].classList.add("fate-read");
    //if all three are clicked then begin the show reading next phase
    let allDone = this.fateClicked.every((clicked) => clicked === true);

    if (allDone) {
      this.showReading();
    }
  }
  showReading() {
    //final scene of this
    this.scene = "done";
    this.tellEl.textContent = "THE READING IS COMPLETE";
    //cardreading object function stuff
    this.cardsLine.textContent = this.reading.getCardNames();
    this.storyLine.textContent = this.reading.getStory();
    this.interLine.textContent = this.reading.getInterpretation();
  }
  //label randomiser its giving it a hand-placed, ritual feel uses the same Math.random()
  setTell(text){
let colors = [
      "rgb(227,227,227)",
      "rgb(255,220,100)",
      "rgb(255,170,170)",
      "rgb(170,215,255)",
    ];
    //randomise from these colors in da array
       let colorIndex = Math.floor(Math.random() * colors.length);
    this.tellEl.style.color = colors[colorIndex];
//tilt the text oddly
let angle = Math.floor(Math.random() * 13) - 6;
    this.tellEl.style.transform = "rotate(" + angle + "deg)";
    //generate 60 random pos for the text on the stage BUT avoids the center 
      let tellW = 300;
    let tellH = 40;
    let placed = false;
    for (let attempt = 0; attempt < 60; attempt++) {
      let x = Math.floor(Math.random() * (640 - tellW - 20)) + 10;
      let y = Math.floor(Math.random() * (640 - tellH - 20)) + 10;
      
  }
}
