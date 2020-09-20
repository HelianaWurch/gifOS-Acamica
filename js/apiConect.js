/*--------------Recorridos de Arrays de Endpoints-------------------------------------------------*/

/*ESCRIBIR*/

/* 
Actualmente llamando a la api un limit default (25), y sólo estas tomando 12;

*/

/* Array general */

const forApi = (url, container) => {
	for (let i = 0; i < url.length; i++) {
		const gifUrl = url[i].images.original.url;
		const gifTitle = url[i].title;
		const gifUser = url[i].username;
		doStuffWithImage(gifUrl, gifTitle, gifUser, container);
	}
};

/* Array Search */

const forSearch = (url, container) => {
	forApi(url, searchResults);
};

/* Array Trending */

const forTrending = (url, container) => {
	forApi(url, trendingResults);
};

/*-----Promesas de si hay o no resultados---------------------------------------------*/

function giphySearch(searchKeyword) {
	contador = 0;
	apiSearchCall(searchKeyword, 12, 0)
		.then((jsonData) => {
			console.log(jsonData);
			searchResults.innerHTML = "";
			forSearch(jsonData.data);
		})
		.catch((error) => {
			console.error("api error", error); //catch de error
		});
}

function giphySearchSeeMore(searchKeyword) {
	contador += 12;
	apiSearchCall(searchKeyword, 12, contador)
		.then((jsonData) => {
			console.log(jsonData);
			forSearch(jsonData.data);
		})
		.catch((error) => {
			console.error("api error", error); //catch de error
		});
}

function giphyTrending() {
	apiTrendingCall()
		.then((jsonData) => {
			trendingResults.innerHTML = "";
			forTrending(jsonData.data);
		})
		.catch((error) => {
			console.error("api error", error);
		});
}

function doStuffWithImage(url, title, user, container) {
	gifConstructor(url, title, user, container);
}

/*---------------Ejecutar Endpoints---------------------------------------------------------------*/

/* Ejecutar Endpoint Trending */

//Llamar al Trending cuando apenas carga la ventana.
window.onload = function () {
	giphyTrending();
};

/*---------------Constructors---------------------------------------------------------------------*/

/* Title Search Constructor */

let titleSearchConstructor = () => {
	titleSearch.innerHTML = userInput.value;
};

function createElement(elementTag, elementClass) {
	const element = document.createElement(elementTag);
	element.className = elementClass;
	return element;
}

function createImgElement(elementClass, elementSrc, elementAlt) {
	const element = createElement("img", elementClass);
	element.src = elementSrc;
	element.alt = elementAlt;
	return element;
}

/* Btn Search Constructor */
function buttonSearchConstructor(container, elementID, elementClass) {
	const seemoreBtn = createElement("button", "btn-seemore");
	seemoreBtn.id = elementID;
	seemoreBtn.className = elementClass;

	const seeMoreBtnImg = createImgElement("", "./assets/CTA-ver-mas.svg", "see more gifs button");

	seeMoreBtnImg.onmouseover = function () {
		this.src = "./assets/CTA-ver-mas-hover.svg";
	};

	seeMoreBtnImg.onmouseout = function () {
		this.src = "./assets/CTA-ver-mas.svg";
	};

	seemoreBtn.appendChild(seeMoreBtnImg);

	seemoreBtn.addEventListener("click", giphySearchSeeMore(userInput.value));
	container.appendChild(seemoreBtn);
}

function gifConstructor(src, title, user, container) {
	const gifImage = createImgElement("gif-giphy", src, title);

	const gifUserP = createElement("p", "gif-username");
	gifUserP.innerHTML = user;

	const gifTitleP = createElement("p", "gif-title");
	gifTitleP.innerHTML = title;

	const gifButtonFavourite = createElement("button", "card-btn favourite-btn");
	const gifButtonDownload = createElement("button", "card-btn download-btn");
	const gifButtonMax = createElement("button", "card-btn max-btn");
	const gifButtonsContainer = createElement("div", "gif-buttons-container");
	const gifCard = createElement("div", "gif-card");

	const gifButtonFavouriteImg = createImgElement(
		"",
		"./assets/icon-fav.svg",
		"gif favourite button"
	);

	const gifButtonDownloadImg = createImgElement(
		"",
		"./assets/icon-download.svg",
		"gif download button"
	);

	const gifButtonMaxImg = createImgElement(
		"",
		"./assets/icon-max-normal.svg",
		"gif max modal button"
	);

	gifButtonFavourite.appendChild(gifButtonFavouriteImg);
	gifButtonDownload.appendChild(gifButtonDownloadImg);
	gifButtonMax.appendChild(gifButtonMaxImg);

	gifButtonsContainer.appendChild(gifButtonFavourite);
	gifButtonsContainer.appendChild(gifButtonDownload);
	gifButtonsContainer.appendChild(gifButtonMax);

	gifCard.appendChild(gifImage);
	gifCard.appendChild(gifButtonsContainer);
	gifCard.appendChild(gifUserP);
	gifCard.appendChild(gifTitleP);

	container.appendChild(gifCard);
}
