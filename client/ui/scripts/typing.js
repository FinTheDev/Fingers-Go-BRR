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
    const containerRect = document
        .getElementById("text-container")
        .getBoundingClientRect();

    if (chars.length === 0) return;

    if (index === 0) {
        const first = chars[0];
        const rect = first.getBoundingClientRect();

        caret.style.left = "0px";
        caret.style.top = (rect.top - containerRect.top) + "px";
        caret.style.height = rect.height + "px";
        return;
    }

    const prev = chars[index - 1];
    const rect = prev.getBoundingClientRect();

    caret.style.left =
        (rect.left - containerRect.left + rect.width) + "px";
    caret.style.top =
        (rect.top - containerRect.top) + "px";
    caret.style.height = rect.height + "px";
}

document.addEventListener("keydown", (e) => {
    const chars = document.querySelectorAll(".char");

    if (e.key === "Backspace") {
        if (index === 0) return;

        index--;

        chars[index].classList.remove("correct");
        chars[index].classList.remove("incorrect");

        updateCaret();
        e.preventDefault();
        return;
    }

    if (index >= text.length) return;
    if (e.key.length !== 1) return;

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

