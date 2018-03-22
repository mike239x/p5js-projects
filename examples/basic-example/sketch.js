var myNumber, magic, structure, myDoggy;
var WIDTH = 640, HEIGHT = 480;
var myImage;

class Doggy {
    constructor(x,y) {
        this.x = x;
        this.y = y
    }
    bark() {
        console.log('bark-bark!')
    }
}

function preload() {
    myImage = loadImage('settings-icon.svg');
}

function setup() {
    createCanvas(WIDTH,HEIGHT);
    myNumber = random(0.0,42.0);
    magic = '✧･ﾟ: *✧･ﾟ: MAGIC *:･ﾟ✧*:･ﾟ✧';
    structure = {
        x : 1, y : 2
    };
    myDoggy = new Doggy(1,2);
    alert('Finished setup!');
}

function draw() {
    noStroke();
    fill(255);
    rect(0,0,70,20);
    fill(0)
    text(`${hour()}:${minute()}:${second()}`,2,2,100,30);
    stroke(0);
    fill(250,250,250,10);
    rect(0,0,width-1,height-1)
    // if (mouseIsPressed) {
    //   fill(0);
    // } else {
    //   fill(255);
    // }
    fill(250,250,250,10);
    ellipse(mouseX, mouseY, 80, 80);

    image(myImage,width-48,0,48,48);
}

function mousePressed() {
    background(255);
    console.log(
        map(mouseX,0,width,0.0,1.0),
        map(mouseY,0,height,0.0,1.0)
    )
}
