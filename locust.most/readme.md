# locust.most

### audio-visualiser / keyboard-playable synthesiser

---

## what is this????

a keyboard-playable synthesiser that animates a locust silhouette as a field of horizontal topology lines, a homage to _Unknown Pleasures_ and to the music of Joy Division.
press keys on chosen (computer) device to play notes. the image responds.
hundreds of horizontal white line segments stacked on top of each other, reconstructing in ways topographic maps reconstruct terrain. rows of lines warp and lift, then ease back to rest.
every animation frame, the position of each line is recalculated based on which notes are currently active, how close each row is to that note's assigned vertical region, and the current audio energy measured from a live FFT analysis

---

## locust again?

the image used is a very iconic symbol of mine, existing in previous project "locust.host" a confusing reuse of "local.host"
it is the insect of transformation under duress

## controls

W E T Y U
A S D F G H J K

the layout mirrors a piano keyboard, white keys on the bottom row, black keys on the top

| Key | Note |

| A | C
| W | C#
| S | D
| E | D#
| D | E
| F | F
| T | F#
| G | G
| Y | G#
| H | A
| U | A#
| J | B
| K | C (octave up) |

**Z** — lower the octave  
**X** — raise the octave

up to 8 notes can play simultaneously for chords and layered harmonics...

---

## what is still in progress

This is the hopeful **Past** state of a larger three-part project. The full work opens with a Magic 8-Ball that routes the user to one of three interactive simulations (Past, Present, or Future)depending on what it reveals.

- **WILL BE IN PREVIOUS PROJECT** — the magic 8ball past, present, future teller "The Process of Living"
- **TO BE THE PAST state** — MIDI keyboard playthrough connected through WebMIDI API, user builds custom synth patches from a constrained key set then map as pulsing lines first
- **FURTHERED IN PRESENT state** — then the music user created can be heard here and the visual is reconstructed through the details of each note (octave etc.) played

- **more visuals** — requires more visual detailing like color etc.

## sources

---

**references**

- https://github.com/consumedlocusts/CART263AA/tree/main/visualtester (my own tester processes)
- https://github.com/rfranr/game.midi-jumper
- https://dev.to/ericsonwillians/ive-built-my-own-synthesizer-using-tonejs-and-react-293f
- https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API
- https://tonejs.github.io/docs/15.1.22/index.html
- https://sonicstate.com/news/2025/11/06/coding-music-in-vs-code/
- https://codepen.io/gregh/pen/xqWwqz
- https://www.reddit.com/r/tonejs/comments/tz075h/web_discoveries/
- https://github.com/tambien/UpDown
- https://jazz.computer/
- Cellular noise ("Worley noise") in 3D in GLSL
- https://maxemitchell.com/code_art/unknown_lines
- https://www.vertexshaderart.com/art/8oJh9QtFGgJksSFFk/
- https://github.com/Humprt/particula
- https://github.com/maxemitchell/portfolio/tree/master/src/pages/code_art/unknown_lines
- https://www.youtube.com/watch?v=C4IR44TXbE8
- https://developer.mozilla.org/en-US/docs/Web/API/MIDIMessageEvent
- https://dev.to/rfranr/visualizing-midi-with-threejs-tonejs-and-typescript-267i
- https://github.com/rfranr/game.midi-jumper
- https://dev.to/ericsonwillians/ive-built-my-own-synthesizer-using-tonejs-and-react-293f
- https://github.com/Tonejs/Tone.js/blob/main/examples/simpleHtml.html
- https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API
- https://github.com/Tonejs/Tone.js
- https://threejs.org/docs/#Texture
- https://github.com/redacademy/tonejs-starter
-

- and more in disorganized docs, soon to be added

---

_Time is a flat circle._
