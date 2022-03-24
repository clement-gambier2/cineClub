let allData
let dataM

/**
 * Exemple de fonction pour obtenir toutes les informations de la base de données avec le script php/get.php
 * (ici les données sont affichées dans la console)
 */
function getAllData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/get.php?q=all', true);     // demande des données par php/get.php
    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            //console.log(response);
            allData = response
        }
    };
    xhr.send();
}

/**
 * Exemple de fonction pour exécuter une requête POST sur la base de données avec le script php/set.php
 * Ici la requête supprime le membre dont l'id est passé en paramètre
 *
 * (cf. README pour les paramètres de php/set.php)
 */
function deleteMembre(id_membre) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/set.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (this.status === 200) {
            console.log("OK.");
        }
    }
    xhr.send('action=delete&membre=' + id_membre);
}

async function deleteFilm(id_film){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/set.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (this.status === 200) {
            console.log("OK.");
        }
    }
    xhr.send('action=delete&film=' + id_film);
}






 function getNombreNotesById(id) {
    let compteur = 0
    for (let i = 0; i < allData.notes.length; i++) {
        if (allData.notes[i].id_membre === id) {
            compteur++
        }
    }
    return compteur
}

function getAverageByFilmId(id) {
    let compteur = 0, somme = 0
    let notes = [allData.notes.length]
    for (let elt of allData.notes) {
        //console.log(elt)
        if (parseInt(elt.id_film) === parseInt(id)) {
            somme+=parseInt(elt.valeur)
            compteur++
        }
    }
    return (somme / compteur)
}

async function ajoutNote(note, film, user) {
    let f = await new FormData
    await f.append('action', "update");
    await f.append('membre', user);
    await f.append('film', film);
    await f.append('note', note);

    await fetch(`php/set.php`, {
        method: 'post',
        body: f
    })
}

function ajoutFilm(film) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/set.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (this.status === 200) {
            console.log("OK.");
            miseAJourAffichage();
        }
    }
    xhr.send('action=add&titre=' + film);

}

function ajoutMembre(membre) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/set.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (this.status === 200) {
            console.log("OK.");
            miseAJourAffichage();
        }
    }
    xhr.send('action=add&nom=' + membre);

}

function getNote(film,user){
    for(let note of allData.notes){
        if (parseInt(note.id_membre) === parseInt(user) && parseInt(note.id_film) === parseInt(film)) return note.valeur
    }
}



function getAllInfoMembre(id){
    let tab = []
    tab[0] = getNomMembreByID(id)
    let index = 1
    for (let elt of allData.notes){
        if (parseInt(id) === parseInt(elt.id_membre)){
            let miniTab = []
            miniTab[0] = getNomFilmByID(elt.id_film)
            miniTab[1] = elt.valeur
            tab[index++] = miniTab
        }
    }
    return tab
}

 function getAllInfoFilm(id){
    let tab = []
    tab[0] = getNomFilmByID(id)
    let index = 1
    for (let elt of allData.notes){
        if (parseInt(id) === parseInt(elt.id_film)){
            let miniTab = []
            miniTab[0] = getNomMembreByID(elt.id_membre)
            miniTab[1] = elt.valeur
            tab[index++] = miniTab
        }
    }
    return tab
}
//TODO : Fonction qui retourne le nom du film à partir de l'id
function getNomFilmByID(id){
    for (let elt of allData.films){
        if (parseInt(elt.id) === parseInt(id)) return elt.titre
    }
    return ""
}

//TODO : Fonction qui retourne le nom de la personne à partir de l'id
function getNomMembreByID(id){
    for (let elt of allData.membres){
        if (parseInt(elt.id) === parseInt(id)) return elt.nom
    }
    return ""
}


