/************************************************************************************
                            SIMPLE JAVASCRIPT GAME LIBRARY

The purpose of this file is provide an assortment of tools to aid in the development
of javascript game projects.  The p5.js library is required as many of the objects,
classes, and functions require this library to work. It can be found at:
https://p5.js.org

Version Dates
06 Dec 2019 (1.0.0) : Finalized
17 Dec 2019 (1.0.1) : optDestObj added to Sprite.draw()
		      added isColorEqual()
19 Dec 2019 (1.0.2) : Added fromIndex() to Color object
28 Dec 2019 (1.0.3) : Added doesContain() to Rect()
07 Jan 2020 (1.0.4) : Removed Canvas()
12 Jan 2020 (1.1.0) : Added Control class,
                      Removed Shape class,
                      Renamed Rect class to Rectangle
                      Readjusted inherited Shape classes -
                      (Rectangle, Ellipse, Circle) to Control
                      Removed fillStroke(); added -
                      getFill(), setFill(), getStroke(), setStroke()
26 Jan 2020 (1.1.1) : Fixed error in findPath()
20 Mar 2020 (1.1.2) : Added DebugList class
26 Mar 2020 (1.1.3) : Added Timer class, 
                      Added setColors(), restoreColors() functions
29 Mar 2020 (1.1.4) : Updated findPath() to return null instead of an 
                      empty array if no path is found
21 Jun 2020 (1.1.5) : Added disableMouseRightClick()
22 Jun 2020 (1.1.6) : Added increment()
03 Jul 2020 (2.0.0) : Adapted from previous version
************************************************************************************
P5 Events List (requires p5.js)

function preload(){}
function setup(){}
function draw(){}

function keyPressed(){}
function keyReleased(){}
function keyTyped(){}

function mouseMoved(){}
function mouseDragged(){}
function mousePressed(){}
function mouseReleased(){}
function mouseClicked(){}
function doubleClicked(){}
function mouseWheel(){}

P5 Global Variables List

 if mouseButton == LEFT
 mouseIsPressed
 mouseX
 mouseY

 keyCode
 key
 keyIsPressed
 if keyIsDown(LEFT_ARROW)
************************************************************************************
REFERENCE:

INDEPENDENT FUNCTIONS:
  disableMouseRightClick()
  isColorEqual(clr, clr)
  increment(v1, v2, distance)
  chance(percentage)
  generateNoise(columns, rows, increment)



************************************************************************************/

"use strict";
function err(msg) { console.error(msg); }
function log(msg) { console.log(msg); }

function Graphic(w,h) { return createGraphics(w,h); }
function Vector(x,y) { return createVector(x,y); }

function disableMouseRightClick() {
  document.addEventListener("contextmenu", function(e){
     e.preventDefault();
  }, false);
}

function isColorEqual(clr1, clr2) {
  return ((red(clr1) == red(clr2)) &&
          (green(clr1) == green(clr2)) &&
          (blue(clr1) == blue(clr2)) &&
          (alpha(clr1) == alpha(clr2)));
}

//Increments along a line between two 
//vectors (v1/v2) a specified distance (dst)
function increment(v1, v2, dst) {
  let d = dist(v1.x, v1.y, v2.x, v2.y);
  let t = dst/d;
  if (t < 0) return v1;
  if (t > 1) return v2;
  let x = ((1 - t) * v1.x) + (t * v2.x);
  let y = ((1 - t) * v1.y) + (t * v2.y);
  return new Vector(x, y);
}

function chance(perc) {
  //Returns true if percentage chance randomly occurs
  if (perc >= 100) return true;
  if (perc <= 0) return false;
  var c = random(100) + 1;
  return (c <= perc);
}

//Returns an array of perlin noise values
//Ranges between 0.0 and 1.0
function generateNoise(columns, rows, incr = 0.2) {
  var n = [];
  var rOff, cOff;

  rOff = 0;
  for (var r = 0; r < rows; r++) {
    cOff = 0;
    for (var c = 0; c < columns; c++) {
      n.push(noise(cOff, rOff));
      cOff += incr;
    }
    rOff += incr;
  }
  return n;
}


let Direction = {
  Invalid: -1,
  North: 0,
  East : 1,
  South : 2,
  West : 3,
  NorthEast: 4,
  SouthEast: 5,
  SouthWest: 6,
  NorthWest: 7,
  Left : 8,
  Right : 9,
};

let Color = {
  Red: "#FF0000",
  Maroon: "#800000",
  Crimson: "#DC143C",
  Salmon: "#FA8072",
  Pink: "#FFC0CB",
  HotPink: "#FF1493",
  Orange: "#FFA500",
  DarkOrange: "#FF8C00",
  Gold: "#FFD700",
  Yellow: "#FFFF00",
  LightYellow: "#FFFFE0",
  Manilla: "#FFE4B5",
  Khaki: "#F0E68C",
  Lavender: "#E6E6FA",
  Violet: "#EE82EE",
  Magenta: "#FF00FF",
  DarkMagenta: "#8B008B",
  Purple: "#800080",
  Lime: "#00FF00",
  SeaGreen: "#2E8B57",
  Green: "#00FF00",
  DarkGreen: "#006400",
  Olive: "#808000",
  Teal: "#008080",
  Aqua: "#00FFFF",
  Cyan: "#00FFFF",
  LightCyan: "#E0FFFF",
  Turquoise: "#40E0D0",
  LightBlue: "#ADD8E6",
  SkyBlue: "#87CEEB",
  Blue: "#0000FF",
  DarkBlue: "#00008B",
  Navy: "#000080",
  Bisque: "#FFE4C4",
  Wheat: "#F5DEB2",
  Tan: "#D2B48C",
  Snow: "#FFFAFA",
  MintCream: "#F5FFFA",
  Seashell: "#FFF5EE",
  Ivory: "#FFFFF0",
  Gray: "#808080",
  LightGray: "#D3D3D3",
  DarkGray: "#505050",
  White: "#FFFFFF",
  Black: "#000000",
  Brown: "#654321",

  fromIndex: function(index) {
    let clr = null;
    switch (index) {
      case (0): clr = Color.Red; break;
      case (1): clr = Color.Maroon; break;
      case (2): clr = Color.Crimson; break;
      case (3): clr = Color.Salmon; break;
      case (4): clr = Color.Pink; break;
      case (5): clr = Color.HotPink; break;
      case (6): clr = Color.Orange; break;
      case (7): clr = Color.DarkOrange; break;
      case (8): clr = Color.Gold; break;
      case (9): clr = Color.Yellow; break;
      case (10): clr = Color.LightYellow; break;
      case (11): clr = Color.Manilla; break;
      case (12): clr = Color.Khaki; break;
      case (13): clr = Color.Lavender; break;
      case (14): clr = Color.Violet; break;
      case (15): clr = Color.Magenta; break;
      case (16): clr = Color.DarkMagenta; break;
      case (17): clr = Color.Purple; break;
      case (18): clr = Color.Lime; break;
      case (19): clr = Color.SeaGreen; break;
      case (20): clr = Color.Green; break;
      case (21): clr = Color.DarkGreen; break;
      case (22): clr = Color.Olive; break;
      case (23): clr = Color.Teal; break;
      case (24): clr = Color.Aqua; break;
      case (25): clr = Color.Cyan; break;
      case (26): clr = Color.LightCyan; break;
      case (27): clr = Color.Turquoise; break;
      case (28): clr = Color.LightBlue; break;
      case (29): clr = Color.SkyBlue; break;
      case (30): clr = Color.Blue; break;
      case (31): clr = Color.DarkBlue; break;
      case (32): clr = Color.Navy; break;
      case (33): clr = Color.Bisque; break;
      case (34): clr = Color.Wheat; break;
      case (35): clr = Color.Tan; break;
      case (36): clr = Color.Snow; break;
      case (37): clr = Color.MintCream; break;
      case (38): clr = Color.Seashell; break;
      case (39): clr = Color.Ivory; break;
      case (40): clr = Color.Gray; break;
      case (41): clr = Color.LightGray; break;
      case (42): clr = Color.DarkGray; break;
      case (43): clr = Color.White; break;
      case (44): clr = Color.Black; break;
      case (45): clr = Color.Brown; break;
      default: clr = Color.Black; break;
    }
    return clr;
  },

  random: function() {
    let r = floor(random(256));
    let g = floor(random(256));
    let b = floor(random(256));
    return color(r, g, b);
  }
};


