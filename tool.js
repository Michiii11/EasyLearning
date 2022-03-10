function makeLektion(elem) {
    document.getElementById("content").innerHTML = ``
    elem = elem.value;
    char = elem.charAt(0);
    elem = elem.split(char)


    let content = "<table><tr><th>Deutsch</th><th>Englisch</th></tr>"
    for (let i = 1; i < elem.length; i++) {
        content += `<tr><td onClick="javascript:onSelect(this)"><input value="${elem[i]}" onclick="this.select()"></td><td><input value="" onclick="this.select()"></td></tr>`
    }
    content += "</table>";
    content += "<div id='confirm'>Save</div>"
    document.getElementById("content").innerHTML = content;
}

function saveLektion(elem) {
    
}