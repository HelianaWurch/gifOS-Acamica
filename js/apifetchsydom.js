/*----------Conect & Endpoints--------------------------------------------------------------------*/

const api = "https://api.giphy.com/v1/gifs/";
const apiKey = "YWZLzFV5yLHVVxELdCo5Hmj0E7PUyMY8";
const apiSearch = `${api}search?&api_key=${apiKey}&q=`;
const apiTrending = `${api}trending?&api_key=${apiKey}&limit=25&rating=g`;

/*----------------Cache DOM-----------------------------------------------------------------------*/
const userInput = document.querySelector("#input-text"); // Detecta el input.
const searchBtn = document.querySelector("#button-search"); // Detecta el boton.
const searchResults = document.getElementById("search-results-container"); //Detecta el contenedor del Search.
const searchTitleResults = document.getElementById("search-results-value"); //Detecta el contenedor del titulo Search.
const searchSeeMoreBtn = document.getElementById("btn-results-seemore"); //Detecta el contenedor del boton Ver Más del Search.
const searchGeneralContainer = document.getElementById("search-results-general-container"); //Detecta el contenedor de todas las busquedas.

/* Trending */
const trendingResults = document.getElementById("trending-carousel"); //Detecta el carousel de trendings.
const trendingLeftBtn = document.getElementById("trending-left-btn"); //Detecta el boton izquierdo.
const trendingRightBtn = document.getElementById("trending-right-btn"); //Detecta el boton derecho.
let contador = 0;

/*-----------------Fetchs-------------------------------------------------------------------------*/

async function apiSearchCall(searchKeyword, cantidad, offset) {
	const response = await fetch(
		apiSearch + searchKeyword + "&limit=" + cantidad + "&offset" + offset
	);
	const jsonResponse = await response.json();
	return jsonResponse;
}

async function apiTrendingCall() {
	const response = await fetch(apiTrending);
	const jsonResponse = await response.json();
	return jsonResponse;
}
