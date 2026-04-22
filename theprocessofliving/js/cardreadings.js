class CardReading {
  constructor() {
    //holds all the catomancy knowlege for the future ,
    // generates meaning text from the three cards drawn and then combines them simply
    //SUIT MEANINGGS
    this.suitMeanings = {
      Hearts: " the inner world —+- feelings, connection, and longing",
      Diamonds: " the material world —+- movement, exchange, and change",
      Clubs: " ambition and effort —+- work, friction, and growth",
      Spades: " difficulty and truth —+- loss, challenge, and hard knowledge",
    };
    //RANK MEANIGS:
    this.rankMeanings = {
      Ace: " a beginning —+- something is arriving or opening",
      2: " duality —+- a choice, a pairing, or a balance to find",
      3: " growth —+- something is expanding beyond its origin",
      4: " stability —+- a pause, a foundation, or a resting point",
      5: " disruption —+- something is shifting or being tested",
      6: " passage —+- movement from one condition to another",
      7: " reflection —+- a hidden truth or a test of patience",
      8: " momentum —+- things are accumulating or accelerating",
      9: " near-completion —+- one step remains before the end",
      10: " culmination —+- an ending that contains a new beginning",
      Jack: " a restless energy —+- action taken without full knowledge",
      Queen: " feminine intuition —+- soulmate",
      King: " mastery and authority —+- full command of a domain",
    };
    //the three card "filler word" as positions in the spread
    this.positions = [
      " what has shaped you",
      " for what surrounds you",
      " what is coming toward you",
    ];
  }
  getOneLine(card) {
    //short summary one liner at the top of the completed reading
    return card.display + " — " + this.rankMeanings[card.rank];
  }
  //returns full parag for one card that includes its pos in the spread
  //its suit and rank theme are determined in the pattern
  //pos index is like 0,1,2 (the threee cards) matching the this.positions[] index
  getFullMeaning(card, positionX) {
    let position = this.positions[positionX];
    let suit = this.suitMeanings[card.suit];
    let rank = this.rankMeanings[card.rank];
    return (
      card.display +
      " speaks to" +
      position +
      "." +
      " this carries on " +
      suit +
      ". " +
      " it tells of" +
      rank +
      "."
    );
  }
  //weaving of the three cards into one story with the skeleton remaining the same
  //FOR NOW
  buildStory(cards) {
    return (
      "soon you will enter a place that feels half-remembered and half-invented" +
      "first" +
      cards[0].display +
      "then the" +
      cards[1].display +
      "interrupts the sequence" +
      "finally the" +
      cards[2].display +
      "settle what remains"
    );
  }
  buildInterpretation(cards) {
    //actual interpertation building
    let text = "";

    for (let i = 0; i < cards.length; i++) {
      text += this.getFullMeaning(cards[i], i);
      text += "<br><br>";
    }
    return text;
  }
}
