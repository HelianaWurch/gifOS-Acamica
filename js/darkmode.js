// Dark Mode
const darkMode = () => {
	document.body.classList.toggle("dark-mode-colors");
	nocturno.classList.toggle("active");
	darkModeText();
};

const darkModeText = () => {
	if (nocturno.classList.contains("active")) {
		document.getElementById("nocturno").innerHTML = "Modo Diurno";
	} else {
		document.getElementById("nocturno").innerHTML = "Modo Nocturno";
	}
};
