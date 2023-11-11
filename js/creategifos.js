const crearGifosTitle = createElement('h2', '');
crearGifosTitle.innerHTML =
  "Aquí podras <br/> crear tus propios <span class='color-title'> GIFOS </span>";

const crearGifosParagraph = createElement('p', '');
crearGifosParagraph.innerHTML =
  '¡Crea tu GIFO en sólo 3 pasos! <br/> (sólo necesitas una cámara para grabar un video)';

const recordTitle = createElement('h2', '');
recordTitle.innerHTML = '¿Nos das acceso <br/> a tu cámara?';

const recordParagraph = createElement('p', '');
recordParagraph.innerHTML =
  'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.';

const uploadingTitle = createElement('h2', 'upload-gifo');
uploadingTitle.innerHTML = 'Estamos subiendo tu GIFO';

const uploadingSuccessTitle = createElement('h2', 'upload-gifo');
uploadingSuccessTitle.innerHTML = 'GIFO subido con éxito';

const gifoDownloadBtn = createElement(
  'button',
  'card-btn download-btn cam-down-btn'
);
const gifoDownloadImg = createImgElement(
  'gif-btn ',
  './assets/icon-download.svg',
  'gif download button'
);
gifoDownloadBtn.appendChild(gifoDownloadImg);

const gifoLinkBtn = createElement(
  'button',
  'card-btn download-btn cam-link-btn'
);
const gifoLinkImg = createImgElement(
  'gif-btn',
  './assets/icon-link-normal.svg',
  'gif download button'
);
gifoLinkBtn.appendChild(gifoLinkImg);

const donut = createElement('div', 'donut');

const check = createElement('div', 'check');
check.innerHTML =
  "<svg class='checkmark' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52'><circle class='checkmark__circle' cx='26' cy='26' r='25' fill='none' /><path class='checkmark__check' fill='none' d='M14.1 27.2l7.1 7.2 16.7-16.8' /></svg>";

const stepElement = (element) => {
  element.classList.contains('svg-step')
    ? element.classList.remove('svg-step')
    : element.classList.toggle('svg-step');
};

gifoLinkBtn.addEventListener('click', toggleModal);
btnClose.addEventListener('click', toggleModal);

const gifMaxPlay = (btn, src, title, user, id, srcid) => {
  btn.onclick = function () {};
};

gifMaxPlay(gifoLinkBtn);

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
    ss = '0' + ss;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  if (hh < 10) {
    hh = '0' + hh;
  }
  camTimer.innerHTML = hh + ' : ' + mm + ' : ' + ss;
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
  camTimer.innerHTML = '00 : 00 : 00';
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
      camContainer.removeChild(crearGifosParagraph);
      camContainer.removeChild(crearGifosTitle);
      camContainer.appendChild(recordTitle);
      camContainer.appendChild(recordParagraph);
      stepElement(camStepOne);
      break;
    case 3:
      camContainer.removeChild(recordTitle);
      camContainer.removeChild(recordParagraph);
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
      recordTitle.innerHTML = '';
      recordParagraph.innerHTML = '';
      hiddenElement(record);
      hiddenElement(upload);
      hiddenElement(restart);
      break;
    case 8:
      camContainer.appendChild(uploadingTitle);
      camContainer.classList.add('cam-background-effect');
      visualEffects.appendChild(donut);
      hiddenElement(upload);
      break;
    case 9:
      camContainer.removeChild(uploadingTitle);
      camContainer.appendChild(uploadingSuccessTitle);
      visualEffects.removeChild(donut);
      visualEffects.appendChild(check);
      visualEffects.appendChild(gifoDownloadBtn);
      visualEffects.appendChild(gifoLinkBtn);
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
      let getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (!getUserMedia) {
        return Promise.reject(
          new Error('getUserMedia is not implemented in this browser')
        );
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

start.addEventListener('click', function () {
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
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log('started');
        },
      });

      record.addEventListener('click', (e) => {
        camVisualElements(4);
        recorder.startRecording();
        console.log('state: ' + video.state);
      });

      stop.addEventListener('click', (e) => {
        camVisualElements(5);
        recorder.stopRecording();

        setTimeout(function () {
          recorder.getBlob();
        }, 2000);
      });

      upload.addEventListener('click', async function () {
        camVisualElements(6);
        let form = new FormData();
        form.append('file', recorder.getBlob(), 'myGifo.gif');
        let postMyGif = await postMyGifo(form);
        saveMyGifoLS(postMyGif.data);
        console.log(postMyGif.data);
      });

      restart.addEventListener('click', (e) => {
        timerReset();
        camVisualElements(7);
      });
    })
    .catch(function (err) {
      console.log(err.name, err.message);
    });
}

/* Upload Gifo */

async function postMyGifo(file) {
  try {
    const postGiphy = {
      method: 'POST',
      body: file,
    };
    camVisualElements(8);
    const response = await fetch(apiUpload, postGiphy);
    const data = await response.json();
    camVisualElements(9);
    return data;
  } catch (error) {
    console.log('Fetch Error', error);
  }
}

/* Local Storage */

let myGifosArray;

function loadMyGifosMap() {
  if (myGifosArray === undefined) {
    let tmpGifos = localStorage.getItem('mis-gifos');
    if (tmpGifos === null) {
      myGifosArray = new Map();
    } else {
      myGifosArray = new Map(JSON.parse(localStorage.getItem('mis-gifos')));
    }
  }
  return myGifosArray;
}

function saveMyGifosMap() {
  localStorage.setItem(
    'mis-gifos',
    JSON.stringify(Array.from(myGifosArray.entries()))
  );
}

async function saveMyGifoLS(file) {
  let datos = {
    id: file.id,
    title: file.name,
    user: 'Heliana',
    src: `https://media.giphy.com/media/${file.id}/giphy.gif`,
  };

  await datos;

  let gifo = loadMyGifosMap().get(datos.id);

  if (gifo !== undefined) {
    loadMyGifosMap().delete(datos.id);
  } else {
    loadMyGifosMap().set(datos.id, datos);
  }

  saveMyGifosMap();
  gifDownload(gifoDownloadBtn, datos.name, datos.user, datos.src);
  gifoShowUrl(datos.src);
  return datos;
}

function gifoShowUrl(src) {
  let gifoUrl = document.getElementById('gifo-url');
  gifoUrl.innerHTML = `<div class="gifo-url-container"><p class="gifo-url">${src}</p><div>`;
}

window.onload = function () {
  loadMyGifosMap();
  saveMyGifosMap();
  darkModeCheck();
};
