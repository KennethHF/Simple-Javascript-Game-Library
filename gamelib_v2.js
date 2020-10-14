/************************************************************************************
                            SIMPLE JAVASCRIPT GAME LIBRARY

The purpose of this file is provide an assortment of tools to aid in the development
of javascript game projects.  The p5.js library is required as many of the objects,
classes, and functions require this library to work. It can be found at:
https://p5.js.org

Version Dates:
29 Sep 2020 (2.0.0) : Finalized from previous version

File Summary:

-P5 Wrappers
  Graphic(w,h)
  Vector(x,y)

-Independent Functions
  disableMouseRightClick()
  disableCanvasDragDrop()
  increment(x1, y1, x2, y2, dst)
  chance(perc)
  format(num)

-Objects
  Color:
    Color.<Clr>
    Color.fromIndex(i)
    Color.random()
  Mouse:
    Mouse.x
    Mouse.y
    Mouse.update() - called in draw()
    Mouse.isPressed()
    Mouse.isReleased()
    Mouse.isHeld()

-P5 Required Independent Functions
  isColorEqual(clr1, clr2)
  makeTransparent(imgObj, replaceClr)
  generateNoise(cols, rws, incr = 0.2)
  drawDashLine(x1,y1, x2,y2, segmentLen, optDest)

-Classes
  Timer(callFunc, milliPerTick)
    start()
    stop()
    isStopped()
    reset()
    ticks()
  Graph()
    addNodes(...args)
    addEdges(n, ...allEdges)
    getEdges(n)
    isEdge(n1, n2)
    isNode(n)
    toString()
  Hash(optKeyArray)
    get(key)
    set(key, val)
    getValue(key)
    size()
    clear()
    toString()
  Rectangle(x, y, w, h)
    width()
    height()
    at()
    move(x, y)
    resize(w, h)
    collides(rect2)
    contains(x, y)
    draw(optGraphic)
  Surface(w, h) : Rectangle(0, 0, w, h)
    graphic() Returns graphic Object
    show()
    hide()
    isVisible()
    fill(clr)
    stroke(clr)
    background(clr)
    noFill()
    noStroke()
    clear()
    image(img, x, y)
    draw(optGraphic)
    isMouseOver()




  Circle
  Sprite
  HexGrid
  Grid
  pathfinder?


************************************************************************************
P5 References:

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

 if mouseButton == LEFT
 mouseIsPressed
 mouseX
 mouseY

 keyCode
 key
 keyIsPressed
 if keyIsDown(LEFT_ARROW)

************************************************************************************/

"use strict";

//P5 WRAPPERS ***********************************************************************


function Graphic(w, h) { return createGraphics(w,h); }
function Vector(x, y) { return createVector(x, y); }


//***********************************************************************************
//INDEPENDENT FUNCTIONS (NOT DEPENDENT ON P5 LIBRARY) *******************************


function disableMouseRightClick() {
  document.addEventListener("contextmenu", function(e){
     e.preventDefault();
  }, false);
}
function disableRightClick() { disableMouseRightClick(); }


function disableCanvasDragDrop() {
  document.body.setAttribute("ondragstart", "return false;");
  document.body.setAttribute("ondrop", "return false;");
}


function increment(x1, y1, x2, y2, dst) {
  let d = Math.sqrt( ((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)) );
  let t = dst/d;
  if (t < 0) return {x:x1, y:y1};
  if (t > 1) return {x:x2, y:y2};
  let nX = ((1-t) * x1) + (t * x2);
  let nY = ((1-t) * y1) + (t * y2);
  return {x:nX, y:nY};
}


function chance(perc) {
  if (perc >= 100) return true;
  if (perc <= 0) return false;
  let c = Math.floor(Math.random() * 100) + 1;
  return (c <= perc);
}


function format(num) {
 //Parameter Example: 34421; Returns: "34,421"
 return String(num).replace(/(.)(?=(\d{3})+$)/g,'$1,');
}


//***********************************************************************************
//COLOR *****************************************************************************


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


const MOUSE_STATE_INACTIVE = 0;
const MOUSE_STATE_PRESS  = 1;
const MOUSE_STATE_HELD = 2;
const MOUSE_STATE_RELEASE = 3;

let Mouse = {
  x : 0,
  y : 0,
  state : MOUSE_STATE_INACTIVE,
  
  isPressed : function() { return this.state == MOUSE_STATE_PRESS; },
  isReleased : function() { return this.state == MOUSE_STATE_RELEASE; },
  isHeld : function() { return this.state == MOUSE_STATE_HELD; },

  update : function() {
    this.x = mouseX;
    this.y = mouseY;

    if (mouseIsPressed && this.state == MOUSE_STATE_PRESS)
      this.state = MOUSE_STATE_HELD;

    if (mouseIsPressed && this.state == MOUSE_STATE_INACTIVE)
      this.state = MOUSE_STATE_PRESS;

    if (!mouseIsPressed && this.state == MOUSE_STATE_RELEASE)
      this.state = MOUSE_STATE_INACTIVE;

    if (!mouseIsPressed && this.state == MOUSE_STATE_HELD)
      this.state = MOUSE_STATE_RELEASE;
  },

  toString : function(isStateStr) {
    if (isStateStr == true) {
      if (this.isPressed()) return "Pressed";
      if (this.isReleased()) return "Released";
      if (this.isHeld()) return "Held";
      return "Inactive";
    }
    return (this.x + ", " + this.y);
  }
};


//***********************************************************************************
//P5 REQUIRED INDEPENDENT FUNCTIONS *************************************************


function isColorEqual(clr1, clr2) {
  return ((red(clr1) == red(clr2)) &&
          (green(clr1) == green(clr2)) &&
          (blue(clr1) == blue(clr2)) &&
          (alpha(clr1) == alpha(clr2)));
}


function makeTransparent(imgObj, replaceClr) {
 //Changes the parameter color of the parameter image transparent
 imgObj.loadPixels();
 for (let x = 0; x < imgObj.width; x++) {
   for (let y = 0; y < imgObj.height; y++) {
     let tmpClr = imgObj.get(x, y);
     if (isColorEqual(tmpClr, replaceClr)) imgObj.set(x, y, color(0,0));
   }
 }
 imgObj.updatePixels();
}


function generateNoise(columns, rows, incr = 0.2) {
  //Returns an array of perlin noise values
  //Ranges between 0.0 and 1.0
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


function drawDashLine(x1,y1, x2,y2, segmentLen, optDest) {
  if (segmentLen == null) segmentLen = dist(x1,y1, x2,y2);
  if (segmentLen <= 0) return;

  let v1 = {x:x1, y:y1};
  let v2 = {x:x2, y:y2};
  let thisPoint = v1;
  let nextPoint = 0;
  let dashCount = dist(v1.x,v1.y, v2.x,v2.y) / segmentLen;
  
  for (let i = 0; i < dashCount; i++) {
    nextPoint = increment(thisPoint.x, thisPoint.y, v2.x, v2.y, segmentLen);
    if (i % 2 == 0) {
      if (segmentLen > 1) {
        if (optDest == null) line(thisPoint.x, thisPoint.y, nextPoint.x, nextPoint.y);
        if (optDest != null) optDest.line(thisPoint.x, thisPoint.y, nextPoint.x, nextPoint.y);
      }
      if (segmentLen == 1) {
        if (optDest == null) point(thisPoint.x, thisPoint.y);
	if (optDest != null) optDest.point(thisPoint.x, thisPoint.y);
      }
    }
    thisPoint = nextPoint;
  }

  if (optDest == null) point(v2.x, v2.y);
  if (optDest != null) optDest.point(v2.x, v2.y);
}


//***********************************************************************************
//CLASSES ***************************************************************************


class Timer {
  constructor(callFunction, millisecondsPerTick) {
    this.tickRate = (millisecondsPerTick == null ? 500 : millisecondsPerTick);
    this.funct = (callFunction == null ? this.emptyLoop : callFunction);
    this.counter = 0;
    this.clock = null;
    this.paused = true;
  }

  ticks() { return this.counter; }
  reset() { this.counter = 0; }
  
  start() {
    this.clock = window.setInterval(this.tLoop.bind(this), this.tickRate);
    this.paused = false;
  }

  stop() {
    window.clearInterval(this.clock);
    this.paused = true;
  }

  isStopped() { return this.paused; }

  tLoop() { 
    this.counter++; 
    this.funct(); 
  }
  
  emptyLoop(){};
}


class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
    this._n = 0;
  }

  addNodes(...args) {
    for (let a of args)
      this.nodes.push(a);
  }

  addEdges(n, ...allEdges) {
    if (!this.isNode(n)) return;
    for (let e of allEdges) {
      if (!this.isEdge(n, e)) this.edges.push({n, e});
    }
  }

  getEdges(n) {
    let nodeEdges = [];
    for (let edge of this.edges) {
      if (edge.n == n && edge.e != n) nodeEdges.push(edge.e);
      if (edge.e == n && edge.n != n) nodeEdges.push(edge.n);
    }
    return nodeEdges;
  }

  isEdge(n1, n2) {
    if (n1 == n2) return false;
    for (let edge of this.edges)
      if ((edge.n == n1 && edge.e == n2) || (edge.n == n2 && edge.e == n1)) return true;
    return false;
  }

  isNode(n1) {
    for (let n of this.nodes)
      if (n == n1) return true;
    return false; 
  }

  [Symbol.iterator]() { 
    var itor = -1;

    return {
      next: () => ({ value:this.nodes[++itor], done: !(itor in this.nodes) })
    };
  }

  next() {
    if (this._n < this.nodes.length) {
      this._n++;
      return {done:false, value:this.nodes[this._n]};   
    } else {
      this._n = 0;
      return {done:true};
    }
  }

  toString() {
    let str = "";
    for (let n of this) {
      let edges = this.getEdges(n);
      if (edges.length == 0) edges = "no edges";
      str += n + " => " + edges + "\n";
    }
    return str;
  }

}


class Hash {
  constructor(optKeyArray) {
    this.list = [];
    if (optKeyArray == null) return;
    for (let keyAttr of optKeyArray)
      this.list.push({key:keyAttr, value:null});
  }

  get(key) {
    for (let data of this.list)
      if (data.key.toUpperCase() == key.toUpperCase()) return data;
  }

  set(key, val) {
    for (let data of this.list) {
      if (data.key.toUpperCase() == key.toUpperCase()) {
        data.value = val;
        return;
      }
    }
    this.list.push({key:key, value:val});
  }

  getValue(key) {
    for (let data of this.list)
      if (data.key.toUpperCase() == key.toUpperCase()) return data.value;
  }

  size() { return this.list.length; }
  clear() { this.list = []; }

  toString() {
    let str = "";
    let count = 0;
    for (let data of this.list) {
      str += "[" + count + "] Key: " + data.key + ", Value: " + data.value + "\n";
      count++;
    }
    return str;
  }
}


class Rectangle {
  constructor(x, y, w, h) {
    this.move(x, y);
    this.resize(w, h);
  }

  width() { return this._width; }
  height() { return this._height; }
  at() { return new Vector(this.x, this.y); }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  resize(w, h) {
    this._width = w;
    this._height = h;
  }

  collides(rect2) {
    if (this.at().y > (rect2.at().y + rect2.height())) return false;
    if ((this.at().y + this.height()) < rect2.at().y) return false;
    if ((this.at().x > rect2.at().x + rect2.width())) return false;
    if ((this.at().x + this.width()) < rect2.at().x) return false;
    return true;
  }

  contains(x, y) {
    let r = new Rectangle(x, y, 1, 1);
    return this.collides(r);
  }

  draw(optGraphic) {
    if (optGraphic == null) {
      rect(this.x, this.y, this._width, this._height);
    } else {
      optGraphic.rect(this.x, this.y, this._width, this._height);
    }
  }
}


class Surface extends Rectangle {
  constructor(w, h) {
    super(0, 0, w, h);
    this.gfx = new Graphic(w, h);
    this.visible = true;
  }

  show() { this.visible = true; }
  hide() { this.visible = false; }
  isVisible() { return this.visible; }
  graphic() { return this.gfx; }

  //GRAPHIC FUNCTIONS
  fill(clr) { this.gfx.fill(clr); }
  stroke(clr) { this.gfx.stroke(clr); }
  noFill() { this.gfx.noFill(); }
  noStroke() { this.gfx.noStroke(); }
  image(img, x, y) { this.gfx.image(img, x, y); }
  background(clr) { this.gfx.background(clr); }
  clear() { this.gfx.clear(); }
  rect(x, y, w, h) { this.gfx.rect(x, y, w, h); }

  isMouseOver() { return this.contains(mouseX, mouseY); }

  draw(optGraphic) {
   if (!this.isVisible()) return;
    if (optGraphic == null) {
      image(this.gfx, this.x, this.y);
    } else {
      optGraphic.image(this.gfx, this.x, this.y);
    }
  }
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
