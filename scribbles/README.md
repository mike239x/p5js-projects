# fonts
In the fonts folder there are variations of
[CMU Font](https://en.wikipedia.org/wiki/Computer_Modern), the font that is
used by LaTeX by default.

# libraries
In the `libs` folder you can see the following javascript libraries:

 - p5.min.js : the main framework for drawing nice pictures. It also has its own
nice [website](https://p5js.org/) with nice [reference page](https://p5js.org/reference/).
Alternatively you can load it through CDN (Content Delivery Network) -- see the commented line.
- p5.dom.min.js : a lib for p5.js for working with DOM elements. Also has its own [webpage](https://p5js.org/reference/#/libraries/p5.dom) and can be attached via CDN.
 - p5.scribble.js : a lib on top of p5.js that allows you to make drawings that look hand-drawn.
 See its [github page](https://github.com/generative-light/p5.scribble.js).
 - geoscribble.js : my selfmade lib for better working experience with drawing dots and lines.
 This one sadly has no documentation as of yet.

# Important notes:
 - a useful command to make your own server is `python -m http.server`
 (just write it in terminal and have your index.html webpage on
 [localhost:8000](http://localhost:8000))
 - it is a good idea to first fill the polygons, then draw the lines and segments,
 only only then draw the dots.
 - if you ever decide to use multiple canvases for drawing: this cannot be done
 the normal way with p5.js, instead, you would have to use its [instance mode](https://p5js.org/examples/instance-mode-instantiation.html).
 - sometimes the picture just doesn't look right for some reasons, which is why
 in the template there is a mouseClicked listener that increases the random seed
 by one and prints it to the console.

# `index.html`
The main thing, there all the the libraries and sketches are loaded.
By default loads `sketching.js`, which allows you to code right on the webpage,
plus it shows some supporting info, which normal sketches don't have.

# examples
A folder with examples. Right now there are none.

# `template.js`
A template for stand-alone sketches.
