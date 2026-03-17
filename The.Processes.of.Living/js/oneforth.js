class OneForth {
  constructor() {
    //custombool attributt tracks the scene
    this.stage = document.getElementById("future-stage");
    //intsructions
    this.promptEl = document.getElementById("prompt-text");
    //deck image clicky
    this.deckEl = document.getElementById("deck-image");
    //.flip-card cintainer stored in a three array idk its
    // like 4 am so we can loop them over all elements .mouseclike
    this.cardEls = [
      document.getElementById("card-0"),
      document.getElementById("card-1"),
      document.getElementById("card-2"),
    ];
  }
}
