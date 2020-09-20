// async await
const api = "https://api.giphy.com/v1/gifs/";
const apiKey = "YWZLzFV5yLHVVxELdCo5Hmj0E7PUyMY8";
const apiSearch = `${api}search?&api_key=${apiKey}&q=`;
const apiTrending = `${api}trending?&api_key=${apiKey}&limit=25&rating=g`;

/**
 * Esta función llama al search y devuelve los resultados.
 * @param searchKeyword
 * @returns {Promise<any>}
 */
async function apiSearchCall(searchKeyword) {
	// .then es una funcionalidad de un Promise, y fetch devuelve un promise,
	// por eso luego podemos llamar a then
	const response = await fetch(apiSearch + searchKeyword);
	// de response stream a json
	return response.json();
	// acá mi error cuando hablamos y ahora es que en vez de llamar a lo que está ahora el
	// response.json(), estaba llamando a response.json sin los paréntesis, de esa manera no llamaba
	// a la funcion sinó a la definición de la misma.

	// Todos los anteriores se llaman con await por que es asincrónico, yo no puedo hacer la
	// siguiente operación si la anterior no se completó
}

function doStuffWithImage(imageUrl) {
	console.log(imageUrl);
}

function giphySearch(keyword) {
	apiSearchCall(keyword).then((jsonData) => {
		console.log(jsonData);
		// acá podes hacer el viejo for, o bien este for each, for each maneja automáticamente el
		// índice y sabe cuando parar, el parametro index lo puse como ejemplo, si lo tuvieses que
		// usar está ahi
		jsonData.data.forEach((element, index) => {
			doStuffWithImage(element.url);
		});
	});
}

/* Gif Constructor */

/*
let gifConstructor = (src, title, user, container) => {
	let gifImage = document.createElement("img");
	gifImage.src = src; //Agregamos las propiedades al gif creado.
	gifImage.className = "gif-giphy";
	gifImage.alt = title;

	// let gitImage = createImgElement("img", "gif-giphy", src, title);

	let gifUserP = document.createElement("p");
	gifUserP.innerHTML = user;
	gifUserP.className = "gif-username";

	let gifTitleP = document.createElement("p");
	gifTitleP.innerHTML = title;
	gifTitleP.className = "gif-title";

	let gifButtonFavouriteImg = document.createElement("img");
	gifButtonFavouriteImg.src = "./assets/icon-fav.svg";

	let gifButtonFavourite = document.createElement("button");
	gifButtonFavourite.className = "card-btn favourite-btn";
	gifButtonFavourite.appendChild(gifButtonFavouriteImg);

	let gifButtonDownloadImg = document.createElement("img");
	gifButtonDownloadImg.src = "./assets/icon-download.svg";

	let gifButtonDownload = document.createElement("button");
	gifButtonDownload.className = "card-btn download-btn";
	gifButtonDownload.appendChild(gifButtonDownloadImg);

	let gifButtonMaxImg = document.createElement("img");
	gifButtonMaxImg.src = "./assets/icon-max-normal.svg";

	let gifButtonMax = document.createElement("button");
	gifButtonMax.className = "card-btn max-btn";
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

	//Asignamos el elemento contenedor general.
	container.appendChild(gifCard); //Le asignamos los gifs creados como hijos.
};
*/
