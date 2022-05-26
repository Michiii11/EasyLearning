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


let lektion1 = []
allLektions.addOnlineLektion('Unit 1 More 1', lektion1, 'Englisch', 'Deutsch')
allLektions.addOnlineLektion('Unit 2 More 1', lektion1, 'Englisch', 'Deutsch')
allLektions.addOnlineLektion('Unit 3 More 1', lektion1, 'Englisch', 'Deutsch')

let unidad1 = [["uno", "1"], ["dos", "2"], ["tres", "3"], ["cuatro", "4"], ["cinco", "5"], ["seis", "6"], ["siete", "7"], ["ocho", "8"], ["nueve", "9"], ["diez", "10"]]
let unidad2 = [["la nube", "Wolke"], ["el caballo", "Pferd"], ["el restaurante", "Restaurant"], ["la mujer", "Frau"], ["el nino", "Junge"], ["la nina", "Mädchen"], ["el hombre", "Mann"], ["los turistas", "Touristen"], ["Veo", "Ich sehe"], ["la estatua", "Statue"], ["el coche", "Auto"], ["Nos puede hacer una foto, por favor?", "Können Sie bitte ein Bild von uns machen?"], ["la bandera", "Flagge"], ["el techo", "Dach"], ["el relieve", "Relief"], ["las columnas", "Säulen"], ["el museo", "Museum"], ["la escultura", "Skulptur"], ["el pavo real", "Pfau"], ["la entrada", "Eingang"], ["la farola", "Laterne"], ["el árbol", "Baum"], ["la pintura", "Gemälde"], ["Disculpe, senor!", "Entschuldigen Sie!"], ["Donde están los servicios?", "Wo sind die Toiletten?"], ["la fuente", "Springbrunnen"], ["el parque", "Park"], ["bonitio", "schön"], ["feo", "hässlich"], ["grande", "groß"], ["pequeno", "klein"], ["amable", "freundlich"], ["alarmante", "beängstigend"], ["viejo", "alt"], ["moderno", "modern"], ["la postal", "Postkarte"], ["la libreta", "Notizbuch"], ["el lápiz", "Bleistift"], ["el bolígrafo", "Kugelschreiber"], ["el bolso", "Tasche"], ["los pendientes", "Ohrringe"], ["el llavero", "Schlüsselanhänger"], ["el libro", "Buch"], ["la camiseta", "T-Shirt"]]
allLektions.addOnlineLektion('Unidad 1', unidad1, 'Spanisch', 'Deutsch')
allLektions.addOnlineLektion('Unidad 2', unidad2, 'Spanisch', 'Deutsch')
allLektions.addOnlineLektion('Unidad 3', lektion1, 'Spanisch', 'Deutsch')