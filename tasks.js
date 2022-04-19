let content = allLektions.list[0].content;

// Task - Karteikarten
let row = 0;
let collumn = 0;
let currentCard = content[collumn][row]

function loadKarteikarten(count) {
    let playground = "";
    playground += `<div id="playground"><i onclick="skip(-1)" class="fa-solid fa-angle-left"></i>`
    playground += `<div id='card' onclick='swap()'><a>${currentCard}</a></div>`
    playground += `<i onclick="skip(1)" class="fa-solid fa-angle-right"></i></div>`
    playground += `<button id="backToMenu" onclick="loadLektion(tempCount)">BACK</button>`

    document.getElementById("content").innerHTML = playground;
}
function swap() {
    if (row == 0) {
        row = 1;
    } else {
        row = 0;
    }
    currentCard = content[collumn][row]
    loadKarteikarten();
}
function skip(sum) {
    if (collumn + sum >= 0 && collumn + sum < content.length) {
        collumn = collumn + sum;
    }
    row = 0;
    currentCard = content[collumn][row]
    
    loadKarteikarten();
}

// Task - Lernen
function loadLernen() {

}

// Task - Antworten
let currentWord = 0;
let playground = "";

let list = random(content);
let wrongAnswers = new Array();
let tempCount = 0;
let tempContent = content;

function loadAntworten(count) {
    if (playground == "") {
        playground += `<div id="playground">`
        playground += `<div id='answer'><a>${tempContent[[currentWord]][0]}</a>`
        playground += `<input type="text" id="antwort" autofocus="autofocus" onfocus="this.select()" onchange="checkAnswer()">`
        playground += `</div>`
    } else {
        playground += `<div id='answer'><a>${tempContent[[currentWord]][0]}</a>`
        playground += `<a>${tempContent[[currentWord]][1]}</a>`
        playground += `<input type="text" id="antwort" autofocus="autofocus" onfocus="this.select()" onchange="checkAnswer()">`
        playground += `</div>`
    }
    playground += `<button id="backToMenu" onclick="loadLektion(tempCount)">BACK</button>`

    document.getElementById("content").innerHTML = playground;
    playground = "";
}

function checkAnswer() {
    if (tempContent[[currentWord]][1].toString().toLowerCase() == document.getElementById("antwort").value.toString().toLowerCase()) {
        document.getElementById("content").innerHTML = "";
        if (currentWord + 1 < tempContent.length) {
            currentWord += 1;
            loadAntworten();
        } else {
            currentWord = 0;
            if (wrongAnswers == "") {
                playground += `<div id='playground'>`
                playground += `<div id="answer"><a>Finished</a></div>`
                playground += `</div>`
                playground += `<button id="replay" onclick="loadAntworten()">Neu Starten</button>`
                playground += `<button id="backToMenu" onclick="loadLektion(tempCount)">BACK</button>`
                document.getElementById("content").innerHTML = playground;
                playground = "";
                wrongAnswers = "";
            } else {
                tempContent = wrongAnswers;
                playground += `<div id='playground'>`
                playground += `<div id="answer"><a>Defeat</a></div>`
                playground += `</div>`
                playground += `<button id="replay" onclick="loadAntworten()">Fortfahren</button>`
                playground += `<button id="backToMenu" onclick="loadLektion(tempCount)">BACK</button>`
                document.getElementById("content").innerHTML = playground;
                playground = "";
            }
        }
    } else {
        wrongAnswers[tempCount++] = tempContent[[currentWord]]
        console.log(wrongAnswers);
        playground += `<div id="playground">`
        loadAntworten();
    }
}
