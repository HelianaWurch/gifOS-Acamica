/*---------------Create Elements------------------------------------------------------------------*/

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

/*-------------Constantes globales de elementos creados-------------------------------------------*/

const seemoreBtn = createElement("button", "btn-seemore");
const noResultImg = createImgElement(
	"no-result-img",
	"./assets/icon-busqueda-sin-resultado.svg",
	"no results"
);
const noResultParagraph = createElement("p", "no-result-p");
noResultParagraph.innerHTML = "intenta con otra búsqueda.";

/*---------------Constructors---------------------------------------------------------------------*/

/* Title Search Constructor */

let titleSearchConstructor = () => {
	titleSearch.innerHTML = userInput.value;
};

/* No Results Constructor Activo*/

function noResultConstructor(container) {
	seemoreBtn.classList.toggle("hidden");

	container.appendChild(noResultParagraph);
	container.appendChild(noResultImg);
}

function noResultsInactive() {
	if (noResultParagraph.classList.toggle("visible")) {
		noResultParagraph.classList.remove("visible");
	} else if (noResultImg.classList.toggle("visible")) {
		noResultImg.classList.remove("visible");
	}
}

/* Btn Search SeeMore Constructor */

function buttonSearchConstructor(container, elementID, elementClass) {
	seemoreBtn.id = elementID;
	seemoreBtn.className = elementClass;

	const seeMoreBtnImg = createImgElement(
		"see-more-btn-img",
		"./assets/CTA-ver-mas.svg",
		"see more gifs button"
	);

	seeMoreBtnImg.onmouseover = function () {
		this.src = "./assets/CTA-ver-mas-hover.svg";
	};

	seeMoreBtnImg.onmouseout = function () {
		this.src = "./assets/CTA-ver-mas.svg";
	};

	// Ejecuta la función que detecta si el boton fue creado después de 5 segundos, para darle tiempo a cargar y poder aplicar el listener.
	setTimeout(function () {
		detectBtnSeeMore(seemoreBtn);
	}, 5000);

	// appendChildBtn(container, "see-more-btn", seemoreBtn);
	// appendChildBtnImg(seemoreBtn, seeMoreBtnImg);

	appendChildBtn(seemoreBtn, seeMoreBtnImg);
}

/* Gif Constructor */

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
