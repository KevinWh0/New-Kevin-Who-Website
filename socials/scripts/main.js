import {
  decypherEffect,
  readFilesToElem,
} from "../../shared_scripts/encoder.js";

decypherEffect(document.getElementById("title"));
//readFileToElem("./misc/code.txt", document.getElementById("code"));
readFilesToElem(
  ["../../shared_scripts/encoder.js", "./index.html"],
  document.getElementById("code")
);

var nodesjs = new NodesJs({
  // container ID
  id: "nodeParticles",

  // width
  width: window.innerWidth,

  // height
  height: window.innerHeight,

  nobg: true,

  // the number of particles
  number: window.hasOwnProperty("orientation") ? 30 : 100,

  // animation speed
  speed: 20,

  pointerCircleRadius: 80,

  number: 20,
});
