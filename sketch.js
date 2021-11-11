let geodata = []; //buildings
let geodata1 = []; //roads
let geodata2 = []; //water
let geodata3 = []; //accident
let geodata4 = []; //bank

let backgroundImg;

let bounds = {
  //original
  left: 8.20782,
  top: 47.094669,
  right: 8.365691,
  bottom: 47.024504,
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
}

function setup() {
  pixelDensity(3);
  createCanvas(1260, 910, SVG);
  // createCanvas(2700, 1950);
  // createCanvas(4050, 2925);

  //console.log(geodata);

  buildingsData = geodata.features;
  roadsData = geodata1.features;
  waterData = geodata2.features;
  accidentData = geodata3.features;
  bankData = geodata4.features;

  noLoop();
}

function draw() {
  clear();

  // old background("#FEE9C1");
  // background("#0B4F6C"); //v1
  // background("#f4f7c9"); //v2
  // background("#372C35"); //v3
  // background("#DFD8D0"); //v4
  // background("#AEAEB0"); //v5
  // background("#255F85"); //v6
  // background("#02314D"); //v7
  // background("#EEF0F2"); //v8
  // background("#EEF0F2"); //v9

  // image(backgroundImg, 0, 0, width, height);

  // drawWater();
  // drawBuildings();
  // drawRoads();
  drawAccident();
  // drawBank();
  // drawText();
}

//water
function drawWater() {
  for (let i = 0; i < waterData.length; i++) {
    let waterObject = waterData[i];
    let geometry = waterObject.geometry;
    let coordinates = geometry.coordinates[0];
    let coordinates2 = coordinates[0];

    noStroke();
    // stroke(1);
    // fill("#CACFD6"); //v1
    // fill("#7BAD8E"); //v2
    // fill("#C2C7BE"); //v3
    fill("#EEF0F2"); //v3
    beginShape();

    for (let l = 0; l < coordinates2.length; l++) {
      let coord = coordinates2[l];
      // console.log(coord);
      let x = map(coord[0], bounds.left, bounds.right, 0, width);
      let y = map(coord[1], bounds.top, bounds.bottom, 0, height);
      let r = random(0, 10);
      vertex(x, y);
      //ellipse(x,y,r,r);
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
    // fill("#040F16"); //v1
    // fill("#7BAD8E"); //v2
    // fill("#615578"); //v3
    // fill("#A48C88"); //v4
    // fill("#D8EBF1"); //v5
    // fill("#FFC857"); //v6
    // fill("#CBCACF"); //v7
    // fill("#011638"); //v8
    fill("#4E5CA0"); //v9

    beginShape();

    for (let j = 0; j < coordinates2.length; j++) {
      let coord = coordinates2[j];
      //console.log(coord);
      let x = map(coord[0], bounds.left, bounds.right, 0, width);
      let y = map(coord[1], bounds.top, bounds.bottom, 0, height);
      let r = random(0, 10);
      vertex(x, y);
    }
    endShape();
  }
}

//roads
function drawRoads() {
  for (let j = 0; j < geodata1.features.length; j++) {
    let roadsCoordinates = geodata1.features[j].geometry.coordinates;
    let properties = geodata1.features[j].properties;

    // if (properties.highway == "motorway") {
    //   strokeWeight(3);
    // } else {
    //   strokeWeight(1);
    // }

    // stroke(251, 251, 255, 90); //v1
    // stroke("#7BAD8E"); //v2
    // stroke("#615578"); //v3
    // stroke("#6A5D54"); //v4
    // stroke("#807875"); //v5
    // stroke("#FFC857"); //v6
    // stroke("#CBCACF"); //v7
    // stroke("#0D21A1"); //v8
    stroke("#4E5CA0"); //v9
    noFill();
    // fill('rgba(255, 213, 0, 0.1)');
    // noStroke();
    beginShape();
    for (let k = 0; k < roadsCoordinates.length; k++) {
      let roadsCoord = roadsCoordinates[k];
      //console.log(coord);
      let x = map(roadsCoord[0], bounds.left, bounds.right, 0, width);
      let y = map(roadsCoord[1], bounds.top, bounds.bottom, 0, height);
      // let r = random(0, 10);
      // let r = 3;
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

    // fill("#01BAEF"); //v1
    // fill("#C1454D"); //v2
    // fill("#F0CA52"); //v3
    // fill("#E50914"); //v4
    // fill("#FFBB1C"); //v7
    // fill("#C1272D"); //v8
    noFill();
    strokeWeight(0.5);
    stroke(252, 34, 41, 150);

    let x = map(accidentCoordinates[0], bounds.left, bounds.right, 0, width);
    let y = map(accidentCoordinates[1], bounds.top, bounds.bottom, 0, height);
    // let r = random(0, 10);
    let r = 5;
    ellipse(x, y, r);

    //ändern des Design der Tastenkombi
    // if (properties.AccidentWeekDay_de == filter) {
    //   ellipse(x, y, r);
    // }
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

  fill(0, 0, 0, 40);
  noStroke();
  rect(x, y, 200, 500, 10);
  textSize(25);
  noStroke();
  fill("Black");
  text("Klicke:", x + 20, y + 40);

  textSize(20);
  text(
    "1 für Montag" +
      "\n" +
      "\n" +
      "2 für Dienstag" +
      "\n" +
      "\n" +
      "3 für Mittwoch" +
      "\n" +
      "\n" +
      "4 für Donnerstag" +
      "\n" +
      "\n" +
      "5 für Freitag" +
      "\n" +
      "\n" +
      "6 für Samstag" +
      "\n" +
      "\n" +
      "7 für Sonntag",
    x + 20,
    y + 80
  );
}

//export

function keyTyped() {
  // console.log("saving...");
  // saveCanvas("p5map", "png");

  // if (key == "1") {
  //   filter = "Montag";
  // } else if (key == "2") {
  //   filter = "Dienstag";
  // } else if (key == "3") {
  //   filter = "Mittwoch";
  // } else if (key == "4") {
  //   filter = "Donnerstag";
  // } else if (key == "5") {
  //   filter = "Freitag";
  // } else if (key == "6") {
  //   filter = "Samstag";
  // } else if (key == "7") {
  //   filter = "Sonntag";
  // }

  if (key == "d") {
    // saveCanvas("accidentMap", "png");
    save("trees.svg");
  }

  redraw();
}
