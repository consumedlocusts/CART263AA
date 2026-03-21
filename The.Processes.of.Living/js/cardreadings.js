class CardReading {
  constructor() {
    //holds all the catomancy knowlege for the future ,
    // generates meaning text from the three cards drawn and then combines them simply
    //SUIT MEANINGGS
    this.suitMeanings = {
      Hearts: "x",
      Diamonds: "y",
      Clubs: "z",
      Spades: "f",
    };
    //RANK MEANIGS:
    this.rankMeanings = {
      Ace: "hi",
      2: "hi",
      3: "hi",
      4: "hi",
      5: "hi",
      6: "hi",
      7: "hi",
      8: "hi",
      9: "hi",
      10: "hi",
      Jack: "hi",
      Queen: "hi",
      King: "hi",
    };
    //the three card "filler word"
    this.positions = ["you may", "for what", "well"];
  }
  //returns full parag for one card that includes its pos in the spread
  //its suit and rank theme are determined in the pattern
  //pos index is like 0,1,2 (the threee cards) matching the this.positions[] index
  getFullMeaning(card, positionX) {
    let position = this.positions[positionX];
    let suit = this.suitMeanings[card.suit];
    let rank = this.rankMeanings[card.rank];
    return card.display + "X" + position + "??" + "filler";
  }
  //weaving of the three cards into one story with the skeleton remaining the same
  //FOR NOW
  buildStory(cards) {
    let lines = "";
  }
}
