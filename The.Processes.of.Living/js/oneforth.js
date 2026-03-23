class OneForth {
  constructor() {
    //custombool attributt tracks the scene
    //main stage box(too big)
    this.stage = document.getElementById("future-stage");
    //intsructions for users
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
    //output for text areas
    this.cardsLine = document.getElementById("cards-line"); //small summaru line
    this.storyLine = document.getElementById("story-line"); //story text
    this.interLine = document.getElementById("interpretation-line"); //main text that binds
    //helper deck and reading clas objects
    //  this.deck = new Deck();
    //  this.reading = new CardReading();

    //custom bool toggle to see which cards have been clicked to reveal fate, this array is checked before anything
    this.fateClicked = [false, false, false];
    //this is JUST A LOGIC THING
    this.scene = "start"; //tells what stage its in before the other things r read
    //IMPORTANT FOR WHEN  video paths r ready: note to replace
    //test placeholder for cards for now
    this.cardNames = ["e", "f", "g"];
  }
  //event listeners
  setupEvents() {
    //deck click, when its clicked, only let the deck work in the start
    this.deckEl.addEventListener("click", () => {
      if (this.scene === "start") {
        this.promptEl.textContent = "deck int";
      }
    });
  }
}
