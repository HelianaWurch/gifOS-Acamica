/*---------------Ejecutar Endpoints---------------------------------------------------------------*/

/* Ejecutar Endpoint Search */

let searchResult = (container, searchKeyword) => {
	giphySearch(userInput.value, 0); // Toma lo que escribio el usuario en el input.
	titleSearchConstructor(searchTitleResults, userInput.value);
	buttonSearchConstructor(searchSeeMoreBtn, "see-more-btn", "see-more-btn");
};

searchBtn.addEventListener("click", searchResult); // Detecta el click en el boton y ejecuta la función contenedora.
userInput.addEventListener("keypress", function (event) {
	titleSearchConstructor();

	// Hace click en el botón cuando se apreta enter en el userInput
	// Enter
	if (event.key === "Enter") {
		event.preventDefault();
		searchBtn.click();
	}
});
