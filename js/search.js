/*---------------Ejecutar Endpoints---------------------------------------------------------------*/

/* Ejecutar Endpoint Search Body */

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

// Detecta si el boton de Ver Más fue creado
function detectBtnSeeMore(button) {
	if (document.getElementById("see-more-btn")) {
		button.addEventListener("click", function (event) {
			giphySearchSeeMore(userInput.value);
			event.stopPropagation();
			console.log("Cargando más gifs");
		});
	} else {
		console.log("NO existe el botón 'ver más'");
	}
}

function appendChildBtn(button, img) {
	if (!document.getElementById("see-more-btn")) {
		searchSeeMoreBtn.appendChild(button);
		button.appendChild(img);
	}
}

autocomplete(
	searchInpContainer,
	searchBtnContainer,
	searchCrossBtnContainer,
	searchCrossBtn,
	userInput,
	countries
);
