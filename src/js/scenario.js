window.addEventListener('load',()=>{
    miseEnPlace()
})


async function miseEnPlace(){
    miseAJourAffichage();
    document.querySelector("#ajouter-membre-button").addEventListener("click",()=>{
        const nom = document.querySelector("#nom-nouveau-membre").value;
        ajoutMembre(nom);
    })

    document.querySelector("#ajouter-film-button").addEventListener("click",()=>{
        const nom = document.querySelector("#titre-nouveau-film").value;
        console.log(nom);
        ajoutFilm(nom);
    })

    document.querySelector("#choix-membre").addEventListener("change", () => {
        currentUser = event.target.value
        console.log(event.target.value)
        miseAJourAffichage()
    })

    function myFunction() {
        var popup = document.getElementById("myPopup");

    }
    let popUpFilm = document.getElementsByClassName("popUpFilm");
    /*for (let popUpFilmElement of popUpFilm) {
        popUpFilmElement.addEventListener("click",()=>{
            popUpFilmElement.classList.toggle("show");
        });
    }*/
}

async function miseAJourAffichage(){
    let req = await fetch(`php/get.php?q=all`)
    allData = await req.json()
    remplirMembre(allData.membres)
    remplirFilm(allData.films)
}





//Tom

//Clément
//TODO: Suppression d'un film
//TODO: Suppression d'un membre