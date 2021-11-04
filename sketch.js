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
}

function setup() {
  pixelDensity(3);
  createCanvas(1260, 910);
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
  // old background("#FEE9C1");
  background("#EFE2BA");
  // image(backgroundImg, 0, 0, width, height);

  // drawWater();
  // drawBuildings();
  drawRoads();
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

    stroke(1);
    fill("#A3DAD1");
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
    //old fill("#CFA969");
    fill("#d79922");
    beginShape();

    for (let j = 0; j < coordinates2.length; j++) {
      let coord = coordinates2[j];
      //console.log(coord);
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

    if (properties.name == "Schweizerhofquai") {
      strokeWeight(9);
      stroke("#00ECC2");
    } else if (properties.name == "Pilatusstrasse") {
      strokeWeight(3);
      stroke("#0078FF");
    } else if (properties.name == "Seebrücke") {
      strokeWeight(4);
      stroke("#a29bfe");
    } else if (properties.name == "Pilatusstrasse") {
      strokeWeight(3);
      stroke("#0078FF");
    } else if (properties.name == "Bahnhofplatz") {
      strokeWeight(9);
      stroke("#00cec9");
    } else if (properties.name == "Zürichstrasse") {
      strokeWeight(7);
      stroke("#fd79a8");
    } else if (properties.name == "Obergrundstrasse") {
      strokeWeight(10);
      stroke("#f53b57");
    } else if (properties.name == "Luzernerstrasse") {
      strokeWeight(7);
      stroke("#0fbcf9");
    } else if (properties.name == "Obernauerstrasse") {
      strokeWeight(7);
      stroke("#4bcffa");
    } else if (properties.name == "Baselstrasse") {
      strokeWeight(7);
      stroke("#3c40c6");
    } else if (properties.name == "Gütschstrasse") {
      strokeWeight(5);
      stroke("#575fcf");
    } else if (properties.name == "Zentralstrasse") {
      strokeWeight(7);
      stroke("#485460");
    } else if (properties.name == "Bundesplatz") {
      strokeWeight(7);
      stroke("#808e9b");
    } else if (properties.name == "Tribschenstrasse") {
      strokeWeight(5);
      stroke("#0be881");
    } else if (properties.name == "Geissmattstrasse") {
      strokeWeight(5);
      stroke("#575fcf");
    } else if (properties.name == "Maihofstrasse") {
      strokeWeight(6);
      stroke("#b8e994");
    } else if (properties.name == "Friedentalstrasse") {
      strokeWeight(5);
      stroke("#4a69bd");
    } else if (properties.name == "Spitalstrasse") {
      strokeWeight(4);
      stroke("#60a3bc");
    } else if (properties.highway == "motorway") {
      strokeWeight(7);
      stroke("#eb2f06");
    } else if (properties.name == "Hauptstrasse") {
      strokeWeight(5);
      stroke("#575fcf");
    } else if (
      properties.name == "Neuenkirchstrasse" ||
      properties.name == "Gerliswilstrasse"
    ) {
      strokeWeight(5);
      stroke("#0fbcf9");
    } else if (properties.name == "Rothenburgstrasse") {
      strokeWeight(4);
      stroke("#34e7e4");
    } else if (properties.name == "Haldenstrasse") {
      strokeWeight(4);
      stroke("#3c6382");
    } else if (properties.name == "Spitalstrasse") {
      strokeWeight(4);
      stroke("#60a3bc");
    } else if (properties.name == "Spitalstrasse") {
      strokeWeight(4);
      stroke("#60a3bc");
    } else {
      strokeWeight(1);
      stroke("#053F5C");
    }

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
      // ellipse(x, y, r);
      // ellipse(x, y, r*2);
      // ellipse(x,y,r*3)
      // ellipse(x, y, r*4);
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

    // if (properties.AccidentWeekDay_de == "Freitag") {
    //   fill("#ff4adb")
    //   strokeWeight(0.2)
    // } else if (properties.AccidentYear >= "2017") {
    //   fill("#00d9ff")
    //   strokeWeight(0.2)
    // } else {
    //   stroke(1);
    //   strokeWeight(0.1);
    //   fill("red");
    // }

    // console.log(accidentCoordinates)
    // fill(104, 66, 239); //violett
    // fill("#f13c20"); //rot
    noFill();
    strokeWeight(0.6);
    stroke(255, 100);
    // noStroke();
    // for (let j = 0; j < accidentCoordinates.length; j++) {
    //   let accidentCoord = accidentCoordinates[j];

    let x = map(accidentCoordinates[0], bounds.left, bounds.right, 0, width);
    let y = map(accidentCoordinates[1], bounds.top, bounds.bottom, 0, height);
    // let r = random(0, 10);
    let r = 5;

    //ändern des Design der Tastenkombi
    // if (properties.AccidentWeekDay_de == filter) {
    //   ellipse(x, y, r);
    // }
    ellipse(x, y, r);

    // if (properties.AccidentWeekDay_de == "Sonntag") {
    //   ellipse(x, y, r);
    // }
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

  if (key == "1") {
    filter = "Montag";
  } else if (key == "2") {
    filter = "Dienstag";
  } else if (key == "3") {
    filter = "Mittwoch";
  } else if (key == "4") {
    filter = "Donnerstag";
  } else if (key == "5") {
    filter = "Freitag";
  } else if (key == "6") {
    filter = "Samstag";
  } else if (key == "7") {
    filter = "Sonntag";
  }

  if (key == "d") {
    saveCanvas("accidentMap", "png");
  }

  redraw();
}
