import { DAC } from '@laser-dac/core';
import { Helios } from '@laser-dac/helios';
import pkg from '@laser-dac/draw';
var  { Scene, HersheyFont, loadHersheyFont, Rect, Timeline } = pkg;

import * as fs from 'fs';

var  font = loadHersheyFont('fonts/futuram.jhf');

var  pps = 40000; // points per second
var  fps = 120; // doesnt seem to change anything

var repeat = 1;

var intensity = 255;


var idx = 0;
var f_idx = 0;
var token = {};
var token_id = 0;
var owner_name = "frank";

var showToken=true;
var showText=false;

// var showToken=false;
// var showText=true;

var token_files = [];
var scene;
var textAnimation;


fs.readdirSync("./").forEach(file => {
  if (file.includes("token")&&file.includes(".json")) {
    console.log(file);
    token_files.push(file);

  }
});

token = GetJson(token_files[f_idx]);

(async () => {
  var  dac = new DAC();
  var  helios_ = new Helios();
  //helios_.intensity=25;
  dac.use(helios_);
  await dac.start();


  scene = new Scene({
    resolution: 100,
  });

  function renderFrame() {

    if (showToken) {
      renderToken();
    }
    if (showText) {
      renderText();
    }


  }

  scene.start(renderFrame);
  dac.stream(scene,pps,fps);
})();


function renderToken() {
  var points = token[idx].points;
  var points2 = [];

  for (let i = 0; i < points.length; i++) {

    var x2 = (points[i].x+32768)/(32768*2);
    var y2 = (points[i].y+32768)/(32768*2);

    //points2.push({x: x2, y: y2, r: 1, g: 1, b: 0})
    //points2.push({x: x2, y: y2, r: round(points[i].r,2), g: round(points[i].g,2), b: round(points[i].b,2)})
    points2.push({
      x: x2,
      y: y2,
      r: points[i].r,
      g: points[i].g,
      b: points[i].b
    })

  }

  scene.points = points2;

  idx++;
  if (idx>=token.length) {
    idx=0;
    autoSwtich();

  }
}


function renderText() {

  var  rect = new Rect({
    width: .9,
    height: .9,
    x: 0.05,
    y: 0.05,
    color: [0, 1, 0],
  });

  //scene.add(rect);

  scene.add(textAnimation);
}

var loop_cnt = 0;
function autoSwtich() {
  loop_cnt++;
  process.stdout.write('loop nr '+loop_cnt);

  if (loop_cnt>=repeat) {
    loop_cnt=0;

    switchToken(1);

    process.stdout.write('show text');

    showToken=false;
    showText=true;


    setTimeout(function() {
      process.stdout.write('show token');


      showToken=true;
      showText=false;

    }, 6000);
  }
}


function setText(msg) {
  return () =>
    new HersheyFont({
      font,
      text:msg,
      x: 0.15,
      y: 0.4,
      color: [1, 1, 1],
      charWidth: 0.32/msg.length,
    });
}




function switchToken(nav) {
  idx=0;

  f_idx = f_idx+nav;
  if (f_idx>=token_files.length) {
    f_idx=0;
  }
  if (f_idx<0) {
    f_idx=token_files.length-1;
  }
  process.stdout.write('playing '+token_files[f_idx]);
  token = GetJson(token_files[f_idx]);

  var kk = token_files[f_idx].split('.')[0];
  var tt = kk.split('_');
  token_id = tt[1]+"";
  process.stdout.write(token_id);
  var vv = tt.slice(2,999);
  var dd = vv.join(' ');
  owner_name = dd;
  process.stdout.write(owner_name);
  setTextTimeline();
}

function setTextTimeline() {
  textAnimation = new Timeline({
    loop: true,
    items: [

      {
        duration: 2000,
        render: setText('Collection'),
      },
      {
        duration: 2000,
        render: setText(owner_name),
      },
      {
        duration: 2000,
        render: setText('Token '+token_id),
      },
    ],
  });
}

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function(key){

    if (key == '\u001B\u005B\u0043') {
        //process.stdout.write('right');
        switchToken(1);
    }

    if (key == '\u001B\u005B\u0044') {
        //process.stdout.write('left');
        switchToken(-1);

    }

    if (key == '\u0003') { process.exit(); }    // ctrl-c
});

var  round = (n, dp) => {
  var  h = +('1'.padEnd(dp + 1, '0')) // 10 or 100 or 1000 or etc
  return Math.round(n * h) / h
}

function map(X, A, B, C, D) {
  return (X - A) / (B - A) * (D - C) + C;
}



function GetFileEncodingHeader(filePath) {
    var  readStream = fs.openSync(filePath, 'r');
    var  bufferSize = 2;
    var  buffer = new Buffer(bufferSize);
    let readBytes = 0;

    if (readBytes = fs.readSync(readStream, buffer, 0, bufferSize, 0)) {
        return buffer.slice(0, readBytes).toString("hex");
    }

    return "";
}

function ReadFileSyncUtf8(filePath) {
    var  fileEncoding = GetFileEncodingHeader(filePath);
    let content = null;

    if (fileEncoding === "fffe" || fileEncoding === "utf16le") {
        content = fs.readFileSync(filePath, "ucs2"); // utf-16 Little Endian
    } else if (fileEncoding === "feff" || fileEncoding === "utf16be") {
        content = fs.readFileSync(filePath, "uts2").swap16(); // utf-16 Big Endian
    } else {
        content = fs.readFileSync(filePath, "utf8");
    }

    // trim removes the header...but there may be a better way!
    return content.toString("utf8").trimStart();
}

function GetJson(filePath) {
    var  jsonContents = ReadFileSyncUtf8(filePath);
    console.log(GetFileEncodingHeader(filePath));

    return JSON.parse(jsonContents);
}
