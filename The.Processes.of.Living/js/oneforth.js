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
    this.deck = new Deck();
    this.reading = new CardReading();
    //this array gets the later stored 3 cards drawn from the deck
    this.drawnCards = [];
    //custom bool toggle to see which cards have been clicked to reveal fate,
    // this array is to remember whether each of the 3 cards has been clicked during the reading phase
    this.fateClicked = [false, false, false];
    //final landing positions for the three cards after they deal out
    this.dealPositions = [
      { left: 110, top: 190 },
      { left: 260, top: 160 },
      { left: 410, top: 190 },
    ];
    //this is JUST A LOGIC THING
    //this.scene = "start"; //tells what stage its in before the other things r read
    //IMPORTANT FOR WHEN  video paths r ready: note to replace

    //call the event listen; make the deck clickable and make each card clickable
    this.setupEvents();
  }
  //event listeners
  setupEvents() {
    //deck click, when its clicked, only let the deck work in the start
    //If the deck is clicked later, nothing should happen
    this.deckEl.addEventListener("click", () => {
      let scene = this.stage.getAttribute("custom-bool");
      if (scene === "shuffleTell") {
        //this.showCards();
        this.startReading(); //im adding this
      } else if (scene === "splitTell") {
        this.startSplitNow();
      }
    });
    //clicker loop, card elements n different behavior depending on state, add
    //add one click listener event to eac card
    for (let i = 0; i < this.cardEls.length; i++) {
      //store this loop's card number
      let cardIndex = i;
      this.cardEls[i].addEventListener("click", () => {
        let scene = this.stage.getAttribute("custom-bool");
        //before cards are revealed, one click flips all
        if (scene === "waitReveal") {
          this.flipCards();
        }
        //then each card can be clicked to show the reading bit
        else if (scene === "waitFate") {
          this.revealFate(cardIndex);
        }
      });
    }
  }
  // showCards() {
  //   console.log("deck clicked");
  // }
  enter() {
    //enter card display before reset
    this.reset();
    //intial scene for real
    this.setScene("shuffleTell");

    //positioned upon the stage, css doing rest of work
    this.deckEl.style.left = "260px";
    this.deckEl.style.top = "220px";
    //makes it visible
    this.deckEl.style.display = "block";
    //updated text call w method
    this.setTell("shuffle?");
  }
  reset() {
    //return the empty/reset every element to its blank starting state
    //doing the exact opposite
    //neutral scene set now
    this.setScene("idle");
    //empty data
    this.drawnCards = [];
    this.fateClicked = [false, false, false];
    //this.cardEls[i].style.display = "none";

    //make deck visible again
    this.deckEl.style.display = "none";
    // with a for loop: rremove "fate-read" from the outer div,  remove "is-flipped" from the inner div (unflips the card)
    for (let i = 0; i < this.cardEls.length; i++) {
      //hide the card like t the beginning, cards should not be visible yet
      this.cardEls[i].style.display = "none";
      //css based
      this.cardEls[i].classList.remove("fate-read");
      //move all cards back to the deck center position
      this.cardEls[i].style.left = "260px";
      this.cardEls[i].style.top = "220px";
      //enables a clean like flip for now
      //find the inner flip container for this card then have the class "is-flipped" belongs on .flip-card-inner, not the outer container
      let inner = this.cardEls[i].querySelector(".flip-card-inner");
      //remove flip so the card returns to its front
      inner.classList.remove("is-flipped");
      //restore the original back image instead
      let faceImg = this.cardEls[i].querySelector(".flip-card-back img");
      faceImg.src = "assets/cards/BACK.png";
    }
    //empty the lines (moved here instead)
    this.cardsLine.textContent = "";
    this.storyLine.textContent = "";
    this.interLine.textContent = "";
  }
  setScene(name) {
    this.stage.setAttribute("custom-bool", name);
  }

  startReading() {
    //making new scene to be called up there, simplified before adding the helperss
    this.setScene("shuffling");
    this.deckEl.style.display = "none";
    //from the custom text gen method
    this.setTell("SHUFFLING...");
    //where the deck is used to call the OTHER functionings aswell
    //shuffle the deck so order becomes random / changes the internal order of this.deck.cards
    //this.deck.shuffle();

    // //picks the first 3 cards from the shuffled deck then  currentCards becomes an array of 3 card objects
    // this.currentCards = this.deck.drawThree();
    // //create new reading object when this is functioning
    // this.reading = new CardReading(this.currentCards);
    // //pos of cards visuallly in this state, the appearing list of screen positions for the 3 cards

    // //loopthru them
    // for (let i = 0; i < this.cardEls.length; i++) {
    //   //store current card and matching positions
    //   let card = this.cardEls[i];
    //   let position = positions[i];
    //   card.style.display = "block";
    //   card.style.left = position.left;
    //   card.style.top = position.top;
    //   //get the image element inside the back side of the card
    //   //let backImage = card.querySelector(".flip-card-back img");
    // }
    //draw the three cards now during the shuffle wait
    this.drawnCards = this.deck.drawThree();
    window.setTimeout(() => {
      this.startSplitNow();
    }, 1400);
  }

  //split first with text
  startSplitTell() {
    this.setScene("splitTell");
    this.deckEl.style.display = "block";
    this.setTell("split?");
  }
  startSplitNow() {
    //splitting the deck  so to hide deck, wait, then deal the cards
    this.setScene("splitting");
    this.deckEl.style.display = "none";
    this.setTell("splitting...");
    //the timer is too slow imo fix SOON
    window.setTimeout(() => {
      this.startDeal();
    }, 1400);
  }
  startDeal() {
    //show all three cards stacked at the deck center
    this.setScene("dealing");
    //looop again to pull the three of array
    for (let i = 0; i < this.cardEls.length; i++) {
      this.cardEls[i].style.left = "260px";
      this.cardEls[i].style.top = "220px";
      this.cardEls[i].style.display = "block";
    }
    this.setTell("a triad is drawn");
    //small delay so the browser paints the starting position before animating
    window.setTimeout(() => {
      for (let i = 0; i < this.cardEls.length; i++) {
        this.cardEls[i].style.left = this.dealPositions[i].left + "px";
        this.cardEls[i].style.top = this.dealPositions[i].top + "px";
      }
    }, 0);

    //wait for the CSS transition (0.55s) to finish before accepting clicks
    window.setTimeout(() => {
      this.setScene("waitReveal");
      this.setTell("just one click");
    }, 750);
  }

  flipCards() {
    //reading scene
    this.setScene("flipping");

    //loop to flip
    for (let i = 0; i < this.cardEls.length; i++) {
      //find the flip-card-inner element for this card rn
      let innerImg = this.cardEls[i].querySelector(".flip-card-back img");
      innerImg.src = this.deck.getImagePath(this.drawnCards[i]);
      //then add the CSS class that triggers the flip animation
      let flipper = this.cardEls[i].querySelector(".flip-card-inner");
      flipper.classList.add("is-flipped");
    }
    //checks animation endingso user can click cards individuallyt
    window.setTimeout(() => {
      this.setScene("waitFate");
      this.setTell("choose one by one");
    }, 900);
  }
  revealFate(index) {
    //handles the clicking one spec card during actual reading phase but doesnt generate the whole reading immidiately
    //marks them as "read" when all three r done then showreading. index per card

    //prevents repeated clicks problems so if this card was already clicked before do nothing and leave immediately
    if (this.fateClicked[index] === true) {
      return;
    }
    //mark this card as clicked/read
    this.fateClicked[index] = true;
    //add the CSS to cliked card
    this.cardEls[index].classList.add("fate-read");
    //if all three are clicked then begin the show reading next phase
    let allDone = this.fateClicked.every(function (clicked) {
      return clicked === true;
    });

    if (allDone) {
      this.showReading();
      this.setScene("done");
      this.setTell("fin");
    }
  }
  showReading() {
    //final scene of this
    let cards = this.drawnCards;
    let sum = [];
    //summar line s
    //cardreading object function stuff NOW WITH LOOP
    for (let i = 0; i < cards.length; i++) {
      sum.push(this.reading.getOneLine(cards[i]));
    }
    //text joiner as made in readings and decks
    this.cardsLine.textContent = sum.join(".");
    this.storyLine.textContent = this.reading.buildStory(cards);
    this.interLine.innerHTML = this.reading.buildInterpretation(cards);
    //label randomiser its giving it a hand-placed, ritual feel uses the same Math.random()
  }
  setTell(text) {
    //change the actual words displayed with this stuff
    this.tellEl.textContent = text;
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
    //the many random positions tried until one doesnt over lap the card central area
    for (let attempt = 0; attempt < 60; attempt++) {
      let x = Math.floor(Math.random() * (640 - tellW - 20)) + 10;
      let y = Math.floor(Math.random() * (640 - tellH - 20)) + 10;
      //card zones to avoid but text will appear everywhere else hopfully
      //better words its the rectangle representing the card spread zone that the teller text should avoid
      let czL = 90;
      let czT = 140;
      let czR = 550;
      let czB = 380;
      //rectangular overlap tester "is the teller box overlapping the card zone (which is these numbers)"
      //first calc this then negate with ! to getthe overlap
      let overlapCards = !(
        x + tellW < czL ||
        x > czR ||
        y + tellH < czT ||
        y > czB
      );
      //if this random position is safe, use it
      if (!overlapCards) {
        this.tellEl.style.left = x + "px";
        this.tellEl.style.top = y + "px";
        placed = true;
        break;
      }
    }
    //if theres nothing else then put it somehwere here
    if (!placed) {
      this.tellEl.style.left = "14px";
      this.tellEl.style.top = "14px";
    }
  }
}
