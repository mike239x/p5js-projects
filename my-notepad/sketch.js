var inp;
var f;
function setup () {
  noCanvas();
  inp = createElement('textarea','');
  inp.attribute('rows','4');
  inp.attribute('cols','50');
  inp.attribute('placeholder','some text');
  inp.style('resize','none');
  //TODO: not working?
  // inp.dragOver(() => inp.attribute('style','background-color:#F00'));
  // inp.dragLeave(() => inp.removeAttribute('style'));
  inp.size(windowWidth-15, windowHeight-15);
  inp.drop(file => {
    // store all the metadata in f
    f = file;
    if (file.type == 'text') {
      inp.value(file.data);
    }
  });
}

function windowResized() {
  inp.size(windowWidth-15, windowHeight-15);
}

function draw() {}

//this thing uses jQuery, AFAIK
$(window).bind('keydown', function(event) {
  if (event.ctrlKey || event.metaKey) {
    switch (String.fromCharCode(event.which).toLowerCase()) {
    case 's':
      event.preventDefault();
      // do your own stuff
      break;
    case 'o':
      event.preventDefault();
      // do your own stuff
      break;
    case 'z':
      event.preventDefault();
      // do your own stuff
      break;
    }
  }
});
