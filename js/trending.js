function giphyTrending() {
	// contador = 0;
	apiTrendingCall()
		.then((jsonData) => {
			console.log(jsonData);
			trendingResults.innerHTML = "";
			forApi(jsonData.data, trendingResults);
		})
		.catch((error) => {
			console.error("api error", error);
		});
}

trendingLeftBtn.addEventListener("click", (e) => {
	trendingResults.scrollBy({
		top: 0,
		left: -372,
		behavior: "smooth",
	});
});

trendingRightBtn.addEventListener("click", (e) => {
	trendingResults.scrollBy({
		top: 0,
		left: 372,
		behavior: "smooth",
	});
});

/* Trending suggestions */

const getTrendingSuggest = async () => {
	try {
		const response = await fetch(apiTrendingSuggestions);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("api trending suggestions fetch error", error);
	}
};

const setTrendingText = async () => {
	const suggest = await getTrendingSuggest();
	trendingSuggestionsP.innerHTML = "";

	for (let i = 0; i < 5; i++) {
		trendingSuggestionsP.innerHTML += `<p class="trending-suggest-p"> ${suggest.data[i]} </p> <p class="trending-suggest-space">,</p>`;

		suggest.data[i].value = userInput.value;
	}

	const allTrendingSuggests = document.querySelectorAll(".trending-suggest-p");
	allTrendingSuggests.forEach((p) => {
		p.addEventListener("click", (e) => {
			console.log(p.textContent);
			userInput.value = p.textContent;
			searchBtn.click();
		});
	});
};

/*---------------Ejecutar Endpoints---------------------------------------------------------------*/

/* Ejecutar Endpoint Trending */
//Llamar al Trending cuando apenas carga la ventana.
window.onload = function () {
	giphyTrending();
	setTrendingText();
	darkModeCheck();
};
