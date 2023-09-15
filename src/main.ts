// import './style.css'

const recipeNameField = document.querySelector("#recipe_name_field") as HTMLInputElement;
const recipeNoteField = document.querySelector("#recipe_note_field") as HTMLInputElement;
const recipeDurationField = document.querySelector("#recipe_duration_field") as HTMLInputElement;
const recipeLinkField = document.querySelector("#recipe_link_field") as HTMLInputElement;
const addButton = document.querySelector("#add_button") as HTMLButtonElement;

let recipeNameValue:string;
let recipeNoteValue:number;
let recipeDurationValue:number;
let recipeLinkValue:string;

let idCompteur = 0 as number;

function addRecipesInTheList(recipeNameValue:string, recipeNoteFieldValue:number, recipeDurationFieldValue:number, recipeLinkFieldValue:string){
  if(idCompteur == 0) {
    const myRecipesTitle = document.createElement("h2");
    myRecipesTitle.innerText = "Mes recettes";
    document.querySelector('#app')?.appendChild(myRecipesTitle);
  }

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
  recipeTitleResult.innerText = recipeNameValue;
  document.querySelector("#" + idNewRecipe + " .recipe_descriptions")?.appendChild(recipeTitleResult);

  const recipeNoteResult = document.createElement("p");
  recipeNoteResult.innerText = "Note : " + recipeNoteFieldValue + "/5";
  document.querySelector("#" + idNewRecipe + " .recipe_descriptions")?.appendChild(recipeNoteResult);

  const recipeDurationResult = document.createElement("p");
  recipeDurationResult.innerText = "Durée : " + recipeDurationFieldValue + " minutes";
  document.querySelector("#" + idNewRecipe + " .recipe_descriptions")?.appendChild(recipeDurationResult);

  
  const recipeImageFrame = document.createElement("article");
  recipeImageFrame?.setAttribute('class', 'recipe_image_frames column_recipes');
  recipeImageFrame.style.backgroundImage = "url(" + recipeLinkFieldValue + ")";
  document.querySelector("#" + idNewRecipe)?.appendChild(recipeImageFrame);
}

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

async function getAll(){
  const response = await fetch("http://localhost:3032/get_all_recipes/")
  const allRecipes = await response.json()
  console.log("Toutes mes recettes = ", allRecipes);
  
  allRecipes.forEach((recipe: any) => {
    addRecipesInTheList(recipe.nom, recipe.note, recipe.duree, recipe.url)
  })
}

// à executer lors du raffraichissement de la page
getAll();

addButton.addEventListener("click", function(event){

  if(recipeNameField.value != "" && recipeNoteField.value != "" && recipeDurationField.value && recipeLinkField.value != "") {
    
    event.preventDefault() // Annulation du comportement par défault du formulaire (qui ne doit pas être envoyé dans le cadre de ce projet)

    recipeNameValue = recipeNameField.value;
    recipeNoteValue = parseInt(recipeNoteField.value);
    recipeDurationValue = parseInt(recipeDurationField.value);
    recipeLinkValue = recipeLinkField.value;

    addRecipesInTheList(recipeNameValue, recipeNoteValue, recipeDurationValue, recipeLinkValue);

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
    recipeNoteField.value = "";
    recipeDurationField.value = "";
    recipeLinkField.value = "";
  }
});