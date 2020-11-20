let searchResult = (container, searchKeyword) => {
	giphySearch(userInput.value, 0);
	titleSearchConstructor(searchTitleResults, userInput.value);
	buttonSearchConstructor(searchSeeMoreBtn, "see-more-btn", "see-more-btn");
};

searchBtn.addEventListener("click", searchResult);
userInput.addEventListener("keypress", function (event) {
	titleSearchConstructor();

	if (event.key === "Enter") {
		event.preventDefault();
		searchBtn.click();
	}
});

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

setTrendingText();
