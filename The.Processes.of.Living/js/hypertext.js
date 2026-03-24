function setupHypertext() {
  //find rtyy thing with the class "ht-link"
  let links = document.querySelectorAll(".ht-link");
  //same pattern as for loop over all sections
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
      //stop the browser from following a real href if there is one
      e.preventDefault();
      //read the data-target attribute to find which box to open, getAttribute is the same technique used throughout this project for reading custom-bool on the future-stag
      let targetId = this.getAttribute("data-target");
      if (!targetId) {
        console.log("ht-link has no data-target attribute");
        return;
      }
      //find the expansion box with that id
      let expandBox = document.getElementById(targetId);

      if (!expandBox) {
        console.log("could not find expansion box: " + targetId);
        return;
      }
      //toggle the "open" class on the expansion box classList.toggle() adds the class if it is absent, removes it if it is already there
      expandBox.classList.toggle("open");
      // also toggle a visual indicator on the link itself then add "ht-active" class so CSS can style it differently
      this.classList.toggle("ht-active");
      //after opening a new expansion box, re-scan for any NEW .ht-link elements inside it that were not there when setupHypertext() first ran and
      //this makes nested links work
      refreshHypertextLinks();
    });
  }
}
function refreshHypertextLinks() {
  //find all ht-link elements that have NOT been wired yet
  let unwiredLinks = document.querySelectorAll(".ht-link:not([ht-wired])");

  for (let i = 0; i < unwiredLinks.length; i++) {
    //mark this element as wired so we don't attach twice
    unwiredLinks[i].setAttribute("ht-wired", "true");

    unwiredLinks[i].addEventListener("click", function (e) {
      e.preventDefault();

      let targetId = this.getAttribute("data-target");
      let expandBox = document.getElementById(targetId);

      if (expandBox) {
        expandBox.classList.toggle("open");
        this.classList.toggle("ht-active");
        refreshHypertextLinks(); //check for newly revealed links again
      }
    });
  }
}
function injectReadingLinks(cards) {
  //build the expansion box html for each card's suit these will be injected into the DOM as hidden boxes for hideen reading
  let suitExpansions = {
    Hearts: {
      id: "expand-hearts",
      text:
        "Hearts govern the inner world. " +
        "Feeling, connection, memory, longing. " +
        "What the chest holds that the mouth does not say. " +
        "<a class='ht-link' data-target='expand-hearts-deep'>go further.</a>",
    },
    Diamonds: {
      id: "expand-diamonds",
      text:
        "Diamonds govern the material world. " +
        "Movement, exchange, the cost of passage. " +
        "Something changes hands. Something is lost in transit. " +
        "<a class='ht-link' data-target='expand-diamonds-deep'>go further.</a>",
    },
    Clubs: {
      id: "expand-clubs",
      text:
        "Clubs govern effort and ambition. " +
        "Friction, appetite, the argument with obstacles. " +
        "The kind of work that leaves marks. " +
        "<a class='ht-link' data-target='expand-clubs-deep'>go further.</a>",
    },
    Spades: {
      id: "expand-spades",
      text:
        "Spades govern difficulty and truth. " +
        "Loss, severance, the knowledge that arrives too late. " +
        "What the blade removes cannot be reattached. " +
        "<a class='ht-link' data-target='expand-spades-deep'>go further.</a>",
    },
  };

  //second-level expansionsreached from inside the first ones s
  let deepExpansions = {
    "expand-hearts-deep":
      "The ten of cups empties itself. The ace refills from nothing.",
    "expand-diamonds-deep":
      "A coin passed between strangers is a sentence with no subject.",
    "expand-clubs-deep":
      "Effort is the only evidence we leave that does not decay.",
    "expand-spades-deep":
      "There is a kind of clarity that only arrives after the ending.",
  };

  //append hidden divs to the reading panel so they exist before the links that reference them are clicked
  let panel = document.getElementById("reading-panel");

  /* add suit expansions (first level) */
  for (let suit in suitExpansions) {
    let exp = suitExpansions[suit];

    //only adds if this expansion box doesn already exist
    if (!document.getElementById(exp.id)) {
      let box = document.createElement("div");
      box.id = exp.id;
      box.className = "hypertext-expand";
      box.innerHTML = exp.text;
      panel.appendChild(box);
    }
  }

  //add deep expansions (second level)
  for (let deepId in deepExpansions) {
    if (!document.getElementById(deepId)) {
      let box = document.createElement("div");
      box.id = deepId;
      box.className = "hypertext-expand";
      box.innerHTML = deepExpansions[deepId];
      panel.appendChild(box);
    }
  }
  //for each drawn card, find its suit name in the interpretation text and wrap it in an <a class="ht-link"> tag.
  //im only do this for unique suits so no doubes
  let interpEl = document.getElementById("interpretation-line");
  let html = interpEl.innerHTML;

  if (!interpEl) return;
  //track which suits it got already linked so it dont wrap twice
  let alreadyLinked = {};

  for (let i = 0; i < cards.length; i++) {
    let suit = cards[i].suit;
    let expId = suitExpansions[suit] ? suitExpansions[suit].id : null;

    if (!expId || alreadyLinked[suit]) continue;
    alreadyLinked[suit] = true;
    //gettting confused now but thid replace the first occurrence of the suit name in the html with a hypertext link pointing to that suit edxpansion box
    //the regex flag "i" makes it let regex = new RegExp(suit, "i");
    html = html.replace(
      regex,
      "<a class='ht-link' data-target='" + expId + "'>" + suit + "</a>",
    );
  }
  interpEl.innerHTML = html;
  //wire up the newly injected links heh
  refreshHypertextLinks();
}
