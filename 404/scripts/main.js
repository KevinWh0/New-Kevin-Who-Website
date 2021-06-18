import {
  decypherEffect,
  readFilesToElem,
} from "../../shared_scripts/encoder.js";

decypherEffect(document.getElementById("desc"), 40);

let text = [
  "are you lost?",
  "Go, there is nothing here for you!",
  "I mean it, this is your last chance!",
  "Alright I lied, but what do you want from me?",
  "A burito?",
  "Perhaps some pancakes?",
  "Cookies?",
  "Well I dont have any, but I heard the project page does",
  "Seriously, why are you here? I have a job to do",
  "Fine I guess if its only for a little I can stay",
  "Only if you promise not to tell the owner I was slacking off and not serving 404's",
  "I mean it, dont tell him, and we can be friends",
  {
    text: "Oh look here are the pancakes you were wanting",
    func: () => {
      let img = document.createElement("img");
      img.setAttribute("src", "./404/assets/Pancake.png");
      img.classList = "gravity";
      img.id = "pancake";
      img.style.width = "32px";
      img.style.height = "32px";
      img.addEventListener("click", () => {
        img.remove();
        document.getElementById("desc").innerHTML =
          "Uhh, did you just eat my only pancake?";
        decypherEffect(document.getElementById("desc"), 40);
      });
      document.getElementById("randomHolder").appendChild(img);
    },
  },
  "Huh, do you want more pancakes?",
  {
    text: "Fine here have more pancakes",
    func: () => {
      summonPancakes(10);
    },
  },
];

function summonPancakes(count, url = "./404/assets/Pancake.png") {
  //for (var i = 0; i < 100; i++) {
  let img = document.createElement("img");
  img.setAttribute("src", url);
  img.classList = "gravity";
  //img.id = "pancake";
  img.style.width = "32px";
  img.style.height = "32px";
  img.setAttribute(
    "style",
    `transform: translate(50%, -200%); top:100%; left:${
      Math.random() * window.innerWidth
    }px`
  );

  document.getElementById("randomHolder").appendChild(img);
  setTimeout(function () {
    if (count > 0) summonPancakes(count - 1, url);
  }, 200);
  //}
}

function summonFallingText(text, total) {
  //for (var i = 0; i < 100; i++) {
  let t = document.createElement("p");
  t.innerHTML = text;
  t.setAttribute(
    "style",
    `transform: translate(50%, -200%); top:100%; left:${
      Math.random() * window.innerWidth
    }px`
  );
  t.classList = "gravity red";

  document.getElementById("randomHolder").appendChild(t);
  setTimeout(function () {
    if (total > 0) summonFallingText(text, total - 1);
  }, 200);
  //}
}

let counter = -1;
function getNextText() {
  setTimeout(function () {
    let txt = text[counter];
    if (txt == undefined) return;
    if (typeof txt == "string") document.getElementById("desc").innerHTML = txt;
    else {
      document.getElementById("desc").innerHTML = txt.text;
      txt.func();
    }
    decypherEffect(document.getElementById("desc"), 40);
    getNextText();
  }, 10 * 1000);

  counter++;
}

getNextText();

//Add click slant to 404 title
let pokeCount = 0;
document.getElementById("title").addEventListener("click", () => {
  document.getElementById("desc").innerHTML = "Stop poking me";
  pokeCount++;
  if (pokeCount == 4) {
    summonPancakes(10, "./404/assets/warning.png");
    summonFallingText("Error: on line 17", 10);
  }
});
