if(content){
    content = allLektions.list[0].content;
}

// Task - Karteikarten
row = 0;
collumn = 0;
currentCard = content[collumn][row]

function loadKarteikarten(count) {
    let playground = "";
    playground += `<div id="playground"><i onclick="skip(-1)" class="fa-solid fa-angle-left"></i>`
    playground += `<div id='card' onclick='swap()'><a>${currentCard}</a></div>`
    playground += `<i onclick="skip(1)" class="fa-solid fa-angle-right"></i></div>`
    playground += `<div id="achievment"><a>Fortschritt: ${collumn+1}/${content.length}</a></div>`
    playground += `<button id="backToMenu" onclick="loadLektion(${tempCount})">Zurück</button>`

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
currentWord = 0;
playground = "";

list = random(content);
wrongAnswers = new Array();
tempCount = 0;
wrongCount = 0;
tempContent = content;
audio;

function loadLernen() {
    let tempWord = tempContent[[list[currentWord]]][0].toString().toLowerCase()
    getAudio(lektionSprache, tempWord);

    // Erste Eingabe
    if (playground == "") {
        playground += `<div id="playground">`
        playground += `<div id='answer'><a>${tempContent[[list[currentWord]]][1]}</a>`
        playground += `<div id="word"><div id="playbutton-parent"><div onclick="playSound()" id="playbutton-child"><i class="fa-solid fa-play"></i></div></div>`
        playground += `<input type="text" id="antwort" autofocus onchange="checkLernen()">`
        playground += `</div>`
        playground += `<div id="achievmentA"><a>Richtig: ${currentWord-wrongAnswers.length}</a><a>Fortschritt: ${currentWord+1}/${tempContent.length}</a><a>Falsch: ${wrongAnswers.length}</a></div>`
        playground += `<button id="backToMenu" onclick="loadLektion(${tempCount})">Zurück</button>`
    }
    // Falsche Eingabe 
    else {
        playground += `<div id='answer'><a>${tempContent[[list[currentWord]]][1]}</a>`
        playground += `<a>${tempContent[[list[currentWord]]][0]}</a>`
        playground += `<div id="word"><div id="playbutton-parent"><div onclick="playSound()" id="playbutton-child"><i class="fa-solid fa-play"></i></div></div>`
        playground += `<input type="text" id="antwort" autofocus onchange="checkLernen()">`
        playground += `</div>`
        playground += `<div id="achievmentA"><a>Richtig: ${currentWord-wrongAnswers.length}</a><a>Fortschritt: ${currentWord+1}/${tempContent.length}</a><a>Falsch: ${wrongAnswers.length}</a></div>`
        playground += `<button id="backToMenu" onclick="loadLektion(${tempCount})">Zurück</button>`
    }

    document.getElementById("content").innerHTML = playground;
    playground = ""
}


function checkLernen() {
    if (tempContent[[list[currentWord]]][0].toString().toLowerCase() == document.getElementById("antwort").value.toString().toLowerCase()) {
        document.getElementById("content").innerHTML = "";
        if (currentWord + 1 < tempContent.length) {
            currentWord += 1;
            loadLernen();
        } else {
            if (wrongAnswers == "") {
                tempContent = content;
                list = random(tempContent);
                playground += `<div id='playground'>`
                playground += `<div id="answer"><a>Finished</a></div>`
                playground += `</div>`
                playground += `<button id="replay" onclick="loadLernen()">Neu Starten</button>`
                playground += `<button id="backToMenu" onclick="loadLektion(${tempCount})">Zurück</button>`
                document.getElementById("content").innerHTML = playground;
            } else {
                tempContent = wrongAnswers;
                list = random(tempContent);
                wrongAnswers = "";
                playground += `<div id='playground'>`
                playground += `<div id="answer"><a>Defeat</a></div>`
                playground += `</div>`
                playground += `<button id="replay" onclick="loadLernen()">Fortfahren</button>`
                playground += `<button id="backToMenu" onclick="loadLektion(${tempCount})">Zurück</button>`
                document.getElementById("content").innerHTML = playground;
            }
            wrongAnswers = new Array()
            currentWord = 0;
            wrongCount = 0;
            playground = "";
        }
    } else {
        if(wrongAnswers[wrongCount-1] != tempContent[[list[currentWord]]]){
            wrongAnswers[wrongCount++] = tempContent[[list[currentWord]]]
        }        
        playground += `<div id="playground">`
        loadLernen();
    }
}

// Task - Antworten
function loadAntworten(count) {
    if (playground == "") {
        playground += `<div id="playground">`
        playground += `<div id='answer'><a>${tempContent[[list[currentWord]]][1]}</a>`
        playground += `<input type="text" id="antwort" autofocus onchange="checkAnswer()">`
        playground += `</div>`
    } else {
        playground += `<div id='answer'><a>${tempContent[[list[currentWord]]][1]}</a>`
        playground += `<a>${tempContent[[list[currentWord]]][0]}</a>`
        playground += `<input type="text" id="antwort" autofocus onchange="checkAnswer()">`
        playground += `</div>`
    }
    playground += `<div id="achievmentA"><a>Richtig: ${currentWord-wrongAnswers.length}</a><a>Fortschritt: ${currentWord+1}/${tempContent.length}</a><a>Falsch: ${wrongAnswers.length}</a></div>`
    playground += `<button id="backToMenu" onclick="loadLektion(${tempCount})">Zurück</button>`

    document.getElementById("content").innerHTML = playground;
    playground = "";
}

function checkAnswer() {
    if (tempContent[[list[currentWord]]][0].toString().toLowerCase() == document.getElementById("antwort").value.toString().toLowerCase()) {
        document.getElementById("content").innerHTML = "";
        if (currentWord + 1 < tempContent.length) {
            currentWord++;
            loadAntworten();
        } else {
            if (wrongAnswers == "") {
                tempContent = content;
                list = random(tempContent);
                playground += `<div id='playground'>`
                playground += `<div id="answer"><a>Finished</a></div>`
                playground += `</div>`
                playground += `<button id="replay" onclick="loadAntworten()">Neu Starten</button>`
                playground += `<button id="backToMenu" onclick="loadLektion(${tempCount})">Zurück</button>`
                document.getElementById("content").innerHTML = playground;
            } else {
                tempContent = wrongAnswers;
                list = random(tempContent);
                wrongAnswers = "";
                playground += `<div id='playground'>`
                playground += `<div id="answer"><a>Defeat</a></div>`
                playground += `</div>`
                playground += `<button id="replay" onclick="loadAntworten()">Fortfahren</button>`
                playground += `<button id="backToMenu" onclick="loadLektion(${tempCount})">Zurück</button>`
                document.getElementById("content").innerHTML = playground;
            }
            wrongAnswers = new Array()
            currentWord = 0;
            wrongCount = 0;
            playground = "";
        }
    } else {
        if(wrongAnswers[wrongCount-1] != tempContent[[list[currentWord]]]){
            wrongAnswers[wrongCount++] = tempContent[[list[currentWord]]]
        }
        playground += `<div id="playground">`
        loadAntworten();
    }
}
