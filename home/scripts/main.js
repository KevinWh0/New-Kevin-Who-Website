import {
  decypherEffect,
  readFilesToElem,
} from "../../shared_scripts/encoder.js";

decypherEffect(document.getElementById("title"));
decypherEffect(document.getElementById("projects"), 80, 200);
decypherEffect(document.getElementById("videos"), 100, 600);
decypherEffect(document.getElementById("about"), 100, 1000);
//readFileToElem("./misc/code.txt", document.getElementById("code"));
readFilesToElem(
  ["../../shared_scripts/encoder.js", "./index.html"],
  document.getElementById("code")
);
