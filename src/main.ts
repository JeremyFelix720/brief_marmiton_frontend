import './style.css'

const addButton = document.querySelector("#add_button") as HTMLButtonElement;
const recipeNameField = document.querySelector("#recipe_name_field") as HTMLInputElement;
const recipeLinkField = document.querySelector("#recipe_link_field") as HTMLInputElement;
const recipeDurationField = document.querySelector("#recipe_duration_field") as HTMLInputElement;
const recipeNoteField = document.querySelector("#recipe_note_field") as HTMLInputElement;



addButton.addEventListener("click", function(){
  console.log("j'ai cliqué sur le bouton !");

  /*
  const recipeContenair = document.createElement("section");
  archivedTaskBlock?.setAttribute('class', 'recipe_contenairs');
  document.querySelector('#app')?.appendChild(recipeContenair);
  */

});