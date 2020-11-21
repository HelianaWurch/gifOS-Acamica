/* Modal */

const gifButtonMaxFavouriteImgActiveTwo = createImgElement(
	"ceroopacity heart-active-position",
	"./assets/icon-fav-active.svg",
	"gif favourite active button",
	"fav-active"
);

const gifButtonMaxFavouriteImgActive = createImgElement(
	"",
	"./assets/icon-fav-active.svg",
	"gif favourite active button",
	"fav-active"
);

const gifButtonMaxFavouriteImg = createImgElement(
	"",
	"./assets/icon-fav.svg",
	"gif favourite button"
);

const gifMaxPlay = (btn, src, title, user, id, srcid) => {
	const gifMaxUserP = createElement("p", "gif-username");
	gifMaxUserP.innerHTML = user;

	const gifMaxTitleP = createElement("p", "gif-title");
	gifMaxTitleP.innerHTML = title;

	btn.onclick = function () {
		gifMaxImg.setAttribute("src", src);
		gifDownload(gifMaxDownload, title, user, srcid);
		gifCloseBtn(btnClose, gifMaxImg, gifMaxUserP, gifMaxTitleP);
		gifFavorite(gifMaxFav, src, title, user, id, srcid);

		gifMaxInfo.appendChild(gifMaxUserP);
		gifMaxInfo.appendChild(gifMaxTitleP);

		if (localStorage["favoritos"] == undefined) {
			visibleOpacityElement(gifButtonMaxFavouriteImg);
		} else if (localStorage["favoritos"].indexOf(id) == -1) {
			visibleOpacityElement(gifButtonMaxFavouriteImg);
		} else {
			visibleOpacityElement(gifButtonMaxFavouriteImgActiveTwo);
		}
	};

	gifMaxFav.appendChild(gifButtonMaxFavouriteImgActiveTwo);
	gifMaxFav.onclick = function () {
		visibleOpacityElement(gifButtonMaxFavouriteImgActiveTwo);
	};
};

const gifCloseBtn = (btn, img, puser, ptitle) => {
	btn.onclick = function () {
		img.setAttribute("src", "");
		puser.innerHTML = "";
		ptitle.innerHTML = "";
	};
};
