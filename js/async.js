
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
  apiSearchCall(keyword)
    .then((jsonData) => {
      console.log(jsonData);
      // acá podes hacer el viejo for, o bien este for each, for each maneja automáticamente el
      // índice y sabe cuando parar, el parametro index lo puse como ejemplo, si lo tuvieses que
      // usar está ahi
      jsonData.data.forEach((element, index) => {
        doStuffWithImage(element.url);
      });
    });
}