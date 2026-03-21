//main deck
//builds shuffles and deals from standard 52 deck (with custom card images of the from and back
//) each card has the corresponding properties
//oneforth.js creates one deck and calls a drawing of three of the cards at random
class Deck {
  constructor() {
    //from soruce, the four suits with the leter file names (THESE ARE The temporary basic ones from a free png image foder souced online)
    this.suits = [
      { name: "Hearts", code: "_of_hearts" },
      { name: "Diamonds", code: "_of_diamonds" },
      { name: "Clubs", code: "_of_clubs" },
      { name: "Spades", code: "_of_spades" },
    ];
    //the 13 ranks
    this.ranks = [
      { name: "Ace", code: "ace" },
      { name: "2", code: "2" },
      { name: "3", code: "3" },
      { name: "4", code: "4" },
      { name: "5", code: "5" },
      { name: "6", code: "6" },
      { name: "7", code: "7" },
      { name: "8", code: "8" },
      { name: "9", code: "9" },
      { name: "10", code: "10" },
      { name: "Jack", code: "J" },
      { name: "Queen", code: "queen" },
      { name: "King", code: "king" },
    ];
    //this.cards call for array of 52VVVV
    this.cards = [];

    this.buildDeck();
  }
  //build deck fills this.cards with all 52 card objects using a nested for loop
  //one for suits, one for ranks the same pattern im not sure if this will be properly shuffled this basically
  buildDeck() {
    this.cards = [];

    for (let i = 0; i < this.suits.length; i++) {
      for (let j = 0; j < this.ranks.length; j++) {
        this.cards.push({
          suit: this.suits[i].name,
          rank: this.ranks[j].name,
          code: this.ranks[j].code + this.suits[i].code,
          display: this.ranks[j].name + " of " + this.suits[i].name,
        });
      }
    }
  }
}
