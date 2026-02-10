const text = "finger go brr but with skill";
const textDiv = document.getElementById("text");
const caret = document.getElementById("caret");

let index = 0;

function renderText() {
    textDiv.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.classList.add("char");
        span.textContent = text[i];
        textDiv.appendChild(span);
    }
}

function updateCaret() {
    const chars = document.querySelectorAll(".char");
    if (index >= chars.length) return;

    const rect = chars[index].getBoundingClientRect();
    const parentRect = textDiv.getBoundingClientRect();

    caret.style.left = rect.left - parentRect.left + "px";
    caret.style.top = rect.top - parentRect.top + "px";
}

document.addEventListener("keydown", (e) => {
    if (index >= text.length) return;

    const chars = document.querySelectorAll(".char");
    const char = chars[index];

    if (e.key === text[index]) {
        char.classList.add("correct");
    } else {
        char.classList.add("incorrect");
    }

    index++;
    updateCaret();
});

renderText();
updateCaret();

