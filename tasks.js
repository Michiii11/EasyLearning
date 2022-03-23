content = [["Haus", "House"], ["Maus", "Mouse"], ["Katze", "Cat"]]
let row = 0;
let collumn = 0;
let currentCard = content[collumn][row]

function loadKarteikarten(){
    let playground = "";
    playground += `<div id="playground"><i onclick="skip(-1)" class="fa-solid fa-angle-left"></i>`
    playground += `<div id='card' onclick='swap()'><a>${currentCard}</a></div>`
    playground += `<i onclick="skip(1)" class="fa-solid fa-angle-right"></i></div>`

    document.getElementById("content").innerHTML = playground;
}
function swap(){
    if(row == 0){
        row = 1;
    } else{
        row = 0;
    }
    currentCard = content[collumn][row]
    loadKarteikarten();
}
function skip(sum){
    if(collumn + sum >= 0 && collumn + sum < content.length){
        row = 0;
        collumn = collumn + sum;
        currentCard = content[collumn][row]
        loadKarteikarten();
    }
}

function loadLernen(){

}

let currentWord = 0;
let playground = "";

function loadAntworten(){
    if(playground == ""){
        playground += `<div id="playground">`
        playground += `<div id='answer'><a>${content[currentWord][0]}</a>`
        playground += `<input type="text" id="antwort" autofocus="autofocus" onfocus="this.select()" onchange="checkAnswer()">`
        playground += `</div>`
    } else{
        playground += `<div id='answer'><a>${content[currentWord][0]}</a>`
        playground += `<a>${content[currentWord][1]}</a>`
        playground += `<input type="text" id="antwort" autofocus="autofocus" onfocus="this.select()" onchange="checkAnswer()">`
        playground += `</div>`
    }

    document.getElementById("content").innerHTML = playground;
    playground = "";
}
function checkAnswer(){
    if(content[currentWord][1].toString().toLowerCase() == document.getElementById("antwort").value.toString().toLowerCase()){
        document.getElementById("content").innerHTML = "";
        if(currentWord + 1 < content.length){
            currentWord+=1;
            loadAntworten();
        } else{
            playground += `<div id='playground'>`
            playground += `<div id="answer"><a>Finished</a></div>`
            playground += `</div>`
            document.getElementById("content").innerHTML = playground;
            playground = "";
        }
    } else{
        playground += `<div id="playground">`
        loadAntworten();
    }
}


