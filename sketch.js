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
  for (let j = 0; j < /*geodata1.features.length*/ 700; j++) {
    let roadsCoordinates = geodata1.features[j].geometry.coordinates;
    let properties = geodata1.features[j].properties;

    if (j % 10 == 0) {
      console.log("calculation street", j);
    }

    fill("#24305e");
    noStroke();
    // noStroke();
    // beginShape();
    for (let k = 0; k < roadsCoordinates.length - 1; k++) {
      let roadsCoord = roadsCoordinates[k];

      let roadsCoord2 = roadsCoordinates[k + 1];

      let ptlat = roadsCoord[1];
      let ptlon = roadsCoord[0];

      let closestAccidents = accidentData.filter(function (d) {
        let dlat = d.geometry.coordinates[1];
        let dlon = d.geometry.coordinates[0];
        let distance = dist(ptlon, ptlat, dlon, dlat);
        //distanz zu unfall von Strassenpunkt
        return distance < 0.0007;
      });

      let x = map(roadsCoord[0], bounds.left, bounds.right, 0, width);
      let y = map(roadsCoord[1], bounds.top, bounds.bottom, 0, height);

      let x2 = map(roadsCoord2[0], bounds.left, bounds.right, 0, width);
      let y2 = map(roadsCoord2[1], bounds.top, bounds.bottom, 0, height);

      // so viele unfälle wie es hat
      let r = closestAccidents.length * 0.25;
      // console.log(r);

      if (r > 15) {
        r = 15;
      }

      // vertex(x, y);
      // ellipse(x, y, r / 2);
      strokeWeight(r);
      stroke(0);
      line(x, y, x2, y2);
      if ((properties.highway = "motorway")) {
        stroke("#E12229");
      }
      // console.log(ptlat, ptlon, x, y);
    }
    // endShape();
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
