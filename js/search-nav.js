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

let countries = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antigua &amp; Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia",
	"Bosnia &amp; Herzegovina",
	"Botswana",
	"Brazil",
	"British Virgin Islands",
	"Brunei",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cape Verde",
	"Cayman Islands",
	"Central Arfrican Republic",
	"Chad",
	"Chile",
	"China",
	"Colombia",
	"Congo",
	"Cook Islands",
	"Costa Rica",
	"Cote D Ivoire",
	"Croatia",
	"Cuba",
	"Curacao",
	"Cyprus",
	"Czech Republic",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Ethiopia",
	"Falkland Islands",
	"Faroe Islands",
	"Fiji",
	"Finland",
	"France",
	"French Polynesia",
	"French West Indies",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea Bissau",
	"Guyana",
	"Haiti",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Kosovo",
	"Kuwait",
	"Kyrgyzstan",
	"Laos",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macau",
	"Macedonia",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Mauritania",
	"Mauritius",
	"Mexico",
	"Micronesia",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauro",
	"Nepal",
	"Netherlands",
	"Netherlands Antilles",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"North Korea",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Reunion",
	"Romania",
	"Russia",
	"Rwanda",
	"Saint Pierre &amp; Miquelon",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Korea",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"St Kitts &amp; Nevis",
	"St Lucia",
	"St Vincent",
	"Sudan",
	"Suriname",
	"Swaziland",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Timor L'Este",
	"Togo",
	"Tonga",
	"Trinidad &amp; Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks &amp; Caicos",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom",
	"United States of America",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Vatican City",
	"Venezuela",
	"Vietnam",
	"Virgin Islands (US)",
	"Yemen",
	"Zambia",
	"Zimbabwe",
];

function autocomplete(inputContainer, btnContainer, crossContainer, btn, inp, arr) {
	let currentFocus;

	inp.addEventListener("input", function (e) {
		let autocompleteDiv,
			autocompleteDivElement,
			i,
			thevalue = this.value;
		inputContainer.classList.toggle("on-focus");

		closeAllLists();
		if (!thevalue) {
			searchBtnsChageOne(inputContainer, btnContainer, crossContainer);
			return false;
		}
		searchBtnsChageTwo(inputContainer, btnContainer, crossContainer, btn, inp);

		currentFocus = -1;
		autocompleteDiv = createElement("div", "autocomplete-items", this.id + "autocomplete-list");
		this.parentNode.appendChild(autocompleteDiv);

		autocompleteHr = createElement("hr", "autocomplete-hr");
		autocompleteDiv.appendChild(autocompleteHr);

		for (i = 0; i < arr.length; i++) {
			if (arr[i].substr(0, thevalue.length).toUpperCase() == thevalue.toUpperCase()) {
				autocompleteDivElement = createElement("div", "autocomplete-element");
				autocompleteDivWord = createElement("div", "autocomplete-word");
				autocompleteDivWord.innerHTML = "<strong>" + arr[i].substr(0, thevalue.length) + "</strong>";
				autocompleteDivWord.innerHTML += arr[i].substr(thevalue.length);
				autocompleteDivWord.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
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
	userInputNav,
	countries
);

window.onload = function () {
	darkModeCheck();
	giphyTrending();
};
