const myFavoritesGifsArray = [];
localStorage.setItem("mis-gifs-favoritos", JSON.stringify(myFavoritesGifsArray));

// const myFavoritesGifsGet = localStorage.getItem("mis-gifs-favoritos");
// console.log("objetoObtenido: ", JSON.parse(myFavoritesGifsGet)); //cambiar por acción

let elements = document.getElementsByClassName("gif-card");
console.log(elements);
console.log(elements);

let myFunction = function () {
	let attribute = "hola";
	alert(attribute);
	console.log("HEY");
};

for (let i = 0; i < elements.length; i++) {
	elements[i].addEventListener("click", myFunction);
}

Array.from(elements).forEach(function (element) {
	element.addEventListener("click", myFunction);
});
