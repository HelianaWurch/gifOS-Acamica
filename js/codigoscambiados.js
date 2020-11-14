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

function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
	let currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function (e) {
		let a,
			b,
			i,
			val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) {
			return false;
		}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function (e) {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName("input")[0].value;
					/*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function (e) {
		let x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 38) {
			//up
			/*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		}
	});

	inp.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if (currentFocus > -1) {
				let x = document.getElementById(this.id + "autocomplete-list");
				/*and simulate a click on the "active" item:*/
				if (x) x[currentFocus].click();
			}
		}
	});

	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
    except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}

autocomplete(document.getElementById("input-text"), countries);

/* Crear Gifos */

start.addEventListener("click", function () {
	camVisualElements(2);
	if (navigator.mediaDevices === undefined) {
		navigator.mediaDevices = {};
		navigator.mediaDevices.getUserMedia = function (constraintObj) {
			let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
			if (!getUserMedia) {
				return Promise.reject(new Error("getUserMedia is not implemented in this browser"));
			}
			return new Promise(function (resolve, reject) {
				getUserMedia.call(navigator, constraintObj, resolve, reject);
			});
		};
	} else {
		navigator.mediaDevices
			.enumerateDevices()
			.then((devices) => {
				devices.forEach((device) => {
					console.log(device.kind.toUpperCase(), device.label);
					hiddenElement(start);
				});
			})
			.catch((err) => {
				console.log(err.name, err.message);
			});
	}

	navigator.mediaDevices
		.getUserMedia(constraintObj)
		.then(function (mediaStreamObj) {
			camVisualElements(3);

			if ("srcObject" in video) {
				video.srcObject = mediaStreamObj;
			} else {
				video.src = window.URL.createObjectURL(mediaStreamObj);
			}

			video.onloadedmetadata = function (e) {
				video.play();
			};

			let mediaRecorder = new MediaRecorder(mediaStreamObj);

			record.addEventListener("click", (e) => {
				mediaRecorder.start();
				camVisualElements(4);

				console.log(mediaRecorder.state);
			});

			stop.addEventListener("click", (e) => {
				mediaRecorder.stop();
				camVisualElements(5);

				console.log(mediaRecorder.state);
			});

			mediaRecorder.ondataavailable = function (e) {
				chunks.push(e.data);
			};
			mediaRecorder.onstop = (e) => {
				let blob = new Blob(chunks, { type: "video/mp4;" });
				chunks = [];

				let videoURL = window.URL.createObjectURL(blob);
				videoSave.src = videoURL;
			};
		})
		.catch(function (err) {
			console.log(err.name, err.message);
		});
});
