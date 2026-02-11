let text = "";
const textDiv = document.getElementById("text");

const caret = document.getElementById("caret");
const CARET_X_RATIO = 0.3;

const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("acc");

let startTime = null;
let correctCount = 0;
let totalTyped = 0;

let index = 0;

let cursorX = 0;

async function loadRandomWords(count = 30) {
    const words = await window.pywebview.api.get_words();

    const chosen = [];
    for (let i = 0; i < count; i++) {
        chosen.push(words[Math.floor(Math.random() * words.length)]);
    }

    return chosen.join(" ");
}

function renderText() {
    textDiv.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.classList.add("char");

        if (text[i] === " ") {
            span.innerHTML = "&nbsp;";
        } else {
            span.textContent = text[i];
        }

        textDiv.appendChild(span);
    }
}

function updateCaret() {
    const chars = document.querySelectorAll(".char");
    if (chars.length === 0) return;

    const ref = index === 0 ? chars[0] : chars[index - 1];

    caret.style.left = cursorX + "px";
    caret.style.top = ref.offsetTop + "px";
    caret.style.height = ref.offsetHeight + "px";
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

function updateScroll() {
    const track = document.getElementById("text-track");
    const chars = document.querySelectorAll(".char");

    let textX = 0;

    if (index > 0) {
        const prev = chars[index - 1];
        textX = prev.offsetLeft + prev.offsetWidth;
    }

    const offset = cursorX - textX;
    track.style.transform = `translateX(${offset}px)`;
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

        totalTyped = Math.max(0, totalTyped - 1);
        updateCaret();
        updateScroll();
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
    updateScroll();
});

setInterval(updateStats, 1000)

async function init() {
    text = await loadRandomWords(30);
    renderText();
    
    cursorX = document.getElementById("text-container").clientWidth * 0.3;

    index = 0;
    startTime = null;
    correctCount = 0;
    totalTyped = 0;

    requestAnimationFrame(() => {
        updateCaret();
        updateScroll();
    });

    wpmEl.textContent = "0 WPM";
    accEl.textContent = "100%";
}

function startApp() {
    init();
}

if (window.pywebview) {
    startApp();
} else {
    window.addEventListener("pywebviewready", startApp);
}
