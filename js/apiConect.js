/*----------Conect & Endpoints--------------------------------------------------------------------*/

const api = "https://api.giphy.com/v1/gifs/";
const apiKey = "YWZLzFV5yLHVVxELdCo5Hmj0E7PUyMY8";
const apiSearch = `${api}search?&api_key=${apiKey}&q=`;
const apiTrending = `${api}trending?&api_key=${apiKey}&limit=25&rating=g`;

/*----------------Cache DOM-----------------------------------------------------------------------*/
const userInput = document.querySelector("#input-text"); // Detecta el input.
const search = document.querySelector("#button-search"); // Detecta el boton.
const searchKeyWord = userInput.value; // Toma lo que escribio el usuario en el input.
/*-----------------Fetchs-------------------------------------------------------------------------*/

async function apiSearchCall(searchKeyword) {
	const response = await fetch(apiSearch + searchKeyword);
	const jsonResponse = await response.json();
	return jsonResponse;
}

function doStuffWithImage(url, title, user) {
	gifConstructor(url, title, user);
}

function giphySearch(searchKeyword) {
	apiSearchCall()
		.then((jsonData) => {
			console.log(jsonData);
			forGif(jsonData.data);
		})
		.catch((error) => {
			console.error("api error", error); //catch de error
		});
}

const forGif = (url) => {
	for (let i = 0; i < 5; i++) {
		const gifUrl = url[i].images.original.url;
		const gifTitle = url[i].title;
		const gifUser = url[i].username;
		doStuffWithImage(gifUrl, gifTitle, gifUser);
		console.log(gifUser);
		console.log(gifTitle);
	}
};

// let setup = (path, input) => {
// 	fetch(path + input)
// 		.then((response) => response.json())
// 		.then((jsonResponse) => {
// 			gotData(jsonResponse.data);
// 		})
// 		.catch((error) => {
// 			console.error("api error", error);
// 		});
// };

// let gotData = (url) => {
// 	for (let i = 0; i < 5; i++) {
// 		const gifUrl = url[i].images.original.url;
// 		const gifTitle = url[i].title;
// 		const gifUser = url[i].title;
// 		fetch(gifUrl)
// 			.then((response) => {
// 				console.log(gifUrl);
// 				console.log(gifTitle);
// 				gifConstructor(gifUrl, gifTitle, gifUser); //Imprime los Gifs
// 			})
// 			.catch((error) => {
// 				console.error("gif error", error);
// 			});
// 	}
// };

/*-----------------Search-------------------------------------------------------------------------*/

let result = (searchKeyWord) => {
	giphySearch();
};

search.addEventListener("click", result); // Detecta el click en el boton y ejecuta la función contenedora.

/*---------------Trending-------------------------------------------------------------------------*/

let trendingGifs = () => {
	setup(apiTrending);
};

/*------------Gif Constructor---------------------------------------------------------------------*/

// let gifConstructor = (src, title, user) => {
// 	let gifImage = document.createElement("img");
// 	gifImage.src = src; //Agregamos las propiedades al gif creado.
// 	gifImage.className = "gif-giphy";
// 	gifImage.alt = title;

// 	let gifCard = document.createElement("div"); //Asignamos el elemento contenedor de cada gif.
// 	gifCard.className = "gif-card";
// 	gifCard.appendChild(gifImage);

// 	let gifCardContainer = document.getElementById("cards-container"); //Asignamos el elemento contenedor general.
// 	gifCardContainer.appendChild(gifCard); //Le asignamos los gifs creados como hijos.
// }

let gifConstructor = (src, title, user) => {
	let gifImage = document.createElement("img");
	gifImage.src = src; //Agregamos las propiedades al gif creado.
	gifImage.className = "gif-giphy";
	gifImage.alt = title;

	let gifUserP = document.createElement("p");
	gifUserP.innerHTML = user;
	gifUserP.className = "gif-username";

	let gifTitleP = document.createElement("p");
	gifTitleP.innerHTML = title;
	gifTitleP.className = "gif-title";

	let gifButtonFavouriteImg = document.createElement("img");
	gifButtonFavouriteImg.src = "./assets/icon-fav-hover.svg";

	let gifButtonFavourite = document.createElement("button");
	gifButtonFavourite.className = "img-btn favourite-btn";
	gifButtonFavourite.appendChild(gifButtonFavouriteImg);

	let gifButtonDownloadImg = document.createElement("img");
	gifButtonDownloadImg.src = "./assets/icon-download.svg";

	let gifButtonDownload = document.createElement("button");
	gifButtonDownload.className = "img-btn download-btn";
	gifButtonDownload.appendChild(gifButtonDownloadImg);

	let gifButtonMaxImg = document.createElement("img");
	gifButtonMaxImg.src = "./assets/icon-max.svg";

	let gifButtonMax = document.createElement("button");
	gifButtonMax.className = "img-btn max-btn";
	gifButtonMax.appendChild(gifButtonMaxImg);

	let gifButtonsContainer = document.createElement("div");
	gifButtonsContainer.className = "gif-buttons-container";
	gifButtonsContainer.appendChild(gifButtonFavourite);
	gifButtonsContainer.appendChild(gifButtonDownload);
	gifButtonsContainer.appendChild(gifButtonMax);

	let gifCard = document.createElement("div"); //Asignamos el elemento contenedor de cada gif.
	gifCard.className = "gif-card";
	gifCard.appendChild(gifImage);
	gifCard.appendChild(gifButtonsContainer);
	gifCard.appendChild(gifUserP);
	gifCard.appendChild(gifTitleP);

	let gifCardContainer = document.getElementById("cards-container"); //Asignamos el elemento contenedor general.
	gifCardContainer.appendChild(gifCard); //Le asignamos los gifs creados como hijos.
};
