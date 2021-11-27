import { DAC } from '@laser-dac/core';
import { Helios } from '@laser-dac/helios';
import pkg from '@laser-dac/draw';
const { Scene } = pkg;

import * as fs from 'fs';


const pps = 30000; // points per second
const fps = 120; // doesnt seem to change anything

var intensity = 1;
var intensity2 = .1;

var idx = 0;
var f_idx = 0;
var token = {};

var token_files = [];

fs.readdirSync("./").forEach(file => {
  if (file.includes("token")&&file.includes(".json")) {
    console.log(file);
    token_files.push(file);

  }
});

token = GetJson(token_files[f_idx]);

(async () => {
  const dac = new DAC();
  dac.use(new Helios());
  await dac.start();


  const scene = new Scene({
    resolution: 100,
  });

  function renderFrame() {

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
        r: points[i].r*intensity,
        g: points[i].g*intensity,
        b: points[i].b*intensity,
        i:intensity2,
      })

    }

    scene.points = points2;

    idx++;
    if (idx>=token.length) {
      idx=0;
    }
  }

  scene.start(renderFrame);
  dac.stream(scene,pps,fps);
})();


function switchToken(nav) {
  f_idx = f_idx+nav;
  if (f_idx>=token_files.length) {
    f_idx=0;
  }
  if (f_idx<0) {
    f_idx=token_files.length-1;
  }
  process.stdout.write('playing '+token_files[f_idx]);
  token = GetJson(token_files[f_idx]);
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

const round = (n, dp) => {
  const h = +('1'.padEnd(dp + 1, '0')) // 10 or 100 or 1000 or etc
  return Math.round(n * h) / h
}

function map(X, A, B, C, D) {
  return (X - A) / (B - A) * (D - C) + C;
}



function GetFileEncodingHeader(filePath) {
    const readStream = fs.openSync(filePath, 'r');
    const bufferSize = 2;
    const buffer = new Buffer(bufferSize);
    let readBytes = 0;

    if (readBytes = fs.readSync(readStream, buffer, 0, bufferSize, 0)) {
        return buffer.slice(0, readBytes).toString("hex");
    }

    return "";
}

function ReadFileSyncUtf8(filePath) {
    const fileEncoding = GetFileEncodingHeader(filePath);
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
    const jsonContents = ReadFileSyncUtf8(filePath);
    console.log(GetFileEncodingHeader(filePath));

    return JSON.parse(jsonContents);
}
