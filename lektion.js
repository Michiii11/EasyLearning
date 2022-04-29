class Lektion {
    constructor() {
        this.list = new Array();
    }
    addNewLektion(n, c) {
        let newLektion = {
            name: n,
            content: c
        }

        this.list.push(newLektion);
        localStorage["lektionSaves"] = JSON.stringify(allLektions.list);
        loadDashboard();
    }
    removeLektion(place){
        this.list.splice(place, 1);
        localStorage["lektionSaves"] = JSON.stringify(allLektions.list);
        console.log(`Successfully cleared ${place+1}. Lektion`)
        loadDashboard();
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

// Localstorage swap with List
if (!localStorage["lektionSaves"]) {
    allLektions = new Lektion();
    localStorage["lektionSaves"] = JSON.stringify(allLektions.list);
} else {
    allLektions = new Lektion();
    allLektions.setData(JSON.parse(localStorage["lektionSaves"]))
}
console.log(allLektions.list);



class newLektion{
     constructor() {
        this.name;
        this.content = new Array();
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
newLektion = new newLektion();