// import './style.css'

const addButton = document.querySelector("#add_button") as HTMLButtonElement;
const recipeNameField = document.querySelector("#recipe_name_field") as HTMLInputElement;
const recipeLinkField = document.querySelector("#recipe_link_field") as HTMLInputElement;
const recipeDurationField = document.querySelector("#recipe_duration_field") as HTMLInputElement;
const recipeNoteField = document.querySelector("#recipe_note_field") as HTMLInputElement;

let idCompteur = 0;

/*
async function init() {
  const response = await fetch("http://localhost:3032/send-name", {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    method: "POST",
    body: JSON.stringify({
      name: "John",
    }),
  })
  console.log(response)
  const data = await response.json()
  console.log(data)
}
*/

async function onAdd(recipeNameField:HTMLInputElement, recipeDurationField:HTMLInputElement, recipeNoteField:HTMLInputElement, recipeLinkField:HTMLInputElement) {
  const response = await fetch("http://localhost:3032/add_recipes", {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    method: "POST",
    body: JSON.stringify({
      name: recipeNameField.value,
      duration: parseInt(recipeDurationField.value),
      note: parseInt(recipeNoteField.value),
      link: recipeLinkField.value
    }),
  })
  console.log(response)
  const data = await response.json()
  console.log(data)
}

addButton.addEventListener("click", function(event){

  if(recipeNameField.value != "" && recipeNoteField.value != "" && recipeDurationField.value && recipeLinkField.value != "") {
    
    if(idCompteur == 0) {
      const myRecipesTitle = document.createElement("h2");
      myRecipesTitle.innerText = "Mes recettes";
      document.querySelector('#app')?.appendChild(myRecipesTitle);
    }

    event.preventDefault() // Annulation du comportement par défault du formulaire (qui ne doit pas être envoyé dans le cadre de ce projet)
  
    let idNewRecipe = "recipe_" + idCompteur;
    idCompteur++;
  
    console.log(idNewRecipe);
    
    const recipeContenair = document.createElement("section");
    recipeContenair?.setAttribute('id', idNewRecipe);
    recipeContenair?.setAttribute('class', 'recipe_contenairs');
    document.querySelector('#app')?.appendChild(recipeContenair);
    
    const recipeDescription = document.createElement("article");
    recipeDescription?.setAttribute('class', 'recipe_descriptions column_recipes');
    document.querySelector("#" + idNewRecipe)?.appendChild(recipeDescription);
  
    const recipeTitleResult = document.createElement("h3");
    recipeTitleResult.innerText = recipeNameField.value;
    document.querySelector("#" + idNewRecipe + " .recipe_descriptions")?.appendChild(recipeTitleResult);
  
    const recipeNoteResult = document.createElement("p");
    recipeNoteResult.innerText = "Note : " + recipeNoteField.value + "/5";
    document.querySelector("#" + idNewRecipe + " .recipe_descriptions")?.appendChild(recipeNoteResult);
  
    const recipeDurationResult = document.createElement("p");
    recipeDurationResult.innerText = "Durée : " + recipeDurationField.value + " minutes";
    document.querySelector("#" + idNewRecipe + " .recipe_descriptions")?.appendChild(recipeDurationResult);
  
    
    const recipeImageFrame = document.createElement("article");
    recipeImageFrame?.setAttribute('class', 'recipe_image_frames column_recipes');
    recipeImageFrame.style.backgroundImage = "url(" + recipeLinkField.value + ")";
    document.querySelector("#" + idNewRecipe)?.appendChild(recipeImageFrame);

    // envoi de la donnée du frontend vers le backend
    /*
    fetch("http://localhost:3032/add_recipe/" + recipeNameField.value + "/" + recipeDurationField.value + "/" + recipeNoteField.value + "/", {
      method: "POST",
    });
    */

    // Façon plus efficace pour envoyer la donnée (du frontend au backend) avec la méthode POST car on peut gérer des formats de données complexes (ex. : hyperliens, tableaux, etc.) sans devoir les rajouter dans des paramettres de la route)
    onAdd(recipeNameField, recipeDurationField, recipeNoteField, recipeLinkField);

    // Effacement des champs du formulaire
    recipeNameField.value = "";
    recipeDurationField.value = "";
    recipeNoteField.value = "";
    recipeLinkField.value = "";
  }
});