class Lektion {
    /**
     * Inits an empty Lektion
     */
    constructor() {
        this.list = new Array();
    }
    /**
     * Creates a new Lektion and saves it in the list (array)
     * @param {String} n  - Name of the Lektion
     * @param {String} c  - Content of the Lektion
     */
    addNewLektion(n, c) {
        let newLektion = {
            name: n,
            content: c
        }

        this.list.push(newLektion);
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
