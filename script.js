var img1 = "./img/headerW.png"
var img2 = "./img/headerD.png"
var mode = "BLACK"

var allLektions;
var lektionName;
var lektionContent;
var lektionSprache;

let content;
let currentWord = 0;
let playground = "";

let row = 0;
let collumn = 0;
let currentCard;

let list;
let wrongAnswers;
let tempCount = 0;
let wrongCount = 0;
let tempContent;
var audio;

loadDashboard();

// Load Dashboard
function loadDashboard() {
    newLektion.clear();

    // Navigation
    let nav = `<a onclick="loadDashboard()" id="header"><div><img src="${img1}"></div></a>
                  <a onclick="loadDashboard()"><div><i id="active" class="fa-solid fa-house"></i></div></a>
                  <a onclick="addLektion()"><div><i class="fa-solid fa-plus"></i></div></a>
                  <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                  <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    // Preview Field
    temp = "";
    temp += `<div id="previewField">`
    for (let i = 0; i < allLektions.list.length; i++) {
        if (allLektions.list[i] != null) {
            temp += `<div class="preview" onclick="loadLektion(${i})"><h1>${allLektions.list[i].name}</h1><p>${allLektions.list[i].content.length} Begriffe</p></div>`
        }
    }
    temp += `<div class="preview" id="previewAdd" onclick="addLektion();"><i class="fa-solid fa-plus"></i></div>`
    temp += `</div>`

    document.getElementById('content').innerHTML = temp;
}

// Load Add Lektion
function addLektion(type) {
    let nav = `<a onclick="loadDashboard()" id="header"><div><img src="${img1}"></div></a>
                  <a onclick="loadDashboard()"><div><i class="fa-solid fa-house"></i></div></a>
                  <a onclick="addLektion()"><div><i id="active" class="fa-solid fa-plus"></i></div></a>
                  <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                  <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    // Header
    temp = `<div id="addLektion"><h1 id="name">Neue Lektion erstellen</h1>`
    let name = "";
    if (newLektion.name) {
        name = newLektion.name;
    }
    temp += `<br><input class="input" id="lektionName" value="${name}" type="text" placeholder="Gib einen Titel ein wie 'Englisch - Kapitel 1: Welcome Back'" autofocus>`
    temp += `<div id="addMenu">`

    temp += `<div id='autoGenerate' onclick="loadAutoGenerate()">Auto Generate Table</div></div>`

    // Table
    temp += `<table>`

    temp = getDropdown(temp, type);

    let rowCount = 0;
    if (newLektion.content) {
        for (let i = 0; i < newLektion.content.length; i++) {
            if (type != null) {
                temp += `<tr><td class="begriff"><input class="begriffV" onclick="this.select()" value="${newLektion.content[i][0]}" placeholder="Begriff"></td><td class="definition"><input class="definitionV" onclick="this.select()" value="${newLektion.content[i][1]}"  placeholder="Definition"></td><td><i onclick="removeRow(${rowCount},${type})" id="trash${rowCount}" class="fa-solid fa-trash"></i></td></tr>`
            } else {
                temp += `<tr><td class="begriff"><input class="begriffV" onclick="this.select()" value="${newLektion.content[i][0]}" placeholder="Begriff"></td><td class="definition"><input class="definitionV" onclick="this.select()" value="${newLektion.content[i][1]}"  placeholder="Definition"></td><td><i onclick="removeRow(${rowCount})" id="trash${rowCount}" class="fa-solid fa-trash"></i></td></tr>`
            }
            rowCount++;
        }
    }

    if (type != null) {
        temp += `<tr><td class="begriff"><input class="begriffV" onclick="this.select()" value="" placeholder="Begriff"></td><td class="definition"><input id="lastTab" class="definitionV" onclick="this.select()" value="" placeholder="Definition"></td><td><i onclick="removeRow(${rowCount},${type})" id="trash${rowCount}" class="fa-solid fa-trash"></i></td></tr>`
    } else {
        temp += `<tr><td class="begriff"><input class="begriffV" onclick="this.select()" value="" placeholder="Begriff"></td><td class="definition"><input id="lastTab" class="definitionV" onclick="this.select()" value="" placeholder="Definition"></td><td><i onclick="removeRow(${rowCount})" id="trash${rowCount}" class="fa-solid fa-trash"></i></td></tr>`
    }


    temp += `<tr><td colspan="2" id="lastRow" onclick="addRow(${type})"><i class="fa-solid fa-plus"></td></tr>`
    temp += "</table>";


    // Save
    temp += "<div id='confirm' onclick='saveLektion()'>Save</div>"
    document.getElementById('content').innerHTML = temp;

    // Event Listener
    document.getElementById("lektionName").addEventListener('blur', function () {
        name = document.getElementById("lektionName").value
        newLektion.setName(name)
    })
    document.getElementById("lastTab").addEventListener('keydown', function (e) {
        if (e.keyCode == 9) {
            addRow(type);
        }
        if (e.keyCode == 13) {
            saveLektion(type);
        }
    });
}
// Load Edit Lektion
function editLektion(count) {
    newLektion.clear();
    newLektion.setName(allLektions.list[count].name)

    for (let i = 0; i < allLektions.list[count].content.length; i++) {
        newLektion.setNewRow(allLektions.list[count].content[i])
    }
}


// Load Search Lektion
function searchLektion() {
    // Navigation
    let nav = `<a onclick="loadDashboard()" id="header"><div><img src="${img1}"></div></a>
                <a onclick="loadDashboard()"><div><i class="fa-solid fa-house"></i></div></a>
                <a onclick="addLektion()"><div><i class="fa-solid fa-plus"></i></div></a>
                <a onclick="searchLektion()"><div><i id="active" class="fa-solid fa-magnifying-glass"></i></div></a>
                <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    // Preview Field
    temp = "";
    temp += `<div id="previewField">`
    for (let i = 0; i < allLektions.OnlineList.length; i++) {
        if (allLektions.OnlineList[i] != null) {
            temp += `<div class="preview" onclick="loadLektion(${i}, 'preview')"><h1>${allLektions.OnlineList[i].name}</h1><p>${allLektions.OnlineList[i].content.length} Begriffe</p></div>`
        }
    }
    temp += `</div>`


    document.getElementById('content').innerHTML = temp;
}

// Load Lektion Menu
function loadLektion(count, type) {
    // Navigation
    let nav = `<a onclick="loadDashboard()" id="header"><div><img src="${img1}"></div></a>
                  <a onclick="loadDashboard()"><div><i id="active" class="fa-solid fa-house"></i></div></a>
                  <a onclick="addLektion()"><div><i class="fa-solid fa-plus"></i></div></a>
                  <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                  <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;


    let lektionName, lektionContent, begriff, definition;
    
    if (type == "preview") {
        content = allLektions.OnlineList[count].content
        lektionName = allLektions.OnlineList[count].name;
        lektionContent = allLektions.OnlineList[count].content;
        lektionSprache = allLektions.OnlineList[count].bSprache;
        begriff = allLektions.OnlineList[count].bSprache;
        definition = allLektions.OnlineList[count].dSprache;
    } else{
        content = allLektions.list[count].content
        lektionName = allLektions.list[count].name;
        lektionContent = allLektions.list[count].content;
        lektionSprache = allLektions.list[count].bSprache;
        begriff = allLektions.list[count].bSprache;
        definition = allLektions.list[count].dSprache;
    }

    wrongAnswers = new Array();
    tempContent = content;
    tempCount = count;
    currentWord = 0;

    list = random(content);
    currentCard = content[collumn][row]

    // Content
    temp = ""
    temp += `<div id='lektionOverview'><h2>${lektionName}</h2>`
    if(type == "preview"){
        temp += `<div><p onclick='saveOnlineLektion(${count})'>Speichern</p></div>`
    }else{
        temp += `<div><p onclick='loadKarteikarten()'>Karteikarten</p><p onclick='loadLernen()'>Schreiben</p><p onclick='loadAntworten(${count})'>Antworten</p></div>`
    }

    temp += `<table id='tableLektion'><tr><th>${begriff}</th><th id='englisch' onclick='autoEnglisch()'>${definition}</th></tr>`
    for (let i = 0; i < lektionContent.length; i++) {
        temp += `<tr><td class="begriff">${lektionContent[i][0]}</td><td class="definition">${lektionContent[i][1]}</td></tr>`
    }

    temp += "</table>"
    if(type != "preview"){
        temp += `<section><p onclick='allLektions.removeLektion(${count})'>Entfernen</p><p onclick='editLektion(${count});addLektion(${count});'>Bearbeiten</p></section></div>`
    }
    else{
        temp += `<section><p onclick='searchLektion()'>Zurück</p></section>`
    }


    document.getElementById('content').innerHTML = temp;
}