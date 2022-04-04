// Tools for addLektion
let lektionName;
let lektionContent;
let contentCount = 1;

function addRow() {
  contentCount++;
  temp = temp.substr(0, temp.length - 150);
  temp += `<tr><td><input value="" onclick="this.select()"></td><td><input value="" onclick="this.select()"></td></tr>`
  temp += `<tr><td colspan="2" id="lastRow" onclick="addRow()"><i class="fa-solid fa-plus"></td></tr>`
  temp += "</table>";
  temp += "<div id='confirm' onclick='saveLektion()'>Save</div>"
  document.getElementById("content").innerHTML = temp;
}
function saveLektion() {
  lektionName = document.getElementById('lektionName').value
  lektionContent = new Array(contentCount);
  for(let i = 0; i < lektionContent.length; i++){
    console.log(document.getElementsByClassName('begriff'))
    lektionContent[i] = [document.getElementsByClassName('begriff')[i].value][document.getElementsByClassName('definition')[i].value]
  }
  allLektions.addNewLektion(lektionName, lektionContent);
  console.log(allLektions.list)
  /*localStorage["lektionSaves"] = JSON.stringify(allLektions.list);*/
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

  for (let i = 0; i < document.getElementsByClassName("begriff").length; i++) {

  }
  lektion[lektionCount] = elem;
  document.getElementById("content").innerHTML = content;
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

function random(temp) {
  let list = new Array(temp.length);
  for (let i = 0; i < temp.length; i++) {
    list[i] = i;
  }
  list = list.sort(() => Math.random() - 0.5)
  return list;
}