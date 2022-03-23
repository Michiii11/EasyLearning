loadDashboard();

// Function to Switch between Dark and White Mode
function changeMode() {
    //Swap Main Colors
    let temp = getComputedStyle(document.documentElement).getPropertyValue('--color1');
    document.documentElement.style.setProperty('--color1', getComputedStyle(document.documentElement).getPropertyValue('--color2'));
    document.documentElement.style.setProperty('--color2', temp);

    //Swap Shadows
    temp = getComputedStyle(document.documentElement).getPropertyValue('--lightShadow');
    document.documentElement.style.setProperty('--lightShadow', getComputedStyle(document.documentElement).getPropertyValue('--darkShadow'));
    document.documentElement.style.setProperty('--darkShadow', temp);

    //Swap Box Colors 1
    temp = getComputedStyle(document.documentElement).getPropertyValue('--darkBox1');
    document.documentElement.style.setProperty('--darkBox1', getComputedStyle(document.documentElement).getPropertyValue('--lightBox1'));
    document.documentElement.style.setProperty('--lightBox1', temp);

    //Swap Box Colors 2
    temp = getComputedStyle(document.documentElement).getPropertyValue('--darkBox2');
    document.documentElement.style.setProperty('--darkBox2', getComputedStyle(document.documentElement).getPropertyValue('--lightBox2'));
    document.documentElement.style.setProperty('--lightBox2', temp)
}

function loadDashboard() {
    let nav = `<a onclick="loadDashboard()"><div><h3>Easy Learning</h3></div></a>
                <a onclick="loadDashboard()"><div><i id="active" class="fa-solid fa-house"></i></div></a>
                <a onclick="addLektion()"><div><i class="fa-solid fa-plus"></i></div></a>
                <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    temp = "";
    temp += `<div id="previewField">`
    temp += `<div class="preview" onclick="loadLektion()"><h1>Titel</h1><p>10 Begriffe</p></div>`
    temp += `<div class="preview" onclick="loadLektion()"><h1>Titel</h1><p>10 Begriffe</p></div>`
    temp += `<div class="preview" onclick="loadLektion()"><h1>Titel</h1><p>10 Begriffe</p></div>`
    temp += `<div class="preview" onclick="loadLektion()"><h1>Titel</h1><p>10 Begriffe</p></div>`
    temp += `<div class="preview" onclick="loadLektion()"><h1>Titel</h1><p>10 Begriffe</p></div>`
    temp += `<div class="preview" onclick="loadLektion()"><h1>Titel</h1><p>10 Begriffe</p></div>`
    temp += `<div class="preview" onclick="loadLektion()"><h1>Titel</h1><p>10 Begriffe</p></div>`
    temp += `</div>`

    document.getElementById('content').innerHTML = temp;
}

function addLektion() {
    let nav = `<a onclick="loadDashboard()"><div><h3>Easy Learning</h3></div></a>
                <a onclick="loadDashboard()"><div><i class="fa-solid fa-house"></i></div></a>
                <a onclick="addLektion()"><div><i id="active" class="fa-solid fa-plus"></i></div></a>
                <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    content = `<div id="addLektion"><h1>Neue Lektion erstellen</h1>`
    content += `<form><br><input class="input" id="lektionName" type="text" placeholder="Gib einen Titel ein wie 'Englisch - Kapitel 1: Welcome Back'"></form>`
    content += `<div id='autoGenerate' onclick="loadAutoGenerate()">Auto Generate Table</div>`

    content += "<table><tr><th>Begriff</th><th>Defintion</th></tr>"
    content += `<tr><td class="begriff" onClick="javascript:onSelect(this)"><input value="" onclick="this.select()"></td><td class="definition"><input value="" onclick="this.select()"></td></tr>`
    content += `<tr><td colspan="2" id="lastRow" onclick="addRow()"><i class="fa-solid fa-plus"></td></tr>`
    content += "</table>";
    content += "<div id='confirm' onclick='saveLektion()'>Save</div>"

    document.getElementById('content').innerHTML = content;
}

function searchLektion() {

}

function addRow() {
    content = content.substr(0, content.length - 150);
    content += `<tr><td onClick="javascript:onSelect(this)"><input value="" onclick="this.select()"></td><td><input value="" onclick="this.select()"></td></tr>`
    content += `<tr><td colspan="2" id="lastRow" onclick="addRow()"><i class="fa-solid fa-plus"></td></tr>`
    content += "</table>";
    content += "<div id='confirm' onclick='saveLektion()'>Save</div>"
    document.getElementById("content").innerHTML = content;
}