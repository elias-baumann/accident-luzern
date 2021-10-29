let geodata = []; //buildings
let geodata1 = []; //roads
let geodata2 = []; //water
let geodata3 = []; //accident
let geodata4 = []; //bank

let currentYear;
let record = true;

let backgroundImg;

let bounds = {
  //original
  left: 8.20782,
  top: 47.094669,
  right: 8.365691,
  bottom: 47.024504,

  //verzogen
  // left:  8.284340,
  // top: 47.064680,
  // right: 8.331018,
  // bottom: 47.031380,
};

let filter = "Montag";

function preload() {
  geodata = loadJSON("data-main/lucerne-buildings.geojson");
  geodata1 = loadJSON("data-main/lucerne-roads.geojson");
  geodata2 = loadJSON("lucerne-water.geojson");
  geodata3 = loadJSON("data-main/accidentLU.geojson");
  geodata4 = loadJSON("data-main/SITZBANK_SITZBANK.json");

  // backgroundImg = loadImage("bg.png"); // Foto mit allen Daten
  // backgroundImg = loadImage("original2.0.png"); //original Foto ohne Accident Daten
  backgroundImg = loadImage("bgAnimation.png");
}

function setup() {
  pixelDensity(3);
  createCanvas(1260, 910);
  // createCanvas(2700, 1950);
  // createCanvas(4050, 2925);

  buildingsData = geodata.features;
  roadsData = geodata1.features;
  waterData = geodata2.features;
  accidentData = geodata3.features;
  bankData = geodata4.features;

  accidentData = geodata3.features;
  console.log(accidentData.length);
  // accidentData = accidentData.filter(function (d) {
  //   return d.properties.AccidentYear != null;
  // });

  // accidentData = accidentData.filter(function (d) {
  //   return d.properties.AccidentYear > 1000;
  // });

  // console.log(accidentData.length);

  let startYear = d3.min(accidentData, function (d) {
    return +d.properties.AccidentYear;
  });

  currentYear = startYear;

  console.log(startYear);

  frameRate(1);
}

function draw() {
  image(backgroundImg, 0, 0, width, height);
  // background("#6842EF");

  // drawWater();
  // drawBuildings();
  // drawRoads();
  // drawAccident();
  drawAccidentAnimation();
  // drawBank();
  drawText();

  if (currentYear < 2021) {
    currentYear += 0.25;
  }

  if (record) {
    //trees-00001.png
    //trees-00002.png
    let fileName = "acciddents-" + nf(frameCount, 5);
    saveCanvas(fileName, "png");
  }
}

//water
function drawWater() {
  for (let i = 0; i < waterData.length; i++) {
    let waterObject = waterData[i];
    let geometry = waterObject.geometry;
    let coordinates = geometry.coordinates[0];
    let coordinates2 = coordinates[0];

    stroke(1);
    fill(163, 218, 209, 90);
    beginShape();

    for (let l = 0; l < coordinates2.length; l++) {
      let coord = coordinates2[l];
      // console.log(coord);
      let x = map(coord[0], bounds.left, bounds.right, 0, width);
      let y = map(coord[1], bounds.top, bounds.bottom, 0, height);
      let r = random(0, 10);
      vertex(x, y);
    }
    endShape();
  }
}

// buildings

function drawBuildings() {
  for (let i = 0; i < buildingsData.length; i++) {
    let buildingsObject = buildingsData[i];
    let geometry = buildingsObject.geometry;
    let coordinates = geometry.coordinates[0];
    let coordinates2 = coordinates[0];

    // stroke(0);
    noStroke();
    fill("#472ea3");
    beginShape();

    for (let j = 0; j < coordinates2.length; j++) {
      let coord = coordinates2[j];
      let x = map(coord[0], bounds.left, bounds.right, 0, width);
      let y = map(coord[1], bounds.top, bounds.bottom, 0, height);
      let r = random(0, 10);
      vertex(x, y);
      //ellipse(x,y,r,r);
    }
    endShape();
  }
}

//roads
function drawRoads() {
  for (let j = 0; j < geodata1.features.length; j++) {
    let roadsCoordinates = geodata1.features[j].geometry.coordinates;
    let properties = geodata1.features[j].properties;

    if (properties.highway == "motorway") {
      strokeWeight(3);
    } else {
      strokeWeight(1.5);
    }
    stroke(42, 204, 200, 90);
    noFill();

    beginShape();
    for (let k = 0; k < roadsCoordinates.length; k++) {
      let roadsCoord = roadsCoordinates[k];
      let x = map(roadsCoord[0], bounds.left, bounds.right, 0, width);
      let y = map(roadsCoord[1], bounds.top, bounds.bottom, 0, height);

      vertex(x, y);
    }
    endShape();
  }
}

//accident
function drawAccident() {
  for (let i = 0; i < geodata3.features.length; i++) {
    //geodata3.features.length
    let accidentCoordinates = geodata3.features[i].geometry.coordinates;
    let properties = geodata3.features[i].properties;

    fill("#FFD804"); //rot
    strokeWeight(0.6);
    stroke(0);

    let x = map(accidentCoordinates[0], bounds.left, bounds.right, 0, width);
    let y = map(accidentCoordinates[1], bounds.top, bounds.bottom, 0, height);
    // let r = random(0, 10);
    let r = 5.5;
    ellipse(x, y, r);
  }
}

function drawAccidentAnimation() {
  console.log("drawAccidentAnimation");
  for (let i = 0; i < accidentData.length; i++) {
    // console.log(i);
    let accidentObject = accidentData[i];
    console.log(accidentObject);

    if (accidentObject.properties.AccidentYear < currentYear) {
      let coordinates = accidentObject.geometry.coordinates;
      let lat = coordinates[1];
      let lon = coordinates[0];

      let x = map(lon, bounds.left, bounds.right, 0, width);
      let y = map(lat, bounds.top, bounds.bottom, 0, height);

      // let age = currentYear - accidentObject.properties.AccidentYear;

      let r = 7;

      fill("#FFD804"); //rot
      strokeWeight(0.6);
      stroke(0);

      ellipse(x, y, r, r);
    }
  }
}

//bank
function drawBank() {
  for (let i = 0; i < geodata4.features.length; i++) {
    let bankCoordinates = geodata4.features[i].geometry.coordinates;
    let properties = geodata3.features[i].properties;

    for (let j = 0; j < bankCoordinates.length; j++) {
      let bankCoord = bankCoordinates[j];

      fill("green");

      let x = map(bankCoordinates[0], bounds.left, bounds.right, 0, width);
      let y = map(bankCoordinates[1], bounds.top, bounds.bottom, 0, height);
      let r = 1;

      ellipse(x, y, r);
    }
  }
}

//text
function drawText() {
  let x = 100;
  let y = 100;

  noStroke();
  fill("#FFD804");
  text(currentYear, x / 2, y / 2);
}

//export

function keyTyped() {
  // console.log("saving...");
  // saveCanvas("p5map", "png");

  if (key == "d") {
    saveCanvas("accidentMap", "png");
  }

  redraw();
}
