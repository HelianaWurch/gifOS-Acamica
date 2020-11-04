// Dark Mode
const darkMode = () => {
	document.body.classList.toggle("dark-mode-colors");
	nocturno.classList.toggle("active");
	darkModeText();
};

const darkModeText = () => {
	if (nocturno.classList.contains("active")) {
		document.getElementById("nocturno").innerHTML = "Modo Diurno";
		localStorage.setItem("dark-mode", "true");
	} else {
		document.getElementById("nocturno").innerHTML = "Modo Nocturno";
		localStorage.setItem("dark-mode", "false");
	}
};

const darkModeCheck = () => {
	if (localStorage.getItem("dark-mode") === "true") {
		document.body.classList.add("dark-mode-colors");
		nocturno.classList.add("active");
	} else {
		document.body.classList.remove("dark-mode-colors");
		nocturno.classList.remove("active");
	}
	darkModeText();
};
