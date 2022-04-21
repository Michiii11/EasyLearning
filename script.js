var img1 = "./img/headerW.png"
var img2 = "./img/headerD.png"
var mode = "BLACK"
var allLektions;
var temp;

loadDashboard();

if(mode != localStorage["darkWhiteMode"]){changeMode()}

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

        if(mode == "BLACK"){
            mode = "WHITE"
        } else{
            mode = "BLACK"
        }
        localStorage["darkWhiteMode"] = mode;
}

// load Dashboard
function loadDashboard() {
    let nav = `<a onclick="loadDashboard()" id="header"><div><img src="${img1}"></div></a>
                <a onclick="loadDashboard()"><div><i id="active" class="fa-solid fa-house"></i></div></a>
                <a onclick="addLektion()"><div><i class="fa-solid fa-plus"></i></div></a>
                <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    temp = "";
    temp += `<div id="previewField">`

    for(let i = 0; i < allLektions.list.length; i++){
        if(allLektions.list[i] != null){
            temp += `<div class="preview" onclick="loadLektion(${i})"><h1>${allLektions.list[i].name}</h1><p>${allLektions.list[i].content.length} Begriffe</p></div>`
        }
    }
    temp += `<div class="preview" id="previewAdd" onclick="addLektion();"><i class="fa-solid fa-plus"></i></div>`
    temp += `</div>`

    document.getElementById('content').innerHTML = temp;
}

// Load Add Lektion
function addLektion() {
    nav = `<a onclick="loadDashboard()" id="header"><div><img src="${img1}"></div></a>
                <a onclick="loadDashboard()"><div><i class="fa-solid fa-house"></i></div></a>
                <a onclick="addLektion()"><div><i id="active" class="fa-solid fa-plus"></i></div></a>
                <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    temp = `<div id="addLektion"><h1 id="name">Neue Lektion erstellen</h1>`
    temp += `<br><input class="input" id="lektionName" type="text" placeholder="Gib einen Titel ein wie 'Englisch - Kapitel 1: Welcome Back'" autofocus>`
    temp += `<div id='autoGenerate' onclick="loadAutoGenerate()">Auto Generate Table</div>`

    temp += "<table><tr><th>Begriff</th><th>Defintion</th></tr>"
    temp += `<tr><td class="begriff"><input class="begriffV" onclick="this.select()"></td><td class="definition"><input class="definitionV" id="lastTab" onclick="this.select()"></td></tr>`
    temp += `<tr><td colspan="2" id="lastRow" onclick="addRow()"><i class="fa-solid fa-plus"></td></tr>`
    temp += "</table>";
    temp += "<div id='confirm' onclick='saveLektion()'>Save</div>"

    document.getElementById('content').innerHTML = temp;
    
    document.getElementById("lastTab").addEventListener('keydown', function (e) {
        if (e.keyCode == 9) {
            addRow();
        } 
    });
}
// Load Edit Lektion
function editLektion(count, temp){
    let lektionName = allLektions.list[count].name;
    let lektionContent = allLektions.list[count].content;  

    if(temp == null){
        for(let i = 0; i < lektionContent.length - 1; i++){
            addRow();
        }
    }

    document.getElementById("lektionName").value = lektionName;
    for(let i = 0; i < lektionContent.length; i++){
        document.getElementsByClassName("begriffV")[i].value = lektionContent[i][0]
        document.getElementsByClassName("definitionV")[i].value = lektionContent[i][1]
    }

    let tempCont = document.getElementById('content').innerHTML

    tempCont = (tempCont.substring(0, tempCont.length-52));
    document.getElementById('content').innerHTML = tempCont;
    document.getElementById('addLektion').innerHTML += `<div id='confirm' onclick='saveEditLektion(${count})'>Save</div>`

    document.getElementById("lektionName").value = lektionName;
    for(let i = 0; i < lektionContent.length; i++){
        document.getElementsByClassName("begriffV")[i].value = lektionContent[i][0]
        document.getElementsByClassName("definitionV")[i].value = lektionContent[i][1]
    }
    document.getElementById("lastTab").addEventListener('keydown', function (e) {
        if (e.keyCode == 9) {
            addRow();
            editLektion(count, 1)
        } 
    });
}


// Load Search Lektion
function searchLektion() {
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
    content = allLektions.list[count].content
    list = random(content);

    wrongAnswers = new Array();
    tempContent = content;
    tempCount = count;
     
    let nav = `<a onclick="loadDashboard()" id="header"><div><img src="${img1}"></div></a>
                  <a onclick="loadDashboard()"><div><i id="active" class="fa-solid fa-house"></i></div></a>
                  <a onclick="addLektion()"><div><i class="fa-solid fa-plus"></i></div></a>
                  <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                  <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    let lektionName = allLektions.list[count].name;
    let lektionContent = allLektions.list[count].content;   

    currentCard = content[collumn][row]

    temp = ""
    temp += `<div id='lektionOverview'><h2>${lektionName}</h2><div><p onclick='loadKarteikarten()'>Karteikarten</p><p onclick='loadLernen()'>Lernen</p><p onclick='loadAntworten(${count})'>Antworten</p></div>`
    temp += "<table id='tableLektion'><tr><th>Begriff</th><th id='englisch' onclick='autoEnglisch()'>Definition</th></tr>"
    for (let i = 0; i < lektionContent.length; i++) {
        temp += `<tr><td class="begriff">${lektionContent[i][0]}</td><td class="definition">${lektionContent[i][1]}</td></tr>`
    }
    temp += "</table>"
    temp += `<section><p onclick='allLektions.removeLektion(${count})'>Entfernen</p><p onclick=' addLektion(); editLektion(${count});'>Bearbeiten</p></section></div>`
    
    document.getElementById('content').innerHTML = temp;
}