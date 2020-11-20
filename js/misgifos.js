const noGifosImg = createImgElement(
	"no-gifos-img",
	"./assets/icon-mis-gifos-sin-contenido.svg",
	"no favs"
);
const noGifosParagraph = createElement("p", "no-p no-favs-p");
noGifosParagraph.innerHTML = "¡Anímate a crear tu primer GIFO!";

let myGifosArray;

function loadMyGifosMap() {
	if (myGifosArray === undefined) {
		let tmpGifos = localStorage.getItem("mis-gifos");
		if (tmpGifos === null) {
			myGifosArray = new Map();
		} else {
			myGifosArray = new Map(JSON.parse(localStorage.getItem("mis-gifos")));
		}
	}
	return myGifosArray;
}

function drawMyGifos() {
	if (loadMyGifosMap().size == 0) {
		searchSeeMoreBtn.appendChild(noGifosImg);
		searchSeeMoreBtn.appendChild(noGifosParagraph);
	} else {
		for (const [key, element] of loadMyGifosMap().entries()) {
			gifConstructor(
				element.src,
				element.title,
				element.user,
				element.id,
				element.srcid,
				misGifosContainer
			);
		}
	}
}

drawMyGifos();
