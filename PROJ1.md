one fortiethly, ASCII Fortune Teller: The Process of Life (in progress);
https://github.com/consumedlocusts/CART263AA/tree/main/The.Processes.of.Living

The main objective of this project is to explore how interactive digital systems can model the structure and logic of ritualistic "future reading." The project, organized into PAST, PRESENT, and FUTURE categories, specifically focuses in this iteration on simulating a meaningful FUTURE state called one fortiethly, using browser-based tools.
The focus is on how to build structure into a browser-based interactive work that simulates a ritualistic “future reading” using a deck of 52 playing cards, a state-driven JavaScript system, and procedurally generated formulas of text(patterns). The project is built with vanilla JavaScript, HTML, CSS, and p5.js, and is organized as a sequence of controlled user actions that activate different parts of the system. Each interaction triggers these future variations through repetition, constraint, and chance, yet this structure follows a hypertext model, a sort of predictable state that leads to a specific next state based on user input.
The work begins with an ASCII-rendered Magic 8-ball built in p5.js from a previous project titled “billy.ball” for visual reasons. The image of the 8-ball is processed pixel by pixel using brightness values, typical of ASCII formulations. Each pixel is translated into a character, creating a grid where darker areas use denser characters and lighter areas use sparse ones. This produces a live ASCII image that sits inside a canvas element, and when the user clicks the 8-ball, a response is selected from an array of predefined strings (in the middle). The selection is random, but the probability is adjusted so that three (one in this case, as it is in progress) specific responses appear more often than the others. This weighting is implemented directly in the selection logic. The result is not evenly distributed randomness since it is a biased system that subtly repeats certain outputs more frequently to be functional in this age of increased impatience…[your future] awaiting [insert future event] is the process of living.
The work draws from early net art and hypertext literature, thus drawn with this fragmentation of disillusion and sequenced “free-will” infinitum. Inspired by hypertext fiction to be exact, experimentation with the streams of consciousness presented in works such as Ulysses by James Joyce, it intends to display a sense of melancholy (web present? basics) alongside the non-linearity. It also attempts to create systems of divination that rely on symbolic recombination, which was tried here in reference to make this feel real(as in really predicting the future). The deck of cards functions as a finite set of elements that can be arranged into different configurations. The code formalizes this process; such definitions are how elements are selected, how they are displayed, and how they are translated into language.
Within the natural world, the FUTURE is treated as a space of uncertainty; obviously, outcomes cannot be known in advance, but are still shaped by initial conditions. The system is designed around this contradiction by simulating a prediction and exposed result, assembled from predefined elements, weighted randomness, and user input.
The functionality is as follows: The FUTURE sequence begins when the StateManager activates the corresponding screen and calls the “enter()” function in the literal “future” (oneforth.js) class. As this clears previous data, resets card positions, removes visual states, restores card images, and clears text output, the (custom-made imagery) deck is placed at the center, and an instruction (of many) is displayed. The system tracks its current phase using a custom HTML attribute “custom-bool” on the main container. All click events read this value to determine what action to perform, which is contradictory to the entire notion of the game being chance-made. The goal for this game is predicted within the near future, as it will (instead of using the JSON-mimicked text with the index.HTML, very basic) to use a large source of fortunes collected from every source available, likewise of a research project (Key methods include Tarot/Cartomancy, astrology, scrying, and the I Ching).
Inspired by artist Eva Schindling:
https://evsc.net/
And her informed approaches in creative technology and system-based practice, particularly her focus on research-based non-linear processes, emergent behaviour, and the visualization of invisible systems. The work operates as a small-scale model of such dynamics; this, although currently limited, set of inputs produces an expansion of (text/string-based systems) to reflect a shift from a contained dataset to a larger corpus.
The sequence of shuffling, deck splitting, and dealing is managed through timed delays with original video productions of known figures interacting with the physical deck, as it is the medium. The reasoning for this is both aesthetic and “longing” personal value… This aspect is only best described by interacting with inspired work of early net-based hypertext pieces, such as My Boyfriend Came Back from the War: http://myboyfriendcamebackfromthewar.blogspot.com/and other frame-based nonlinear works. They fragment a story into states, each click exposing a new cell of meaning that does not accumulate into resolution. The reader moves through the work without ever arriving… Mark Bernstein's writing on hypertext describes non-linearity not as chaos but as a different kind of order, one in which multiple paths coexist and meaning emerges from the reader's navigation rather than the author's sequence. The cartomancy structure inside CardReading.js attempts something adjacent. Each user click-action triggers a function that updates this onwards; these delays regulate pacing and separate each step into distinct intervals. During the dealing phase, three cards are drawn from a shuffled deck and stored as data objects. As it is implemented within the “deck.js”, each card contains a suit and a rank and is chosen at random. All three cards are initially positioned at the center and then moved outward to predefined coordinates. The movement is handled through CSS transitions, with JavaScript updating position values in a single step. This(one-step)is tracked and then recorded in the reveal phase, collapsing individual agency into a single collective action. One click exposes all three cards simultaneously and removes the possibility of partial knowledge. A smooth distribution of elements without frame-based animation logic assigns the correct image to each card and applies a rotation transform through a CSS class yet again. Once revealed, each card with its individual definitions is activated (“as read”) by the click-a-card method. Completion of all three interactions triggers the final output, which is an assemblage of text utilizing the many predefined mappings mentioned, all stored in the CardReading class. Each card contributes (merges) fragments based on its suit and rank. The combinations are patterned as/into three levels of output: a sequence of short phrases, a narrative sentence, and a longer interpretation.
This ongoing interest in the future as a space defined by a “certain” uncertainty shaped One fortiethly as an interactive system for structured divination built in the browser using JavaScript, HTML, CSS, and p5.js. It follows a notion that we as conscious beings are trapped within an infinite(in a sense beyond us), yet finite loop of a planar understanding of time. Flatness of time regards not in the sense of being without depth, but in the sense that the past, present, and future already exist as organic states that those conscious move between rather than through (eg Nietzsche's eternal recurrence & the 8-ball as a machine for repetition). The “StateManager.js” does not destroy a state but hides it (since it's simply trying to progress our story). The opening screen is still there behind the future screen, the ball is still running, and the weighted array is still waiting. Everything that has happened and everything that could happen exists simultaneously in the DOM, ready to be again by a single function call.
This is the program's quiet argument: that the future is not coming but is already written in the structure of the system, waiting for the user to click through to it (find it).

Of note:
The interpretation of the imagery used for the cards and the video content are up to the viewer.

ROUGH DRAFT:

OPENING:
Magic ASCII 8ball with the usual magic 8ball reponses BUT three hidden results (these should be a bit more common to appear than the typical responses for presenting). Prompted to show the result click just the eight ball (like an autoscroll looking effect in the middle of the ball like the original). This P5js script of billy.ball will be compatible for vanilla javascript to interact with the DOM, the rest of the states and what not will have their own language accordingly.

= PAST, PRESENT, FUTURE

OBJECTIVE: whatever your future entails, you will be given/result to (out of three choices) an interactive simulation. For this project, though, I am ONLY focusing on the future telling game/device as it follows the guideline and I am hoping to focus on the aesthetics.

State title: ???
1: result PAST = midi keyboard play through (connected to Max, range of keys is a synthesised sound idk if its premade yet, what if user continues to build and compile notes into resulting custom chaotic synths samples maxed out finally until 8 keys (only certain amount of keys can be used per sample, once used, those keys are NOT optional for the next patch etc etc). Memory music … (FOR FINAL)

State title: ???
2: result PRESENT = real-time web animation manipulation/interaction, maybe a filter of the using the face and surroundings? Sensor activation with a processing for particles, node.js, idk anything sensor or present moment activated (FOR FINAL)

MULTI-PLAYER: the PAST result is logged and registered for the following persons PRESENT result (resets after every “other” round if another person gets PAST again soon, this is how it would be a “multi player”) THEN the PRESENT user has to replay (likewise of that dumb guitar hero idea i guess) there is no reward other than the PRESENT user’s patience and endurance for the PAST user’s creative input, whether it be just some trolling or a master full tune. It tells you a lot about a person, how they treat instruments.(POST FINAL?)

State title: one fortiethly

3: result FUTURE = THE PREDICTION EPIC with Javascript Vanilla,interacting with the DOM, HTML.
Sort of oblique , melancholic future telling “sequenced” (inspired by all those early hypertext click and reveal webs), in this process it writes a nonsensical story and interprets it for oneself. From all the weird inputs I create and write, some sort of poetic future is written for the user “simulates the future life of users by combining input-variables with statistical and random values.”
These “inputs” and “values” are categorized and subcategorized as a personalized play of a catomancy reading with a deck of 52 playing cards (not to be mistaken for tarot but I will have custom art work, names and meanings remain the same as a normal deck of cards).
As the reading deepens “If the reader hasn’t seen A, go there. If not, has the reader seen B? If the reader hasn’t seen B, go to B. Otherwise, go to C.” To not further confuse.
“When this essay first appeared, all of two years ago, very few
people outside the information sciences had heard of
hypertext, a technology for creating electronic documents in
which the user’s access to information is not constrained, as
in books, by linear or hierarchical arrangements of discourse.
This obscurity had always seemed strange, since hypertext
has been around for a long time. Its underlying concept—
creating and enacting linkages between stored bits of
information”-https://publishingperspectives.com/2014/02/exprima-talks-reading-hypertext-with-mark-berstein/

READ-SOURCES:
https://newworldwitchery.com/wp-content/uploads/2010/09/the-new-world-witchery-guide-to-cartomancy.pdf
http://twinery.org/2/#/
https://publishingperspectives.com/2014/02/exprima-talks-reading-hypertext-with-mark-berstein/
https://www.newmediareader.com/book_samples/nmr-48-moulthrop.pdf
http://myboyfriendcamebackfromthewar.blogspot.com/
http://www.teleportacia.org/war/wara.htm
https://artbase.rhizome.org/wiki/Q3711
https://evsc.net/
https://courses.ideate.cmu.edu/15-104/f2019/index.html%3Fp=5963.html
https://www.mteww.com/oops/index3.html?like+we+said%2C+this+does+not+do+anything...=this+button+does+not+do+anything#
https://en.wikipedia.org/wiki/Jade_Mirror_of_the_Four_Unknowns
https://en.wikipedia.org/wiki/Chinese_fortune_telling
CODE-SOURCES:
https://pjmcdermott.com/blog/build-a-javascript-card-deck/
https://medium.com/@pakastin/javascript-playing-cards-part-1-ranks-and-values-a9c2368aedbd
https://stackoverflow.com/questions/10858674/a-deck-of-cards
https://nmi.cool/advweb/unit-two-javascript/week-four/exercise-fortune-teller/
https://jsfiddle.net/Lz3fhkyb/
