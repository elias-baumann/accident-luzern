let geodata1 = []; //roads
let geodata3 = []; //accident

let backgroundImg;

let bounds = {
  //original
  left: 8.20782,
  top: 47.094669,
  right: 8.365691,
  bottom: 47.024504,
};

function preload() {
  geodata1 = loadJSON("data-main/lucerne-roads.geojson");
  geodata3 = loadJSON("data-main/accidentLU.geojson");
}

function setup() {
  pixelDensity(3);
  createCanvas(1260, 910);

  roadsData = geodata1.features;
  accidentData = geodata3.features;

  noLoop();
}

function draw() {
  background("#EEF0F2");

  drawRoads();
  // drawAccident();
}

//roads
function drawRoads() {
  for (let j = 0; j < geodata1.features.length; j++) {
    let roadsCoordinates = geodata1.features[j].geometry.coordinates;
    let properties = geodata1.features[j].properties;

    fill("#24305e");
    noStroke();
    // noStroke();
    beginShape();
    for (let k = 0; k < roadsCoordinates.length; k++) {
      let roadsCoord = roadsCoordinates[k];

      let x = map(roadsCoord[0], bounds.left, bounds.right, 0, width);
      let y = map(roadsCoord[1], bounds.top, bounds.bottom, 0, height);
      let r = 1;
      // vertex(x, y);
      ellipse(x, y, r);
    }
    endShape();
  }
}

//accident
function drawAccident() {
  for (let i = 0; i < geodata3.features.length; i++) {
    let accidentCoordinates = geodata3.features[i].geometry.coordinates;
    let properties = geodata3.features[i].properties;

    fill("#f13c20"); //rot
    strokeWeight(0.6);
    stroke(255);

    let x = map(accidentCoordinates[0], bounds.left, bounds.right, 0, width);
    let y = map(accidentCoordinates[1], bounds.top, bounds.bottom, 0, height);
    let r = 5;

    ellipse(x, y, r);
  }
}

//export

function keyTyped() {
  if (key == "d") {
    saveCanvas("accidentMap", "png");
  }

  redraw();
}
