class Lektion {
    constructor() {
        this.list = new Array();
    }
    addNewLektion(n, c, b, d) {
        let newLektion = {
            name: n,
            content: c,
            bSprache: b,
            dSprache: d
        }

        this.list.push(newLektion);
        localStorage["lektionSaves"] = JSON.stringify(allLektions.list);
        loadDashboard();
    }
    removeLektion(place){
        this.list.splice(place, 1);
        localStorage["lektionSaves"] = JSON.stringify(allLektions.list);
        loadDashboard();
    }
    replaceLektion(place, name, content){
        this.list[place].name = name;
        this.list[place].content = content;
        localStorage["lektionSaves"] = JSON.stringify(allLektions.list);
    }
    getName(place){
        return this.list[place].name
    }
    getContent(place){
        return this.list[place].content
    }
    getData() {
        return this.list
    }
    setData(arr) {
        this.list = arr
    }
}


class newLektion{
     constructor() {
        this.name;
        this.content = new Array();
        this.bSprache = "Englisch";
        this.dSprache = "Deutsch"
    }
    setName(name){
        this.name = name;
    }
    setNewRow(row){
        this.content.push(row);
    }
    clear(){
        this.content = new Array();
        this.name = "";
    }
    removeRow(place){
        this.content.splice(place, 1);
    }
}


// Localstorage swap with List
if (!localStorage["lektionSaves"]) {
    allLektions = new Lektion();
    localStorage["lektionSaves"] = JSON.stringify(allLektions.list);
} else {
    allLektions = new Lektion();
    allLektions.setData(JSON.parse(localStorage["lektionSaves"]))
}
newLektion = new newLektion();
console.log(allLektions.list);