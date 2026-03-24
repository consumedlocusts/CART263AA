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
