export function asciiToGalacticAlphabet(str) {
  let lookup = {
    a: "ᔑ",
    b: "ʖ",
    c: "ᓵ",
    d: "↸",
    e: "ᒷ",
    f: "⎓",
    g: "⊣",
    h: "⍑",
    i: "╎",
    j: "⋮",
    k: "ꖌ",
    l: "ꖎ",
    m: "ᒲ",
    n: "リ",
    o: "𝙹",
    p: "!¡",
    q: "ᑑ",
    r: "∷",
    s: "ᓭ",
    t: "ℸ ̣",
    u: "⚍",
    v: "⍊",
    w: "∴",
    x: "̇/",
    y: "||",
    z: "⨅",
  };
  var strLngth = str.length;
  var newStr = "";
  for (var i = 0; i < strLngth; i++) {
    var char = str.charAt(i);
    var replacementChar = lookup[char.toLowerCase()];
    if (replacementChar != undefined) newStr += replacementChar;
    else newStr += char;
  }
  return newStr;
}

export function asciiToGalacticAlphabetIgnore(str, ignored = [-1]) {
  let lookup = {
    a: "ᔑ",
    b: "ʖ",
    c: "ᓵ",
    d: "↸",
    e: "ᒷ",
    f: "⎓",
    g: "⊣",
    h: "⍑",
    i: "╎",
    j: "⋮",
    k: "ꖌ",
    l: "ꖎ",
    m: "ᒲ",
    n: "リ",
    o: "𝙹",
    p: "!¡",
    q: "ᑑ",
    r: "∷",
    s: "ᓭ",
    t: "ℸ ̣",
    u: "⚍",
    v: "⍊",
    w: "∴",
    x: "̇/",
    y: "||",
    z: "⨅",
  };
  var strLngth = str.length;
  var newStr = "";

  for (var i = 0; i < strLngth; i++) {
    var char = str.charAt(i);
    var replacementChar = lookup[char.toLowerCase()];
    if (replacementChar != undefined && !ignored.includes(i))
      newStr += replacementChar;
    else newStr += char;
  }

  return newStr;
}

export function decypherEffect(element, speed = 50, wait = 0) {
  let title = element;
  let originalTitle = title.innerHTML;

  title.innerHTML = asciiToGalacticAlphabetIgnore(originalTitle);

  let ignoreList = [-1];
  let c = 0;
  function addNewNextNumber(lngth) {
    //let numb = Math.floor(Math.random() * lngth);
    let numb = c;
    c++;
    //if (ignoreList.includes(numb)) return addNewRandomNumber(lngth);
    ignoreList.push(numb);
    return;
  }
  setTimeout(function () {
    requestAnimationFrame(animateText);
  }, wait);
  let counter = 0;
  let frameRequested = false;
  function animateText() {
    if (title.innerHTML == originalTitle) return;
    title.innerHTML = asciiToGalacticAlphabetIgnore(originalTitle, ignoreList);
    addNewNextNumber(originalTitle.length);
    counter++;
    if (counter < originalTitle.length + 1 && !frameRequested) {
      frameRequested = true;
      setTimeout(function () {
        requestAnimationFrame(animateText);
        frameRequested = false;
      }, speed);
    }
  }
}

export function typingEffect(element, speed = 50, wait = 0) {
  let title = element;
  let originalTitle = title.innerHTML;

  title.innerHTML = "";

  setTimeout(function () {
    requestAnimationFrame(animateText);
  }, wait);
  let counter = 0;
  let frameRequested = false;
  function animateText() {
    if (title.innerHTML == originalTitle) return;
    title.innerHTML += originalTitle.charAt(counter);

    counter++;
    if (counter < originalTitle.length + 1 && !frameRequested) {
      frameRequested = true;
      setTimeout(function () {
        requestAnimationFrame(animateText);
        frameRequested = false;
      }, speed);
    }
  }
}

export function readTextFileCallback(url, callback) {
  (async () => {
    const response = await fetch(url);
    response.text().then((e) => {
      callback(e);
    });
  })();
}
export async function readTextFile(url) {
  const response = await fetch(url);
  return response.text();
}

export function readFileToElem(file, elem) {
  var charIndex = 0;
  var text;
  function animate() {
    elem.innerHTML += text.charAt(charIndex);
    charIndex++;
    elem.innerHTML = elem.innerHTML.replace(/\n/g, "<br>");

    var objDiv = document.getElementById("codeContainer");
    objDiv.scrollTop = objDiv.scrollHeight;

    if (charIndex > text.length) return;
    requestAnimationFrame(animate);
  }
  readTextFileCallback(file, (data) => {
    text = data;
    //elem.innerHTML = data.replace(/\n/g, "<br>");
    requestAnimationFrame(animate);
  });
}

export function readFilesToElem(files, elem) {
  var charIndex = 0;
  var text = "";
  function animate() {
    elem.innerHTML += text.charAt(charIndex);
    charIndex++;
    elem.innerHTML = elem.innerHTML.replace(/\n/g, "<br>");

    var objDiv = document.getElementById("codeContainer");
    objDiv.scrollTop = objDiv.scrollHeight;

    if (charIndex > text.length) return;
    requestAnimationFrame(animate);
  }
  (async () => {
    for (var i = 0; i < files.length; i++) {
      let f = files[i];
      text += await readTextFile(f);
    }

    requestAnimationFrame(animate);
  })();
}
