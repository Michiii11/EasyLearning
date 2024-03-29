function updateRows(isAdd) {
    let name = newLektion.name;
    newLektion.clear();
    newLektion.name = name;

    for(let i = 0; i < document.getElementsByClassName("begriffV").length; i++){
        let begriff = document.getElementsByClassName("begriffV")[i].value
        let definition = document.getElementsByClassName("definitionV")[i].value

        if(isAdd){
            newLektion.setNewRow([begriff, definition]);
        } else if(begriff != "" || definition != ""){
            newLektion.setNewRow([begriff, definition]);
        }
    }
}

// Tools for addLektion
function addRow(type) {
    updateRows(true);

    addLektion(type);

    // Fokus auf die nächste Spalte
    let begriffV = document.querySelectorAll(".definitionV");
    if(begriffV.length >= newLektion.content.length - 1 && newLektion.content.length > 0){
        begriffV[newLektion.content.length - 1].focus();
    }
}

function removeRow(row, type) {
    console.log(newLektion)
    newLektion.removeRow(row);
 
    if(type != null){
        allLektions.replaceLektion(type, newLektion.name, newLektion.content)
        editLektion(type);
    }

    addLektion(type);
}

function saveLektion(type) {
    // type == Edited Lektion - !type == New Lektion

    if(type != null){
        let begriff = document.getElementsByClassName("begriffV")
        let definition = document.getElementsByClassName("definitionV")

        newLektion.clear();
        newLektion.setName(document.getElementById("lektionName").value)
    
        for(let i = 0; i < begriff.length; i++){
            if(begriff[i].value != "" || definition[i].value != ""){
                newLektion.setNewRow([begriff[i].value, definition[i].value])
            }
        }

        allLektions.replaceLektion(type, newLektion.name, newLektion.content)
    } else{
        allLektions.addNewLektion(newLektion.name, newLektion.content, newLektion.bSprache, newLektion.dSprache);
    }

    content = allLektions.list[0].content;
    loadDashboard();
}
function saveOnlineLektion(count){
    let name = allLektions.OnlineList[count].name;
    let content = allLektions.OnlineList[count].content;
    let bSprache = allLektions.OnlineList[count].bSprache;
    let dSprache = allLektions.OnlineList[count].dSprache;

    allLektions.addNewLektion(name, content, bSprache, dSprache);
    loadDashboard();
}

// Tools for Tasks
function getAudio(language, word){
    let short
    switch(language){
        case "Englisch": short = "en";
        case "Deutsch": short = "de";
        case "Spanisch": short = "es";
        case "Französisch": short = "fr";
        break;
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let dataString = this.responseText;
            let data = JSON.parse(dataString);

            document.getElementById('content').innerHTML += `<audio id="sound" controls></audio>`

            for(let i = 0; i < data[0].phonetics.length; i++){
                if(data[0].phonetics[i].audio){
                    audio = `${data[0].phonetics[i].audio}`
                    document.getElementById("sound").innerHTML = `<source src="${audio}" type="audio/mp3">`
                    document.getElementById("playbutton-parent").innerHTML = `<div onclick="playSound()" id="playbutton-child"><i class="fa-solid fa-play"></i></div>`
                }
            }
            document.getElementById("playbutton-parent").innerHTML = `<div onclick="playSound()" id="playbutton-child"><i class="fa-solid fa-play"></i></div>`
            let begriffV = document.getElementById('antwort');
            begriffV.focus();
        };
    }
    xhttp.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, true);
    xhttp.send();
}
function playSound(){
    if(document.getElementById("playbutton-child").innerHTML == `<i class="fa-solid fa-play"></i>`){
        document.getElementById("playbutton-child").innerHTML = `<i class="fa-solid fa-pause"></i>`
        document.getElementById("sound").play();
        setTimeout(playSound, 2000)
    } else{
        document.getElementById("playbutton-child").innerHTML = `<i class="fa-solid fa-play"></i>`
        document.getElementById("sound").pause();
    }
}


function makeLektion(elem) {
    console.log(elem)

    document.getElementById("content").innerHTML = ``
    console.log(elem)
    elem = elem.value;
    char = elem.charAt(0);
    elem = elem.split(char)
    lektionName = document.getElementById('lektionName');

    let temp = `<div id="addLektion"><h1>Neue Lektion erstellen</h1>`
    temp += `<form><br><input class="input" id="lektionName" type="text" placeholder="Lektion 1">
               <br><input class="input" type="text" onchange="makeLektion(this)" placeholder="/baum/haus/..."></form>`
    temp += "<table><tr><th>Begriff</th><th id='englisch' onclick='autoEnglisch()'>Definition</th></tr>"
    for (let i = 1; i < elem.length; i++) {
        temp += `<tr><td class="begriff" onClick="javascript:onSelect(this)"><input value="${elem[i]}" onclick="this.select()"></td><td class="definition"><input value="" onclick="this.select()"></td></tr>`
    }
    temp += `<tr><td colspan="2" id="lastRow" onclick="addRow()"><i class="fa-solid fa-plus"></td></tr>`
    temp += "</table>";
    temp += "<div id='confirm' onclick='saveLektion()'>Save</div>"

    for (let i = 0; i < document.getElementsByClassName("begriff").length; i++) {

    }
    lektion[lektionCount] = elem;
    document.getElementById("content").innerHTML = temp;
}


// Auto Generate Table
function loadAutoGenerate() {
    let temp = `<div id='loadAutoGenerate'>`
    temp += `<textarea id="text"></textarea>`
    temp += `<div>
    <a>Zwischen Begriffen und Definition</a>  
    <div class="toggle-buttons">
        <input type="radio" id="a1" name="group-a" checked/>
        <label for="b1">Tab</label>
        <input type="radio" id="a2" name="group-a"/>
        <label for="b2">Komma</label>
        <input type="radio" id="a3" name="group-a" />
        <label for="b3"><input name="text" placeholder="-"></label>
    </div>`

    temp += `
    <a>Zwischen Karten</a>  
    <div class="toggle-buttons-2">
        <input type="radio" id="b1" name="group-b" checked/>
        <label for="b1">Neue Zeile</label>
        <input type="radio" id="b2" name="group-b"/>
        <label for="b2">Semikolon</label>
        <input type="radio" id="b3" name="group-b"/>
        <label for="b3"><input name="text" placeholder="-"></label>
    </div>`

    temp += `<div id='confirm' onclick='saveAutoGeneratedLektion()'>Save</div></div>`
    temp += `</div>`

    document.getElementById('content').innerHTML = temp;

    document.getElementById("text")
        .addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode == 13 || event.keyCode == 189) {
                autoGenerateTable();
            }
        });
}
function autoGenerateTable() {
    let elem = document.getElementById('text').value;
    document.getElementById('text').innerHTML = elem;

    newLektion.clear();
    elem = elem.split(/\r?\n/);
    for (let i = 0; i < elem.length; i++) {
        elem[i] = elem[i].split("\t")
        newLektion.setNewRow(elem[i])
    }

    loadAutoGenerate();
    let temp = "<table id='tableLektion'><tr><th>Begriff</th><th id='englisch' onclick='autoEnglisch()'>Definition</th></tr>"
    for (let i = 0; i < elem.length; i++) {
        temp += `<tr><td class="begriff">${elem[i][0]}</td><td class="definition">${elem[i][1]}</td></tr>`
    }
    temp += "</table>"
    document.getElementById('content').innerHTML += temp;

    document.getElementById("text")
        .addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode == 13 || event.keyCode == 189) {
                autoGenerateTable();
            }
        });
}
function saveAutoGeneratedLektion(){
    let count = allLektions.list.length;
    allLektions.addNewLektion("", newLektion.content, newLektion.bSprache, newLektion.dSprache);
    editLektion(count)
    addLektion(count);  
}

let languages = ["Deutsch", "Englisch", "Spanisch", "Französisch"]
function getDropdown(text, type){
    let temp = new Array(languages.length);
    for(let i = 0; i < languages.length; i++){
        temp[i] = languages[i]
    }
    temp.splice(temp.indexOf(newLektion.bSprache), 1);

    text += `<tr><th><details><summary>${newLektion.bSprache}</summary>` 
    for(let i = 0; i < temp.length; i++){
        text += `<div onclick="newLanguage('${temp[i]}', 'bSprache')"><input type="checkbox"><label>${temp[i]}</label></div>`
    }

    text += `</details></th><th><details><summary>${newLektion.dSprache}</summary>`
    
    temp = new Array(languages.length);
    for(let i = 0; i < languages.length; i++){
        temp[i] = languages[i]
    }
    temp.splice(temp.indexOf(newLektion.dSprache), 1);
    for(let i = 0; i < temp.length; i++){
        text += `<div onclick="newLanguage('${temp[i]}', 'dSprache', ${type})"><input type="checkbox"><label>${temp[i]}</label></div>`
    }
    text += `</details></th></tr>`

    return text;
}
function newLanguage(language, choice, type){
    if(choice == "bSprache"){
        newLektion.bSprache = language;
    } else{
        newLektion.dSprache = language;
    }

    addLektion(type);
}

// Function to get a Random ordered List of Numbers
function random(temp) {
    if(temp){
        let list = new Array(temp.length);
        for (let i = 0; i < temp.length; i++) {
            list[i] = i;
        }
        list = list.sort(() => Math.random() - 0.5)

        return list;
    }
}

// Function to Switch between Dark and White Mode
function changeMode() {
    // Swap Colors
    let grey1 = getComputedStyle(document.documentElement).getPropertyValue('--grey1');
    let grey2 = getComputedStyle(document.documentElement).getPropertyValue('--grey2');
    let grey3 = getComputedStyle(document.documentElement).getPropertyValue('--grey3');
    let grey4 = getComputedStyle(document.documentElement).getPropertyValue('--grey4');
    let grey5 = getComputedStyle(document.documentElement).getPropertyValue('--grey5');

    document.documentElement.style.setProperty('--grey1', grey5);
    document.documentElement.style.setProperty('--grey2', grey4);
    document.documentElement.style.setProperty('--grey3', grey3);
    document.documentElement.style.setProperty('--grey4', grey2);
    document.documentElement.style.setProperty('--grey5', grey1);

    // Swap Shadows
    temp = getComputedStyle(document.documentElement).getPropertyValue('--lightShadow');
    document.documentElement.style.setProperty('--lightShadow', getComputedStyle(document.documentElement).getPropertyValue('--darkShadow'));
    document.documentElement.style.setProperty('--darkShadow', temp);

    // Swap Header Image
    temp = img1;
    img1 = img2;
    img2 = temp;
    document.getElementById('header').innerHTML = `<div><img src="${img1}"></div>`;

    if (mode == "BLACK") {
        mode = "WHITE"
    } else {
        mode = "BLACK"
    }
    localStorage["darkWhiteMode"] = mode;
}
if(mode != localStorage["darkWhiteMode"]){changeMode()}







function loadConfetti(){
    var count = 200;
    var colors = ['#FF8552', '#F4A100','#F37679'];
    var defaults = {
      origin: { y: 0.7 }
    };
    
    blast();
    
    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio), colors: colors
      }));
    }
    
    function blast(){
        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });
        fire(0.2, {
          spread: 60,
        });
        fire(0.35, {
          spread: 100,
          decay: 0.92,
          scalar: 0.8
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.90,
          scalar: 1.2
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });
    }
}