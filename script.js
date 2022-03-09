// Function to Switch between Dark and White Mode
function changeMode(){
    if(localStorage[0] == "BLACK"){
        localStorage[0] = "WHITE"
        document.getElementById("switch").innerHTML = `<i class="fa-solid fa-toggle-on">`
        document.documentElement.style.setProperty('--background', "rgb(29, 29, 29)");
        document.documentElement.style.setProperty('--color', "rgb(240,240,240)"); 
    }
    else{
        localStorage[0] = "BLACK"
        document.getElementById("switch").innerHTML = `<i class="fa-solid fa-toggle-off">`
        document.documentElement.style.setProperty('--background', "rgb(240,240,240)");
        document.documentElement.style.setProperty('--color', "rgb(29, 29, 29)");
    }
}