const promptBox = document.getElementById("promptBox");
const promptTitle = document.getElementById("promptTitle");
const promptText = document.getElementById("promptText");

const displayPrompt = (title, text) => {
    gameSpeed(99);

    promptTitle.innerText = title;
    promptText.innerText = text;

    promptBox.style.display = "block";
}

const closePrompt = () => {
    promptBox.style.display = "none";

    gameSpeed(0);
}