var img1 = "./img/headerW.png"
var img2 = "./img/headerD.png"
var mode = "BLACK"

var allLektions;
var lektionName;
var lektionContent;

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
    
    temp = getDropdown(temp);

    let rowCount = 0;
    if (newLektion.content) {
        for (let i = 0; i < newLektion.content.length; i++) {
            temp += `<tr><td class="begriff"><input class="begriffV" onclick="this.select()" value="${newLektion.content[i][0]}"></td><td class="definition"><input class="definitionV" onclick="this.select()" value="${newLektion.content[i][1]}"></td><td><i onclick="removeRow(${rowCount})" id="trash${rowCount}" class="fa-solid fa-trash"></i></td></tr>`
            rowCount++;
        }
    }

    temp += `<tr><td class="begriff"><input class="begriffV" onclick="this.select()" value=""></td><td class="definition"><input id="lastTab" class="definitionV" onclick="this.select()" value=""></td><td><i onclick="removeRow(${rowCount})" id="trash${rowCount}" class="fa-solid fa-trash"></i></td></tr>`

    temp += `<tr><td colspan="2" id="lastRow" onclick="addRow(${rowCount})"><i class="fa-solid fa-plus"></td></tr>`
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
            addRow(rowCount);
        }
        if (e.keyCode == 13) {
            saveLektion(type);
        }
    });
}
// Load Edit Lektion
function editLektion(count, temp) {
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

    temp = ""

    document.getElementById('content').innerHTML = temp;
}

// Load Lektion Menu
function loadLektion(count) {
    // Navigation
    let nav = `<a onclick="loadDashboard()" id="header"><div><img src="${img1}"></div></a>
                  <a onclick="loadDashboard()"><div><i id="active" class="fa-solid fa-house"></i></div></a>
                  <a onclick="addLektion()"><div><i class="fa-solid fa-plus"></i></div></a>
                  <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                  <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    content = allLektions.list[count].content
    list = random(content);

    wrongAnswers = new Array();
    tempContent = content;
    tempCount = count;

    let lektionName = allLektions.list[count].name;
    let lektionContent = allLektions.list[count].content;
    let begriff = allLektions.list[count].bSprache;
    let definition = allLektions.list[count].dSprache;

    currentCard = content[collumn][row]

    // Content
    temp = ""
    temp += `<div id='lektionOverview'><h2>${lektionName}</h2><div><p onclick='loadKarteikarten()'>Karteikarten</p><p onclick='loadLernen()'>Schreiben</p><p onclick='loadAntworten(${count})'>Antworten</p></div>`
    temp += `<table id='tableLektion'><tr><th>${begriff}</th><th id='englisch' onclick='autoEnglisch()'>${definition}</th></tr>`
    for (let i = 0; i < lektionContent.length; i++) {
        temp += `<tr><td class="begriff">${lektionContent[i][0]}</td><td class="definition">${lektionContent[i][1]}</td></tr>`
    }
    temp += "</table>"
    temp += `<section><p onclick='allLektions.removeLektion(${count})'>Entfernen</p><p onclick='editLektion(${count});addLektion(${count});'>Bearbeiten</p></section></div>`

    document.getElementById('content').innerHTML = temp;
}