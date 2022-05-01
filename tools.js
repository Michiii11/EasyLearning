// Tools for addLektion
function addRow(row) {
    let begriff, definition

    if(document.getElementsByClassName("begriffV")[row]){
        begriff = document.getElementsByClassName("begriffV")[row].value;
    } else{
        begriff = ""
    }

    if(document.getElementsByClassName("definitionV")[row]){
        definition = document.getElementsByClassName("definitionV")[row].value;
    } else{
        definition = ""
    }
    
    newLektion.setNewRow([begriff, definition]);

    addLektion();

    // Fokus auf die nächste Spalte
    let begriffV = document.querySelectorAll(".definitionV");
    begriffV[newLektion.content.length - 1].focus();
}

function removeRow(row) {
    newLektion.removeRow(row);
    addLektion();
}

function saveLektion(type) {
    // type == Edited Lektion - !type == New Lektion

    if(type != null){
        let begriff = document.getElementsByClassName("begriffV")
        let definition = document.getElementsByClassName("definitionV")

        newLektion.clear();
        newLektion.setName(document.getElementById("lektionName").value)
    
        for(let i = 0; i < begriff.length; i++){
            newLektion.setNewRow([begriff[i].value, definition[i].value])
        }

        allLektions.replaceLektion(type, newLektion.name, newLektion.content)
    } else{
        let tempLength = document.getElementsByClassName("definitionV").length
        addRow(tempLength-1)
        allLektions.addNewLektion(newLektion.name, newLektion.content);
        content = allLektions.list[0].content;
    }

    loadDashboard();
}

function makeLektion(elem) {
    document.getElementById("content").innerHTML = ``
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



function loadAutoGenerate() {
    let temp = `<div id='loadAutoGenerate'>`
    temp += `<textarea id="text"></textarea>`
    temp += `<div>
    <a>Zwischen Begriffen und Definition</a>  
    <div class="toggle-buttons">
        <input type="radio" id="a1" name="group-a"/>
        <label for="b1">Tab</label>
        <input type="radio" id="a2" name="group-a"/>
        <label for="b2">Komma</label>
        <input type="radio" id="a3" name="group-a" checked/>
        <label for="b3"><input name="text" placeholder="-"></label>
    </div>`

    temp += `
    <a>Zwischen Karten</a>  
    <div class="toggle-buttons-2">
        <input type="radio" id="b1" name="group-b"/>
        <label for="b1">Tab</label>
        <input type="radio" id="b2" name="group-b"/>
        <label for="b2">Komma</label>
        <input type="radio" id="b3" name="group-b" checked/>
        <label for="b3"><input name="text" placeholder='ENTER'></label>
    </div>`

    temp += `<div id='confirm' onclick="loadLektion()">Save</div></div>`
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
    elem = elem.split(13);
    for (let i = 0; i < elem.length; i++) {
        elem[i] = elem[i].split(189)
    }

    loadAutoGenerate();
    let temp = "<table id='tableLektion'><tr><th>Begriff</th><th id='englisch' onclick='autoEnglisch()'>Definition</th></tr>"
    for (let i = 0; i < elem[0].length; i++) {
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

// Function to get a Random ordered List of Numbers
function random(temp) {
    let list = new Array(temp.length);
    for (let i = 0; i < temp.length; i++) {
        list[i] = i;
    }
    list = list.sort(() => Math.random() - 0.5)

    return list;
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