import {
  decypherEffect,
  typingEffect,
  readTextFileCallback,
  readFilesToElem,
} from "../../shared_scripts/encoder.js";
decypherEffect(document.getElementById("title"));
document.getElementById("response").innerHTML = "Success";
document.getElementById("response").classList = "green";
document.getElementById("response2").innerHTML = "Loading Projects.....";

typingEffect(document.getElementById("command"), 50, 1000);
typingEffect(document.getElementById("response"), 20, 2000);
typingEffect(document.getElementById("response2"), 20, 3500);
readFilesToElem(["./index.html"], document.getElementById("code"));

let readyToShow = false,
  attemptedToShow = false,
  dat;
readTextFileCallback("./assets/projects.json", (data) => {
  dat = data;
  setupProjects(dat);
});

setTimeout(function () {
  readyToShow = true;
  if (attemptedToShow) {
    setupProjects(dat);
  }
}, 4000);

function deselectAll() {
  document.getElementById("categorySelector").childNodes.forEach((e) => {
    e.className = "category";
  });
}
let selected;
function select(id) {
  document.getElementById(id).className = "category selected";
  selected = id;

  //Show and hide the projects deppending on if they contain the category or not
  let projects = document.getElementsByClassName("project");

  for (let i = 0; i < projects.length; i++) {
    let project = projects[i];
    let c = project.className;

    if (c.toLowerCase().includes(selected) || selected == "showall") {
      project.style.display = "";
    } else {
      project.style.display = "none";
    }
  }
}
function addCategory(category) {
  //Creat the div
  let newCat = document.createElement("div");
  newCat.className = "category";
  newCat.id = category.replace(/ /g, "").toLowerCase();
  newCat.innerHTML = category;
  //add it to the document
  document.getElementById("categorySelector").appendChild(newCat);
  //add a click listener
  newCat.addEventListener("click", () => {
    deselectAll();
    select(newCat.id);
    //newCat.className = "category selected";
  });
}

function addProject(dat) {
  let newProject = document.createElement("div");
  newProject.innerHTML = `
    <a href="${dat.linkPage}">
      <image
        src="${dat.image}"
      ></image>
      <h1 class="project-title">${dat.name}</h1>
    </a>`;
  newProject.className = "project " + dat.categorys.join(" ");
  newProject.tags = "TAG";
  document.getElementById("projectHolderProjects").appendChild(newProject);
}

var addCategorys = [];

function setupProjects(data) {
  attemptedToShow = true;
  if (!readyToShow) return;
  var projects = JSON.parse(data).projects;
  //Setup all the category stuff
  addCategory("Show All");
  select("showall");
  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];
    for (let j = 0; j < project.categorys.length; j++) {
      const category = project.categorys[j];

      //If the category has already been added, dont add it again
      if (!addCategorys.includes(category)) {
        addCategory(category);
        addCategorys.push(category);
      }
    }

    //Start setting up all the projects

    addProject(project);
  }

  //projectHolder.appendChild()
}
