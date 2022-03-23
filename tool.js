let content;
let lektion;
let lektionName = "";
let lektionCount = 0;

if(!localStorage["lektionSaves"]){
    lektion = ["", "", "", "", "", "", "", "", "", ""]
    console.log(lektion);
    for(let i = 0; i < lektion.length; i++){
        lektion[i] = new Array();
    }
} else{
    lektion = localStorage["lektionSaves"];
}

function makeLektion(elem) {
    document.getElementById("content").innerHTML = ``
    elem = elem.value;
    char = elem.charAt(0);
    elem = elem.split(char)
    lektionName = document.getElementById('lektionName');

    content = `<div id="addLektion"><h1>Neue Lektion erstellen</h1>`
    content += `<form><br><input class="input" id="lektionName" type="text" placeholder="Lektion 1">
               <br><input class="input" type="text" onchange="makeLektion(this)" placeholder="/baum/haus/..."></form>`
    content += "<table><tr><th>Begriff</th><th id='englisch' onclick='autoEnglisch()'>Definition</th></tr>"
    for (let i = 1; i < elem.length; i++) {
        content += `<tr><td class="begriff" onClick="javascript:onSelect(this)"><input value="${elem[i]}" onclick="this.select()"></td><td class="definition"><input value="" onclick="this.select()"></td></tr>`
    }
    content += `<tr><td colspan="2" id="lastRow" onclick="addRow()"><i class="fa-solid fa-plus"></td></tr>`
    content += "</table>";
    content += "<div id='confirm' onclick='saveLektion()'>Save</div>"

    for(let i = 0; i < document.getElementsByClassName("begriff").length; i++){
        
    }
    lektion[lektionCount] = elem;
    document.getElementById("content").innerHTML = content;
}

function autoEnglisch() {
    let lektionEnglisch;

    fetch("https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify({
                q: "",
                source: "de",
                target: "en",
                format: "text"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        // PARSE
        .then((response) => {
            console.log(response);
            return response.json();
        })
        // LOGGER
        .then((erg) => {
            console.log(erg);
            return erg;
        })
        .catch((error) => {
            console.log('Error: ', error);
        })

}

function addRow() {
    content = content.substr(0, content.length - 150);
    content += `<tr><td onClick="javascript:onSelect(this)"><input value="" onclick="this.select()"></td><td><input value="" onclick="this.select()"></td></tr>`
    content += `<tr><td colspan="2" id="lastRow" onclick="addRow()"><i class="fa-solid fa-plus"></td></tr>`
    content += "</table>";
    content += "<div id='confirm' onclick='saveLektion()'>Save</div>"
    document.getElementById("content").innerHTML = content;
}

function saveLektion() {
    localStorage["lektionSaves"] = lektion;
    loadLektion(lektion[lektionCount])
}
function loadLektion(thisLektion) {
    let nav = `<a onclick="loadDashboard()"><div><h3>Easy Learning</h3></div></a>
                <a onclick="loadDashboard()"><div><i class="fa-solid fa-house"></i></div></a>
                <a onclick="addLektion()"><div><i class="fa-solid fa-plus"></i></div></a>
                <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    content = [["Haus", "House"], ["Maus", "Mouse"]]
    let temp = ""
    temp += "<div><h2>Name</h2><h3>Lernen</h3><p>Karteikarten</p><p>Lernen</p><p>Antworten</p></div>"
    temp += "<table id='tableLektion'><tr><th>Begriff</th><th id='englisch' onclick='autoEnglisch()'>Definition</th></tr>"
    for (let i = 0; i < content[0].length; i++) {
        temp += `<tr><td class="begriff">${content[i][0]}</td><td class="definition">${content[i][1]}</td></tr>`
    }
    temp += "</table>"
    document.getElementById('content').innerHTML = temp;
}

function loadAutoGenerate(){
    let temp = `<div id='loadAutoGenerate'>`
    temp += `<textarea id="text"></textarea>`
    temp += `<div>
    <a>Zwischen Begriffen und Definition</a>  
    <div class="toggle-buttons">
        <input type="radio" id="a1" name="group-a"/>
        <label for="b1">Tab</label>
        <input type="radio" id="a2" name="group-a"/>
        <label for="b2">Komma</label>
        <input type="radio" id="a3" name="group-a" />
        <label for="b3"><input name="text" placeholder="-"></label>
    </div>`

    temp += `
    <a>Zwischen Karten</a>  
    <div class="toggle-buttons-2">
        <input type="radio" id="b1" name="group-b"/>
        <label for="b1">Tab</label>
        <input type="radio" id="b2" name="group-b"/>
        <label for="b2">Komma</label>
        <input type="radio" id="b3" name="group-b" />
        <label for="b3"><input name="text" placeholder='ENTER'></label>
    </div>`

    temp += `<div id='confirm' onclick='saveLektion()'>Save</div></div>`
    temp += `</div>`

    document.getElementById('content').innerHTML = temp;
}