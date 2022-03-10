// Function to Switch between Dark and White Mode
mode = "WHITE"
function changeMode(){
    if(mode == "BLACK"){
        console.log("BLACK");
        mode = "WHITE"
        document.getElementById("switch").innerHTML = `<i class="fa-solid fa-toggle-on">`
        document.documentElement.style.setProperty('--background', "rgb(29, 29, 29)");
        document.documentElement.style.setProperty('--color', "rgb(240,240,240)"); 
        document.documentElement.style.setProperty('--darkShadow', "20px 20px 60px #191919,-20px -20px 60px #212121");
        document.documentElement.style.setProperty('--dark1', "#1a1a1a");
        document.documentElement.style.setProperty('--dark2', "#1f1f1f");
    }
    else if(mode == "WHITE"){
        mode = "BLACK"
        document.getElementById("switch").innerHTML = `<i class="fa-solid fa-toggle-off">`
        document.documentElement.style.setProperty('--background', "rgb(240,240,240)");
        document.documentElement.style.setProperty('--color', "rgb(29, 29, 29)");
        document.documentElement.style.setProperty('--darkShadow', "20px 20px 60px #cccccc,-20px -20px 60px #ffffff");
        document.documentElement.style.setProperty('--dark1', "#d8d8d8");
        document.documentElement.style.setProperty('--dark2', "#ffffff");
    }
}

loadDashboard();

function loadDashboard(){
    document.getElementById("content").innerHTML = `<form><input id="input" type="text" onchange="makeLektion(this)" placeholder="/baum/haus/..."></form>`
}
function addLektion(){

}
function searchLektion(){

}
