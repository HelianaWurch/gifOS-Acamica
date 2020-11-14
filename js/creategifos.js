const videoMaxLength = 120;

let chunks = [];

const crearGifosTitle = createElement("h2", "");
crearGifosTitle.innerHTML =
	"Aquí podras <br/> crear tus propios <span class='color-title'> GIFOS </span>";

const crearGifosParagraph = createElement("p", "");
crearGifosParagraph.innerHTML =
	"¡Crea tu GIFO en sólo 3 pasos! <br/> (sólo necesitas una cámara para grabar un video)";

const recordTitle = createElement("h2", "");
recordTitle.innerHTML = "¿Nos das acceso a tu cámara?";

const recordParagraph = createElement("p", "");
recordParagraph.innerHTML =
	"El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";

const stepElement = (element) => {
	element.classList.contains("svg-step")
		? element.classList.remove("svg-step")
		: element.classList.toggle("svg-step");
};

let isMarch = false;
let acumularTime = 0;

function timerStart() {
	if (isMarch == false) {
		timeInicial = new Date();
		control = setInterval(cronometro, 10);
		isMarch = true;
	}
}
function cronometro() {
	timeActual = new Date();
	acumularTime = timeActual - timeInicial;
	acumularTime2 = new Date();
	acumularTime2.setTime(acumularTime);

	ss = acumularTime2.getSeconds();
	mm = acumularTime2.getMinutes();
	hh = acumularTime2.getHours() - 21;

	if (ss < 10) {
		ss = "0" + ss;
	}
	if (mm < 10) {
		mm = "0" + mm;
	}
	if (hh < 10) {
		hh = "0" + hh;
	}
	camTimer.innerHTML = hh + " : " + mm + " : " + ss;
}

function timerStop() {
	if (isMarch == true) {
		clearInterval(control);
		isMarch = false;
	}
}

function timerResume() {
	if (isMarch == false) {
		timeActu2 = new Date();
		timeActu2 = timeActu2.getTime();
		acumularResume = timeActu2 - acumularTime;

		timeInicial.setTime(acumularResume);
		control = setInterval(cronometro, 10);
		isMarch = true;
	}
}

function timerReset() {
	if (isMarch == true) {
		clearInterval(control);
		isMarch = false;
	}

	acumularTime = 0;
	camTimer.innerHTML = "00 : 00 : 00";
}

/* */
const camVisualElements = (casevalue) => {
	switch (casevalue) {
		case 1:
			hiddenElement(stop);
			hiddenElement(record);
			hiddenElement(upload);
			hiddenElement(restart);
			hiddenElement(camTimer);
			camContainer.appendChild(crearGifosTitle);
			camContainer.appendChild(crearGifosParagraph);
			break;
		case 2:
			crearGifosTitle.innerHTML = "";
			crearGifosParagraph.innerHTML = "";
			camContainer.appendChild(recordTitle);
			camContainer.appendChild(recordParagraph);
			stepElement(camStepOne);
			break;
		case 3:
			recordTitle.innerHTML = "";
			recordParagraph.innerHTML = "";
			hiddenElement(record);
			stepElement(camStepOne);
			stepElement(camStepTwo);
			break;
		case 4:
			hiddenElement(record);
			hiddenElement(stop);
			hiddenElement(camTimer);
			timerStart();
			break;
		case 5:
			hiddenElement(stop);
			hiddenElement(upload);
			hiddenElement(restart);
			hiddenElement(camTimer);
			timerStop();
			break;
		case 6:
			stepElement(camStepTwo);
			stepElement(camStepThree);
			hiddenElement(restart);
			break;
		case 7:
			recordTitle.innerHTML = "";
			recordParagraph.innerHTML = "";
			hiddenElement(record);
			hiddenElement(upload);
			hiddenElement(restart);
			break;
	}
};

const constraintObj = {
	audio: false,
	video: {
		width: { min: 640, ideal: 854, max: 1280 },
		height: { min: 480, ideal: 480, max: 720 },
	},
};

function navCamAdmission() {
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
}

camVisualElements(1);

start.addEventListener("click", function () {
	camVisualElements(2);
	navCamAdmission();
	getStreamAndRecord();
});

function getStreamAndRecord() {
	navigator.mediaDevices
		.getUserMedia(constraintObj)
		.then(async function (stream) {
			camVisualElements(3);

			video.srcObject = stream;
			video.play();

			recorder = RecordRTC(stream, {
				type: "gif",
				frameRate: 1,
				quality: 10,
				width: 360,
				hidden: 240,
				onGifRecordingStarted: function () {
					console.log("started");
				},
			});

			record.addEventListener("click", (e) => {
				camVisualElements(4);
				recorder.startRecording();
				console.log("state: " + video.state);
			});

			stop.addEventListener("click", (e) => {
				camVisualElements(5);
				recorder.stopRecording();

				setTimeout(function () {
					recorder.getBlob();
				}, 2000);
			});

			upload.addEventListener("click", (e) => {
				camVisualElements(6);
				let form = new FormData();
				form.append("file", recorder.getBlob(), "myGifo.gif");
				console.log(form.get("file"));
			});

			restart.addEventListener("click", (e) => {
				timerReset();
				camVisualElements(7);
			});
		})
		.catch(function (err) {
			console.log(err.name, err.message);
		});
}

/* Local Storage */

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

function saveMyGifosMap() {
	localStorage.setItem("mis-gifos", JSON.stringify(Array.from(myGifosArray.entries())));
}

function setMyGifos(key, value) {
	loadMyGifosMap().set(key, value);
}

function getMyGifos(key) {
	loadMyGifosMap().get(key);
}

/*
const gifMyGifos = (btn, src, title, user, id, srcid, container, img) => {
	btn.addEventListener("click", function (e) {
		// hacemos que no se ejecute el enlace
		e.preventDefault();

		// leemos los datos clave del producto y los guardamos en un objeto
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

		// guardamos la lista de favoritos
		saveMyFavMap();

		// leemos los favoritos del localStorage
		favContainer.innerHTML = "";
		drawMyFavs();
	});
};

*/

window.onload = function () {
	loadMyGifosMap();
	saveMyGifosMap();
	darkModeCheck();
};
