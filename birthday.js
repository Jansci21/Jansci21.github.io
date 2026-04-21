const button = document.getElementById("click")
const video = document.getElementById("birthday")
button.addEventListener("click", () => {
    birthday.style.display = "block";
    birthday.play();
    button.style.display = "none";
})