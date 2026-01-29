window.onload = setup;
function setup() {
  console.log("events!");
  //let introSection = document.querySelector("#intro");
  // introSection.addEventListener("click", mouseClickCallBack);

  // let s1 = document.querySelector("#s1");
  // s1.addEventListener("click", mouseClickCallback);
  // let s2 = document.querySelector("#s2");
  // s2.addEventListener("click", mouseClickCallback);
  let allSections = document.querySelectorAll(".mouseclick-active-section");
  for (let currentSection of allSections) {
    currentSection.addEventListener("click", mouseClickCallback);
  }

  function mouseClickCallback(eventObj) {
    // console.log("clicked");
    // console.log(this);
    console.log(this);
    console.log(eventObj);
    //this.style.background = "blue";
    let idOfThis = this.getAttribute("id");
    if (this.getAttribute("custom-bool") === "inactive") {
      //console.log(document.querySelector(`#${idOfThis}`));
      let child = document.querySelector(`#${idOfThis} p`);
      let classToAdd = `${idOfThis}-section-active`;
      this.classList.add(classToAdd);
      let classToAddP = `${idOfThis}-section-p-active`;
      child.classList.add(classToAddP);
      console.log(this.getAttribute("custom-bool"));
    } else {
      let child = document.querySelector(`#${idOfThis} p`);
      let classToAdd = `${idOfThis}-section-active`;
      this.classList.remove(classToAdd);
      let classToAddP = `${idOfThis}-section-p-active`;
      child.classList.remove(classToAddP);
      console.log(this.getAttribute("custom-bool"));
    }

    //template string to include a variable inside the string, not only its name but
    // its value within the string
  }
}
