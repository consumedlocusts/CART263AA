window.onload = setup;

/** function setup */
function setup() {
  console.log("we are a go!");
  /*** ALL ANWSERS TO BE ADDED IN THE ALLOCATED SPACE */
  /*** START PART ONE ACCESS */
  /* 1: all paragraph elements */
  /***CODE */ let allPTags = document.getElementsByTagName("p");
  console.log(allPTags);
  /***OUTPUT: shwoing list of all <p> elements on the page/logging list of all <p> elements
   *
   */

  /*************************************** */
  /* 2: only the first paragraph element */
  /***CODE */ let firstPTag = document.getElementsByTagName("p")[0];
  console.log(firstPTag);
  /***OUTPUT: shows only the first <p> element on the page only
   *
   */

  /*************************************** */
  /* 3: all elements with the class inner-container */
  // /***CODE */ let innerContainers =
  //   document.getElementsByClassName("inner-container");
  // console.log(innerContainers);
  /***OUTPUT: shows all elements thatt have an "inner-container" class
   * // overrides part 2
   */

  /*************************************** */
  /* 4: the last image element inside the element that has the class img-container */
  /***CODE */ let imgContainer = document.querySelector(".img-container"); //. indicating accesisng within class
  let imgs = imgContainer.getElementsByTagName("img");
  let lastImg = imgs[imgs.length - 1]; //-1 counting by accessing last el of array javascript is backwards
  console.log(lastImg); //logging the lastImg only
  /***OUTPUT: shows last <img> inside the class "img-container"
   *
   */

  /*************************************** */
  /* 5A: all h2 elements */
  /* 5B: length of the list in 5A */
  /* 5C: the text content of the first element in the list from 5A */
  /***CODE */ let allH2 = document.getElementsByTagName("h2"); //get the tag name first
  console.log(allH2); //since the accessed <h2> element calling is already established,
  // i only need to log for the length of the list that has beeen accessed ^^^
  console.log(allH2.length);
  //using javascript ".textContent"
  //console.log(allH2).textContent;

  /***OUTPUT: first log: show all <h2> elements
   * second log: shows how many <h2> elements exist
   * third log: shows the text content of only the first <h2>
   */

  /*************************************** */
  /* 6: the element with id name parent */
  /***CODE */ let parentEl = document.getElementById("parent");
  console.log(parentEl);
  /***OUTPUT: using get element by id instead of tag
   * shows the element with id "parent"
   */

  /*************************************** */
  /*** END PART ONE ACCESS */

  /*************************************** */
  /*** START PART TWO MODIFY */

  //   /*************************************** */
  //   /* 1: Select the first paragraph and replace the text within the paragraph... */
  //   /***CODE */
  //   let firstP = document.getElementById("1");
  //   console.log(firstP);
  //   firstP.textContent = "hello hello hello";
  //   console.log(firstP.textContent);
  //   //logging new replacement for the first paragraph
  //   /*************************************** */
  //   /* 2: Select all elements in the HTML that have the class name content-container
  //  and change the background color ... of first and second ...*/
  //   /***CODE */
  //   let contentContainers = document.getElementsByClassName("content-container");
  //   console.log("lengs", contentContainers.length); //"lengs" is logging the lenght of all elemnts w class name content-container (8)
  //   contentContainers[0].style.backgroundColor = "orange";
  //   contentContainers[1].style.backgroundColor = "purple";
  //   console.log(contentContainers[0].style.backgroundColor);
  //   console.log(contentContainers[1].style.backgroundColor);
  //   //backgroundColor
  //   /*************************************** */
  //   /* 3: Change the src element of the first image element on the page to be ...?? seventh
  // /***CODE */
  //   let allImgs = document.getElementsByTagName("img");
  //   allImgs[0].setAttribute("src", "task-2-images/seven.png");
  //   console.log(allImgs[0].getAttribute("src"));
  //   /*************************************** */
  //   /* 4: Select the third paragraph element on the page and
  // replace the content (within the paragraph) to be an h2 element which contains the text `TEST 123`
  // /***CODE */
  //   let pThree = document.getElementById("3");
  //   pThree.innerHTML = "<h2>TEST 123</h2>"; //
  //   console.log(pThree.innerHTML);
  //   /*************************************** */
  //   /* 5: Select the fourth paragraph element on the page and
  // add to the existing content an h2 element containing the text `TEST 123`
  // /***CODE */
  //   let pFour = document.getElementById("4");
  //   pFour.innerHTML = pFour.innerHTML + "<h2>TEST 123</h2>"; //
  //   console.log(pFour.innerHTML); //same as above but adding instead of repkacing with + symbol
  //   /*************************************** */
  //   /* 6: Select the fifth paragraph element on the page and add to the existing content
  // an img element that holds `one.png`, and add the class newStyle to said paragraph element.
  // /***CODE */
  //   let pFive = document.getElementById("5");
  //   pFive.innerHTML = pFive.innerHTML + '<img src="task-2-images/one.png">'; //
  //   pFive.classList.add("newStyle"); //logs the classlist with/including "new style" which is pink
  //   console.log(pFive.classList);
  //   /*************************************** */
  //   /* 7: Add the following array variable: let colors = ['red','blue','green','orange'];,
  // then access all elements with class name inner-container and save to a variable called `innerContainers`.
  // Next, iterate over the colors array, and for each color:
  // assign the element from innerContainers variable with the same index
  // (i.e. colors[0] should be allocated to the first innerContainers element, colors[1] to the second, etc ...)
  // a background using that color.
  // /***CODE */
  //   let colors = ["red", "blue", "green", "orange"]; //array
  //   //let innerContainers = document.getElementsByClassName("inner-container"); //cannot redeclaere this
  //   let innerContainers = document.getElementsByClassName("inner-container");
  //   console.log("inner", innerContainers.length);
  //   for (let i = 0; i < colors.length; i++) {
  //     innerContainers[i].style.backgroundColor = colors[i]; //border of containers?? why
  //     console.log(innerContainers[i].style.backgroundColor);
  //   }
  /*************************************** */
  /*** END PART TWO MODIFY */

  /*************************************** */
  /*** START PART THREE CREATE */
  /*************************************** */
  /* 1: NEW PARAGRAPHS */
  /* 1A: Access all paragraph elements, and store the result in a variable called: allPTagsThree */
  /* 1B: Create a function:function customCreateElement(parent){ //body } */
  /* 1C:  In the body of customCreateElement create a new parargraph element*/
  /* 1D:  Set the text of this element to be : `using create Element`*/
  /* 1E:  Set the background of this paragraph element to be green */
  /* 1F:  Set the color of the text in this paragraph element to be white */
  /* 1G: Append this new element to the parent variable within the function. */
  /* 1H: Iterate through the allPTagsThree array and call customCreateElement(), 
passing the current allPTagsThree element as the parent with each iteration.*/
  /***CODE */
  //1A:
  let allPTagsThree = document.querySelectorAll("p"); //query select to not increaase the things we trying to get idk
  console.log(allPTagsThree);
  console.log(allPTagsThree.length);
  //logs list of all <p> elements, which is 9 (logs the number 9 as length)
  //1B: new function
  //do i have to, before adding newP, freeze the og so no CPU overload??
  function customCreateElement(parent) {
    //1C,1D,1E,1F
    let newP = document.createElement("p");
    newP.textContent = "hello hello hello hello hello";
    newP.style.backgroundColor = "green";
    newP.style.color = "white";
    // 1G:add the newP to the "parent" hehe nvm
    parent.appendChild(newP);

    console.log("newP to parent", parent);
  }
  //test
  for (let i = 0; i < allPTagsThree.length; i++) {
    customCreateElement(allPTagsThree[i]);
  }

  // }
  /***EXPLANATION:
   * not sure if i did this correctly/understood the parent to child relation of this example but
   * new <p>;for each original <p>, a NEW <p> is inserted right after it. They are not nested <p> within <p>
   * so it displays like this ^^ (sep green text box) IN THE PARENT CONTAINER(its appended to)
   *query selected instead as a static list (not live)
   */

  /*************************************** */
  /* 2: GRID OF BOXES */
  /* 2A: Create another new function: function customNewBoxCreate(parent){ //body }*/
  /* 2B: In the body of customNewBoxCreate create a new div element, that has the class testDiv. 
/* 2C:Then append this new element to the parent variable within the function. 
/* 2D:Finally, return</code> this new element */
  /* 2E:Create a nested for loop (for rows and columns) to iterate through 10 columns and 10 rows (just like the JS Review :)). 
    Call the customNewBoxCreate function, in order to generate a new div -> representing each cell in the grid. 
    Ensure that the parent element for each of these new divs is the element whose id is named `new-grid`*/
  /* 2F: You will see at this point that the x,y position of the resulting divs makes no sense... 
    Fix this by doing the following: every time you call customNewBoxCreate() - save the current returned element 
    in a variable i.e. returnedDiv. 
    Set the style (left and top) to the of this element to 
    the necessary x and y position (use the counter variables in the for nested for loop to 
    calculate the new positions.
/* 2G: BONUS I: Make every div in the resulting grid in an even numbered row have white background 
    and otherwise let it have a background of purple.</li>
/* 2H: BONUS II: For every div in an even numbered row make it contain the text `EVEN`, 
    otherwise lat it have the content `ODD`.*/

  /***CODE */

  function customNewBoxCreate(parent) {
    //2B:
    let newDiv = document.createElement("div");

    newDiv.classList.add("testDiv");
    //2C:
    parent.appendChild(newDiv);
    //2D:
    return newDiv;
  }
  //get parent el for first grrid ,log the <sectiom id="new-grid"></section element
  let newGridParent = document.getElementById("new-grid");
  console.log(newGridParent);
  //using the cell size alrd mentioned in CSS
  let cellSize = 40; //ik i should ref the CSS but its confusing
  for (let row = 0; row < 10; row++) {
    //nested llooop for row,cols
    for (let col = 0; col < 10; col++) {
      //new var, create one new box ref and save returned eelment
      let returnDiv = customNewBoxCreate(newGridParent);
      //might crash, set pos based on row/col
      returnDiv.style.left = col * cellSize + "px";
      returnDiv.style.top = row * cellSize + "xp";
    }
  }
  console.log(document.getElementsByClassName("testDiv").length);
  /***EXPLANATION::
   *the function creates one div with class "testDiv" and appends it to #new-grid
   *then the nested loop runs 10x10 creatung 100 boxes, each box is pos left/top=col*size, row*size
   */
  //the CSS sets .testDiv to position:absolute and #new-grid to position:relative the bxoxes r visible grids
  //sorry i cant do the bonus
  /*************************************** */
  /* 3: GRID OF BOXES II */

  /* 3A: Create ANOTHER nested for loop - in order to generate a new grid ... 
    USE the same customNewBoxCreate function..., the only difference is that the parent element 
    for each of these new divs is the element whose id is `new-grid-three`. */
  /* 3B: Then: write the code to check when a column is a multiple of 3 (no remainder), 
    when it is a column where the remainder is 1 or when the remainder is 2 ... 
    HINT:: look up the % operator.. */
  /* 3C: Then for each of the above cases: give the new divs in the first case a background of red, 
        then the second a background of orange and the third yellow. */
  /*  3D: Finally, let each div contain the text content representing the associated remainder 
    when dividing by three. */

  /***CODE */

  /***EXPLANATION::
   *
   *
   */

  /*************************************** */
  /*** END PART THREE CREATE */
  /*************************************** */
}
