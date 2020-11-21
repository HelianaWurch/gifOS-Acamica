/*---------------Create Elements------------------------------------------------------------------*/

function createElement(elementTag, elementClass, elementID) {
	const element = document.createElement(elementTag);
	element.className = elementClass;
	if (elementID !== undefined) {
		element.id = elementID;
	}
	return element;
}

function createImgElement(elementClass, elementSrc, elementAlt, elementID) {
	const element = createElement("img", elementClass, elementID);
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
const noResultParagraph = createElement("p", "no-p no-result-p");
noResultParagraph.innerHTML = "intenta con otra búsqueda.";

const noFavsImg = createImgElement("no-favs-img", "./assets/icon-fav-sin-contenido.svg", "no favs");
const noFavsParagraph = createElement("p", "no-p no-favs-p");
noFavsParagraph.innerHTML = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!";

const hiddenElement = (element) => {
	element.classList.contains("hidden")
		? element.classList.remove("hidden")
		: element.classList.toggle("hidden");
};

const visibleOpacityElement = (element) => {
	element.classList.contains("ceroopacity")
		? element.classList.remove("ceroopacity") && element.classList.toggle("fullopacity")
		: element.classList.toggle("ceroopacity") && element.classList.remove("fullopacity");
};

/*---------------Constructors---------------------------------------------------------------------*/

/* Title Search Constructor Body */

let titleSearchConstructor = () => {
	titleSearch.innerHTML = userInput.value;
};

/* Title Search Constructor Nav */

let titleSearchNavConstructor = () => {
	titleSearch.innerHTML = userInputNav.value;
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
let seeMoreImgUrl;
function buttonSearchConstructor(container, elementID, elementClass) {
	seemoreBtn.id = elementID;
	seemoreBtn.className = elementClass;

	const seeMoreBtnImg = createImgElement("see-more-btn-img", seeMoreImgUrl, "see more gifs button");

	seeMoreBtnImg.onmouseover = function () {
		this.src = "./assets/CTA-ver-mas-hover.svg";
	};

	seeMoreBtnImg.onmouseout = function () {
		this.src = seeMoreImgUrl;
	};

	setTimeout(function () {
		detectBtnSeeMore(seemoreBtn);
	}, 5000);

	appendChildBtn(seemoreBtn, seeMoreBtnImg);
}

/* Gif Constructor */

function gifConstructor(src, title, user, id, srcid, container) {
	const gifImage = createImgElement("gif-giphy", src, title, id);

	const gifUserP = createElement("p", "gif-username");
	gifUserP.innerHTML = user;

	const gifTitleP = createElement("p", "gif-title");
	gifTitleP.innerHTML = title;

	const gifButtonFavourite = createElement(
		"button",
		"card-btn favourite-btn",
		`gif-fav-${user + id}`
	);

	const gifButtonDownload = createElement(
		"button",
		"card-btn download-btn",
		`gif-down-${user + id}`
	);
	const gifButtonMax = createElement("button", "card-btn max-btn", `gif-max-${user + id}`);
	const gifButtonsContainer = createElement("div", "gif-buttons-container");
	const gifCard = createElement("div", "gif-card");

	const gifButtonFavouriteImg = createImgElement(
		"gif-btn-hover",
		"./assets/icon-fav.svg",
		"gif favourite button"
	);

	const gifButtonFavouriteImgActive = createImgElement(
		"gif-btn-active",
		"./assets/icon-fav-active.svg",
		"gif favourite active button",
		"fav-active"
	);

	const gifButtonDownloadImg = createImgElement(
		"gif-btn-hover",
		"./assets/icon-download.svg",
		"gif download button"
	);

	const gifButtonMaxImg = createImgElement(
		"gif-btn-hover",
		"./assets/icon-max-normal.svg",
		"gif max modal button"
	);

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

	gifButtonMax.addEventListener("click", toggleModal);
	gifMaxPlay(gifButtonMax, src, title, user, id, srcid, gifCard);
	btnClose.addEventListener("click", toggleModal);
	gifDownload(gifButtonDownload, title, user, src);

	gifImage.onclick = function () {
		gifButtonMax.click();
	};

	gifFavorite(
		gifButtonFavourite,
		src,
		title,
		user,
		id,
		srcid,
		container,
		gifButtonFavouriteImgActive
	);

	if (localStorage["favoritos"] == undefined) {
		gifButtonFavourite.appendChild(gifButtonFavouriteImg);
	} else if (localStorage["favoritos"].indexOf(id) == -1) {
		gifButtonFavourite.appendChild(gifButtonFavouriteImg);
	} else {
		gifButtonFavourite.appendChild(gifButtonFavouriteImgActive);
	}
}

/* Download Constructor */

const gifDownload = (btn, title, user, src) => {
	btn.onclick = async () => {
		let a = document.createElement("a");
		let response = await fetch(src);
		let file = await response.blob();
		a.download = title + user;
		a.href = window.URL.createObjectURL(file);
		a.dataset.downloadurl = ["application/octet-stream", a.download, a.href].join(":");
		a.click();
	};
};

/* Favorites Constructor */

let myFavoritesGifsArray;

function loadMyFavMap() {
	if (myFavoritesGifsArray === undefined) {
		let tmpFavs = localStorage.getItem("favoritos");
		if (tmpFavs === null) {
			myFavoritesGifsArray = new Map();
		} else {
			myFavoritesGifsArray = new Map(JSON.parse(localStorage.getItem("favoritos")));
		}
	}
	return myFavoritesGifsArray;
}

function saveMyFavMap() {
	localStorage.setItem("favoritos", JSON.stringify(Array.from(myFavoritesGifsArray.entries())));
}

function setMyFav(key, value) {
	loadMyFavMap().set(key, value);
}

function getMyFav(key) {
	loadMyFavMap().get(key);
}

const gifFavorite = (btn, src, title, user, id, srcid, container, img) => {
	btn.addEventListener("click", function (e) {
		e.preventDefault();

		let datos = {
			id: id,
			title: title,
			user: user,
			src: src,
			srcid: srcid,
		};

		let favorito = loadMyFavMap().get(datos.id);

		if (favorito !== undefined) {
			loadMyFavMap().delete(datos.id);
		} else {
			loadMyFavMap().set(datos.id, datos);
		}

		saveMyFavMap();

		favContainer.innerHTML = "";
		drawMyFavs();
	});
};

function drawMyFavs() {
	if (loadMyFavMap().size == 0) {
		searchSeeMoreBtn.appendChild(noFavsImg);
		searchSeeMoreBtn.appendChild(noFavsParagraph);
	} else {
		for (const [key, element] of loadMyFavMap().entries()) {
			gifConstructor(
				element.src,
				element.title,
				element.user,
				element.id,
				element.srcid,
				favContainer
			);
		}
	}
}

const toggleModal = () => {
	modal.classList.toggle("modal-active")
		? modal.classList.remove("modal-active") + modal.classList.toggle("modal-inactive")
		: modal.classList.toggle("modal-active") + modal.classList.remove("modal-inactive");
};
