// import './style.css'

const addButton = document.querySelector("#add_button") as HTMLButtonElement;
const recipeNameField = document.querySelector("#recipe_name_field") as HTMLInputElement;
const recipeLinkField = document.querySelector("#recipe_link_field") as HTMLInputElement;
const recipeDurationField = document.querySelector("#recipe_duration_field") as HTMLInputElement;
const recipeNoteField = document.querySelector("#recipe_note_field") as HTMLInputElement;

let idCompteur = 0;

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
    recipeNoteResult.innerText = "Note : " + recipeNoteField.value;
    document.querySelector("#" + idNewRecipe + " .recipe_descriptions")?.appendChild(recipeNoteResult);
  
    const recipeDurationResult = document.createElement("p");
    recipeDurationResult.innerText = "Durée : " + recipeDurationField.value + " minutes";
    document.querySelector("#" + idNewRecipe + " .recipe_descriptions")?.appendChild(recipeDurationResult);
  
    
    const recipeImageFrame = document.createElement("article");
    recipeImageFrame?.setAttribute('class', 'recipe_image_frames column_recipes');
    recipeImageFrame.style.backgroundImage = "url(" + recipeLinkField.value + ")";
    document.querySelector("#" + idNewRecipe)?.appendChild(recipeImageFrame);

    // Effacement des champs du formulaire
    recipeNameField.value = "";
    recipeNoteField.value = "";
    recipeDurationField.value = "";
    recipeLinkField.value = "";
  }
});