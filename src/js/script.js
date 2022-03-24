let currentUser
let table_film = document.querySelector("#table-films");
function remplirMembre(tableau) {
    //console.log(tableau);
    let membre = document.querySelector("#choix-membre");
    let membre_table = document.querySelector("#table-membres");
    membre.innerHTML = "";
    membre_table.innerHTML = "";

    for (let i = 0; i < tableau.length; i++) {
        let option_membre = document.createElement("option");
        option_membre.value = tableau[i].id;
        option_membre.innerText = tableau[i].nom;
        if (!currentUser && i === 0) {
            currentUser = tableau[i].id
        } else if (tableau[i].id === currentUser) option_membre.selected = true

        membre.appendChild(option_membre)

        //Tableau
        let ligne = document.createElement("tr");

        //Pour supprimer
        let close = document.createElement("img");
        close.src = "/ressources/close.png";
        close.setAttribute("data-id", tableau[i].id);
        ligne.appendChild(close);
        close.addEventListener("click",()=>{
           deleteMembre(tableau[i].id);
           miseAJourAffichage();
        });


        let sous_ligne = document.createElement("td");
        sous_ligne.innerText = tableau[i].nom;
        ligne.appendChild(sous_ligne);
        let sous_ligne2 = document.createElement("td");
        sous_ligne2.innerText = getNombreNotesById(tableau[i].id)
        ligne.appendChild(sous_ligne2);
        membre_table.appendChild(ligne);


        let dataMembre = getAllInfoMembre(tableau[i].id)
        sous_ligne.addEventListener("click",()=>{
            let msg = "Notes de " + dataMembre[0] + '\n';
            for (let i = 1; i < dataMembre.length; i++) {
                msg += dataMembre[i][0] + " : " + dataMembre[i][1] + '\n';
            }
            alert(msg);
        })
    }
}



//On donne un tableau avec le nom du film et la moyenne des notes
function remplirFilm(tableau) {

    table_film.innerHTML = "";

    for (let i = 0; i < tableau.length; i++) {

        let ligne = document.createElement("tr");
        ligne.setAttribute("data-id", tableau[i].id);

        //Pour supprimer
        let close = document.createElement("img");
        close.src = "/ressources/close.png";
        close.setAttribute("data-id", tableau[i].id);
        ligne.appendChild(close);
        close.addEventListener("click",()=>{
            deleteFilm(tableau[i].id);
            miseAJourAffichage();
        });

        //Pour le nom du film
        let sous_ligne = document.createElement("td");
        sous_ligne.innerText = tableau[i].titre;
        sous_ligne.classList.add("popup_film");
        ligne.appendChild(sous_ligne);
        ligne.addEventListener("click",()=>{
            console.log("Bonjour" + i);
            //Méthode qui affiche le span
        })

        //Pour la moyenne des notes
        let sous_ligne2 = document.createElement("td");
        sous_ligne2.innerText = "" + i;
        ligne.appendChild(sous_ligne2);
        table_film.appendChild(ligne);

        //Pour remplir la note
        let sous_ligne3 = document.createElement("td");

        let noteM = getAverageByFilmId(tableau[i].id)
        if (noteM) sous_ligne2.innerText = noteM.toFixed(1)
        else sous_ligne2.innerText = "NonNoté"


        //Pour remplir les infos que l'on affiche lorsque l'on clique sur le film

        let dataFilm = getAllInfoFilm(tableau[i].id)
        sous_ligne.addEventListener("click",()=>{
            let msg = "Notes de " + dataFilm[0] + '\n';
            for (let i = 1; i < dataFilm.length; i++) {
                msg += dataFilm[i][0] + " : " + dataFilm[i][1] + '\n';
            }
            alert(msg);
        })


        ligne.appendChild(sous_ligne2);
        ligne.appendChild(makeNoteSelector(tableau[i].id));
        table_film.appendChild(ligne);

    }
}

function makeNoteSelector(id) {
    let element = document.createElement("td");
    let note_selector = document.createElement("select");
    let null_value = document.createElement("option");
    null_value.value = "-1"
    null_value.innerText = "-";
    note_selector.appendChild(null_value)

    for (let i = 0; i <= 5; i++) {
        let option = document.createElement("option");
        option.value = "" + i;
        option.innerText = "" + i;
        note_selector.appendChild(option);
    }

    let note = getNote(id, currentUser)
    if (note) note_selector.children[parseInt(note) + 1].selected = true

    note_selector.addEventListener('change', () => {
        //console.log(`valeur : ${note_selector.value}, idFilm : ${note_selector.parentElement.parentElement.dataset.id}, user : ${getCurrentUser()}`)
        //console.log(id)
        ajoutNote(parseInt(note_selector.value), parseInt(note_selector.parentElement.parentElement.dataset.id), parseInt(getCurrentUser()))
            .then(data => miseAJourAffichage())
    })
    element.appendChild(note_selector);
    return element;
}

function notesUser(id){
    let note = document.querySelector("#notes");
    let tableau_notes = getAllNotes().JSON.parse();
    //console.log(tableau_notes);
    for (let i = 0; i < tableau_notes.length; i++) {
        if (tableau_notes[i].id_membre === id){
            notes.appendChild(document.createElement("p").innerText = tableau_notes[i].id_film + ":" + tableau_notes[i].valeur);
        }
    }
    miseAJourAffichage();
}

function getCurrentUser() {
    const select = document.getElementById("choix-membre")
    currentUser = select.value
    return select.value
}
