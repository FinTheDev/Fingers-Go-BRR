const text = "finger go brr but with skill";
const textDiv = document.getElementById("text");
const caret = document.getElementById("caret");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("acc");

let startTime = null;
let correctCount = 0;
let totalTyped = 0;

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

function updateStats() {
    if (!startTime) return;

    const elapsedMs = Date.now() - startTime;
    const minutes = elapsedMs / 60000;

    const wpm = minutes > 0
        ? Math.round((correctCount / 5) / minutes)
        : 0;

    const accuracy = totalTyped > 0
        ? Math.round((correctCount / totalTyped) * 100)
        : 100;

    wpmEl.textContent = `${wpm} WPM`;
    accEl.textContent = `${accuracy}%`;
}

document.addEventListener("keydown", (e) => {
    const chars = document.querySelectorAll(".char");

    if (e.key === "Backspace") {
        if (index === 0) return;

        index--;

        if (chars[index].classList.contains("correct")) {
            correctCount--;
        }

        chars[index].classList.remove("correct");
        chars[index].classList.remove("incorrect");

        totalTyped--;
        updateCaret();
        updateStats();
        e.preventDefault();
        return;
    }

    if (index >= text.length) return;
    if (e.key.length !== 1) return;

    if (!startTime) {
        startTime = Date.now();
    }

    const char = chars[index];

    if (e.key === text[index]) {
        char.classList.add("correct");
        correctCount++;
    } else {
        char.classList.add("incorrect");
    }

    totalTyped++;
    index++;

    updateCaret();
});

setInterval(updateStats, 1000)

renderText();
index = 0;
requestAnimationFrame(updateCaret);
