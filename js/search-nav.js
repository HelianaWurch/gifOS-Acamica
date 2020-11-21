/*---------------Search in Nav--------------------------------------------------------------------*/

/* Ejecutar Endpoint Search Nav */
let searchResultNav = (container, searchKeyword) => {
	giphySearch(userInputNav.value, 0);
	titleSearchNavConstructor(searchTitleResults, userInputNav.value);
	buttonSearchConstructor(searchSeeMoreBtn, "see-more-btn", "see-more-btn");
};

searchBtnNav.addEventListener("click", searchResultNav);
userInputNav.addEventListener("keypress", function (event) {
	titleSearchNavConstructor();

	if (event.key === "Enter") {
		event.preventDefault();
		searchBtnNav.click();
	}
});

const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let lastScroll = 0;

window.addEventListener("scroll", () => {
	const currentScroll = window.pageYOffset;
	if (currentScroll >= 40) {
		searchInNav.classList.remove(scrollUp);
		return;
	}

	if (currentScroll > lastScroll && !searchInNav.classList.contains(scrollDown)) {
		searchInNav.classList.remove(scrollUp);
		searchInNav.classList.add(scrollDown);
	} else if (currentScroll < lastScroll && searchInNav.classList.contains(scrollDown)) {
		searchInNav.classList.remove(scrollDown);
		searchInNav.classList.add(scrollUp);
	}
	lastScroll = currentScroll;
});

/*-------------------------------Search Btns Change-----------------------------------------------*/

const searchBtnsChageOne = (inputContainer, btnContainer, crossContainer) => {
	if (
		!inputContainer.classList.contains("on-focus") ||
		btnContainer.classList.contains("switch-position")
	) {
		btnContainer.classList.remove("switch-position");
		btnContainer.classList.toggle("original-position");
		crossContainer.classList.remove("visible");
		crossContainer.classList.toggle("hidden");
	}
};

const searchBtnsChageTwo = (inputContainer, btnContainer, crossContainer, btn, inp) => {
	if (
		inputContainer.classList.contains("on-focus") &&
		!btnContainer.classList.contains("switch-position")
	) {
		btnContainer.classList.remove("original-position");
		btnContainer.classList.toggle("switch-position");
		crossContainer.classList.remove("hidden");
		crossContainer.classList.toggle("visible");
		resertSearchInput(btnContainer, crossContainer, btn, inp);
	}
};

const searchBtnsPositions = (btnContainer, crossContainer) => {
	if (btnContainer.classList.contains("switch-position")) {
		btnContainer.classList.remove("switch-position");
		btnContainer.classList.toggle("original-position");
		crossContainer.classList.remove("visible");
		crossContainer.classList.toggle("hidden");
	}
};

const resertSearchInput = (btnContainer, crossContainer, btn, inp) => {
	btn.addEventListener("click", function () {
		inp.value = "";
		searchBtnsPositions(btnContainer, crossContainer);
	});
};

/*---------------Search Suggestions Autocomplete--------------------------------------------------*/

// let acomplete = apiAutocomplete + searchKeyword;

function autocomplete(inputContainer, btnContainer, crossContainer, btn, inp) {
	let currentFocus;

	inp.addEventListener("input", async function (e) {
		let autocompleteDiv,
			autocompleteDivElement,
			i,
			thevalue = this.value;

		const arr = await apiAutompleteCall(thevalue);
		console.log(arr);
		inputContainer.classList.toggle("on-focus");

		closeAllLists();
		if (!thevalue) {
			searchBtnsChageOne(inputContainer, btnContainer, crossContainer);
			return false;
		}
		searchBtnsChageTwo(inputContainer, btnContainer, crossContainer, btn, inp);

		console.log(thevalue);

		currentFocus = -1;
		autocompleteDiv = createElement("div", "autocomplete-items", this.id + "autocomplete-list");
		this.parentNode.appendChild(autocompleteDiv);

		autocompleteHr = createElement("hr", "autocomplete-hr");
		autocompleteDiv.appendChild(autocompleteHr);

		for (i = 0; i < arr.data.length; i++) {
			if (arr.data[i].name.substr(0, thevalue.length).toUpperCase() == thevalue.toUpperCase()) {
				autocompleteDivElement = createElement("div", "autocomplete-element");
				autocompleteDivWord = createElement("div", "autocomplete-word");
				autocompleteDivWord.innerHTML =
					"<strong>" + arr.data[i].name.substr(0, thevalue.length) + "</strong>";
				autocompleteDivWord.innerHTML += arr.data[i].name.substr(thevalue.length);
				autocompleteDivWord.innerHTML += "<input type='hidden' value='" + arr.data[i].name + "'>";
				autocompleteImg = createImgElement("autocomplete-img", "./assets/icon-search.svg", "search");

				autocompleteDivElement.addEventListener("click", function (e) {
					inp.value = this.getElementsByTagName("input")[0].value;
					closeAllLists();
					searchBtn.click();
				});

				autocompleteDivElement.appendChild(autocompleteImg);
				autocompleteDivElement.appendChild(autocompleteDivWord);
				autocompleteDiv.appendChild(autocompleteDivElement);
			}
		}
	});

	inp.addEventListener("keydown", function (e) {
		let x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			currentFocus++;
			addActive(x);
		} else if (e.keyCode == 38) {
			currentFocus--;
			addActive(x);
		}
	});

	inp.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			console.log("keypress enter input");
			let x = document.getElementById(this.id + "autocomplete-list");
			if (x) x[currentFocus].click();
		}
	});

	function addActive(x) {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;
		x[currentFocus].classList.add("autocomplete-active");
		inp.value = x[currentFocus].getElementsByTagName("input")[0].value;
	}

	function removeActive(x) {
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}

	function closeAllLists(elmnt) {
		let x = document.getElementsByClassName("autocomplete-items");
		for (let i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}

	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}

autocomplete(
	searchInpNavContainer,
	searchBtnNavContainer,
	searchCrossBtnNavContainer,
	searchCrossBtnNav,
	userInputNav
);

window.onload = function () {
	darkModeCheck();
	giphyTrending();
};
