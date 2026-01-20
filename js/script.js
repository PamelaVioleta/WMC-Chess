let signUp = document.getElementById("signUp");
let signIn = document.getElementById("signIn");
let nameInput = document.getElementById("nameInput");
let title = document.getElementById("title");
let titleWillkomen = document.getElementById("titleWillkomen")

signIn.onclick = function() {
    nameInput.style.maxHeight = "0";
    title.innerHTML = "SpACH LOGIN";
    titleWillkomen.innerHTML = "Willkommen! Bitte melde dich an, um zu starten";
    signUp.classList.add("disable");
    signIn.classList.remove("disable");
}

signUp.onclick = function() {
    nameInput.style.maxHeight = "60px";
    title.innerHTML = "Konto erstellen";
    titleWillkomen.innerHTML ="Geben Sie Ihre Daten ein...";
    signUp.classList.remove("disable");
    signIn.classList.add("disable");
}

