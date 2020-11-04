/*----------Conect & Endpoints--------------------------------------------------------------------*/

const api = "https://api.giphy.com/v1/gifs/";
const apiKey = "YWZLzFV5yLHVVxELdCo5Hmj0E7PUyMY8";
const apiSearch = `${api}search?&api_key=${apiKey}&q=`;
const apiTrending = `${api}trending?&api_key=${apiKey}&limit=25&rating=g`;

/*----------------Cache DOM-----------------------------------------------------------------------*/
const userInput = document.querySelector("#input-text"); // Detecta el input.
const searchInpContainer = document.getElementById("input-search-container"); //Detecta el contenedor del Input Search.
const userInputNav = document.querySelector("#input-text-nav"); // Detecta el input del nav.
const searchInpNavContainer = document.getElementById("input-nav-container"); //Detecta el contenedor del Input del Nav.
const searchBtn = document.querySelector("#button-search"); // Detecta el boton.
const searchBtnContainer = document.querySelector("#button-search-container"); // Detecta el contenedor del boton de busqueda.
const searchCrossBtn = document.querySelector("#button-search-cross"); // Detecta el boton para borrar busqueda.
const searchCrossBtnContainer = document.querySelector("#button-cross-container"); // Detecta el contenedor del boton para borrar busqueda.
const searchBtnNav = document.querySelector("#button-search-nav"); // Detecta el boton del nav.
const searchInNav = document.getElementById("search-in-nav"); // Detecta el search dentro del nav.
const searchBtnNavContainer = document.querySelector("#button-search-nav-container"); // Detecta el contenedor del boton de busqueda del nav.
const searchCrossBtnNavContainer = document.querySelector("#button-cross-nav-container"); // Detecta el contenedor del boton para borrar busqueda.
const searchCrossBtnNav = document.querySelector("#button-search-nav-cross"); // Detecta el boton para borrar busqueda.
const searchResults = document.getElementById("search-results-container"); //Detecta el contenedor del Search.
const searchTitleResults = document.getElementById("search-results-value"); //Detecta el contenedor del titulo Search.
const searchSeeMoreBtn = document.getElementById("btn-results-seemore"); //Detecta el contenedor del boton Ver Más del Search.
const favBtn = document.getElementsByClassName("favourite-btn"); //Detecta los botones de favoritos.
const btnClose = document.querySelector(".close-btn"); //Detecta el boton de close en gifMax.
const gifMaxContainer = document.getElementById("gif-max"); //Detecta el contenedor del gif en gifMax.
const gifMaxImg = document.getElementById("gif-max-image"); //Detecta el tag img del modal gifMax.
const gifMaxDownload = document.getElementById("btn-modal-down"); //Detecta el tag img del modal gifMax.
const gifMaxFav = document.getElementById("btn-modal-fav"); //Detecta el btn de fav del modal gifMax.
const gifMaxInfo = document.getElementById("gif-max-info"); //Detecta el contenedor de la información del gif del modal gifMax.
const favContainer = document.getElementById("favorites-results-container"); //Detecta el contenedor de los gifs favoritos.

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

/*--------------Recorridos de Arrays de Endpoints-------------------------------------------------*/

/*ESCRIBIR*/

/* Actualmente llamando a la api un limit default (25), y sólo estas tomando 12;*/

/* Array general */

const forApi = (url, container) => {
	for (let i = 0; i < url.length; i++) {
		// const gifUrl = url[i].images.original.url;
		const gifUrl = url[i].images.downsized_medium.url;
		const gifTitle = url[i].title;
		const gifUser = url[i].username;
		const gifID = url[i].id;
		const gifUrlID = gifUrl + gifID;
		gifConstructor(gifUrl, gifTitle, gifUser, gifID, gifUrlID, container);
	}
};

/*-----Promesas de si hay o no resultados---------------------------------------------------------*/

/* Promesa Search */

function giphySearch(searchKeyword) {
	contador = 0;
	apiSearchCall(searchKeyword, 12)
		.then((jsonData) => {
			console.log(jsonData);
			searchResults.innerHTML = "";
			showResults(jsonData, forApi, jsonData.data, searchResults);
		})
		.catch((error) => {
			console.error("api error", error); //catch de error
		});
}

//Retorna si hay o no resultado de busqueda.
function showResults(data, callback, url, parametro) {
	if (data.pagination.total_count == 0) {
		noResultConstructor(searchSeeMoreBtn);
		noResultParagraph.classList.toggle("visible");
		noResultImg.classList.toggle("visible");
	} else {
		callback(url, parametro);
		noResultsInactive();
	}
}

/* Promesa Search SeeMore */

function giphySearchSeeMore(searchKeyword) {
	// contador += 12;
	apiSearchCall(searchKeyword /*, 12, contador*/)
		.then((jsonData) => {
			console.log(jsonData);
			forApi(jsonData.data, searchResults);
		})
		.catch((error) => {
			console.error("api error", error); //catch de error
		});
}

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

/*---------------Ejecutar Endpoints---------------------------------------------------------------*/

/* Ejecutar Endpoint Trending */
//Llamar al Trending cuando apenas carga la ventana.
window.onload = function () {
	giphyTrending();
};
