class Lektion {
    constructor() {
        this.list = new Array();
        this.OnlineList = new Array();
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
    addOnlineLektion(n, c, b, d){
        let newLektion = {
            name: n,
            content: c,
            bSprache: b,
            dSprache: d
        }

        this.OnlineList.push(newLektion);
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

let animals = [["Chicken", "Huhn"], ["Pig", "Schwein"], ["Cow", "Kuh"], ["Elephant", "Elefant"], ["Giraffe", "Giraffe"], ["Chipmunk", "Streifenhörnchen"], ["Whale", "Wal"], ["Dog", "Hund"], ["Cat", "Katze"], ["Monkey", "Affe"]]
let family = [["Dad", "Vater"], ["Mum", "Mutter"], ["Brother", "Bruder"], ["Sister", "Schwester"], ["Siblings", "Geschwister"], ["Grandfather", "Opa"], ["Grandmother", "Oma"], ["Aunt", "Tante"], ["Uncle", "Onkel"], ["Godfather", "Taufpate"]]
let restaurant = [["Plate", "Teller"], ["Fork", "Gabel"], ["Knife", "Messer"], ["Spoon", "Löffel"], ["Wine", "Wein"], ["Starter", "Vorspeise"], ["Main course", "Hauptspeise"], ["Desert", "Nachspeise"], ["soup", "Suppe"], ["salad", "Salat"]]
let holidays = [["beach", "Strand"], ["Sunshine", "Sonnenstrahlen"], ["Sun glasses", "Sonnenbrille"], ["Sun cream", "Sonnencreme"], ["Snorkel", "Schnorchel"], ["Flippers", "Flossen"], ["Camera", "Kamera"], ["Backpack", "Rucksack"], ["Map", "Karte"], ["Camp fire", "Lagerfeuer"]]
let tools = [["Scissors", "Schere"], ["File", "Feile"], ["Cordless drill", "Bohrmaschine"], ["Screwdriver", "Schraubendreher"], ["Chainsaw", "Kettensäge"], ["Screw", "Schraube"], ["Ladder", "Leiter"], ["Sandpaper", "Schleifpapier"], ["Measuring tape", "Messband"], ["Ruler", "Lineal"]]
let sports = [["Run", "Laufen"], ["Jump", "Springen"], ["Pass", "Passen"], ["Throw", "Werfen"], ["Alpine skiing", "Ski fahren"], ["Goal", "Tor"], ["Football", "Fußball"], ["Table-tennis", "Tischtennis"], ["Net", "Netz"], ["Racket", "Schläger"]]
allLektions.addOnlineLektion('Animals', animals, 'Englisch', 'Deutsch')
allLektions.addOnlineLektion('Family', family, 'Englisch', 'Deutsch')
allLektions.addOnlineLektion('Restaurant', restaurant, 'Englisch', 'Deutsch')
allLektions.addOnlineLektion('Holidays', holidays, 'Englisch', 'Deutsch')
allLektions.addOnlineLektion('Tools', tools, 'Englisch', 'Deutsch')
allLektions.addOnlineLektion('Sport', sports, 'Englisch', 'Deutsch') 