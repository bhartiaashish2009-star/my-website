// =========================
// FRIENDSHIP DAY WEBSITE
// Version 2
// =========================

// Elements 

const loader = document.getElementById("loader");
const intro = document.getElementById("intro");
const story = document.getElementById("story");
const timeline = document.getElementById("timeline");
const finalPage = document.getElementById("final");

const unlock = document.getElementById("unlock");
const unlockText = document.getElementById("unlockText");
const unlockBar = document.getElementById("unlockBar");

const continueBtn = document.getElementById("continueBtn");
const nextBtn = document.getElementById("nextBtn");
const finalBtn = document.getElementById("finalBtn");
const replayBtn = document.getElementById("replayBtn");
const typing = document.getElementById("typing");
const hearts = document.getElementById("hearts");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const endingMessage = document.getElementById("endingMessage");
const theEnd = document.getElementById("theEnd");

// Typewriter Text
const text = "Glad You're Here, Kush! 💙\n\nThis little journey was made especially for you.";
let index = 0;

function typeWriter() {

    if (index < text.length) {

        if (text.charAt(index) === "\n") {
            typing.innerHTML += "<br>";
        } else {
            typing.innerHTML += text.charAt(index);
        }

        index++;

        setTimeout(typeWriter, 70);

    }

}

// Loader
const loadingText = document.getElementById("loadingText");

let progress = 0;

const loadingInterval = setInterval(() => {

    progress++;

    loadingText.innerHTML = `Loading... ${progress}%`;

    if(progress >= 100){
        clearInterval(loadingInterval);
    }

}, 30);
window.onload = () => {

    let progress = 0;

    const loadingText = document.getElementById("loadingText");

    const interval = setInterval(() => {

        progress++;

        loadingText.innerHTML = `Loading... ${progress}%`;

        if(progress >= 100){

            clearInterval(interval);

            setTimeout(() => {

                loader.style.opacity = "0";

                setTimeout(() => {

                    loader.style.display = "none";
                    intro.classList.remove("hidden");

                },700);

            },500);

        }

    },30);

}

// Continue Button

continueBtn.onclick = () => {
if (!isPlaying) {
    fadeInMusic();
    musicBtn.innerHTML = "⏸ Pause Music";
    isPlaying = true;
}

    intro.classList.add("hidden");
    unlock.classList.remove("hidden");

    let progress = 0;

    const messages = [
        "🔍 Searching Kindergarten...",
        "🏀 Searching Basketball...",
        "📚 Searching School Life...",
        "💙 Memories Found..."
    ];

    unlockText.innerHTML = messages[0];
    unlockBar.style.width = "0%";

    const interval = setInterval(() => {

        progress += 25;

        unlockBar.style.width = progress + "%";

        if (progress === 25) unlockText.innerHTML = messages[1];
        if (progress === 50) unlockText.innerHTML = messages[2];
        if (progress === 75) unlockText.innerHTML = messages[3];

        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                unlock.classList.add("hidden");
                story.classList.remove("hidden");
                typeWriter();

            }, 800);

        }

    }, 700);

};
// Next

nextBtn.onclick=()=>{

    story.classList.add("hidden");

    timeline.classList.remove("hidden");

}

finalBtn.onclick = () => {

    timeline.classList.add("hidden");
    finalPage.classList.remove("hidden");

    confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 }
    });
showEnding();

}

// Small Fade Animation

const sections=document.querySelectorAll("section");

sections.forEach(section=>{

    section.style.transition="1s";

});

replayBtn.onclick = () => {

    finalPage.classList.add("hidden");

    intro.classList.remove("hidden");

    typing.innerHTML = "";

    index = 0;

    unlockBar.style.width = "0%";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};
// ===== Music =====

let isPlaying = false;
function fadeInMusic() {

    bgMusic.volume = 0;
    fadeInMusic();

    let volume = 0;

    const fade = setInterval(() => {

        if (volume < 1) {
            volume += 0.05;
            bgMusic.volume = volume;
        } else {
            clearInterval(fade);
        }

    }, 100);

}

function fadeOutMusic() {

    let volume = bgMusic.volume;

    const fade = setInterval(() => {

        if (volume > 0.05) {
            volume -= 0.05;
            bgMusic.volume = volume;
        } else {
            clearInterval(fade);
            fadeOutMusic();
            bgMusic.volume = 1;
        }

    }, 100);

}
musicBtn.addEventListener("click", () => {

    if (!isPlaying) {

        bgMusic.play();

        musicBtn.innerHTML = "⏸ Pause Music";

        isPlaying = true;

    } else {

        bgMusic.pause();

        musicBtn.innerHTML = "🎵 Play Music";

        isPlaying = false;

    }

});
// ===== Floating Hearts =====

function createHeart() {

    // Final page पर ही Hearts दिखेंगे
    if (finalPage.classList.contains("hidden")) return;

    const heart = document.createElement("div");
    heart.className = "heart";
    const heartTypes = ["💗",  "💖", "💕", "💞"];

heart.innerHTML = heartTypes[
    Math.floor(Math.random() * heartTypes.length)
];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (4 + Math.random() * 4) + "s";
    heart.style.fontSize = (18 + Math.random() * 22) + "px";

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// हर 400ms में नया Heart
setInterval(createHeart, 400);
// ===== Final Ending =====

const endingText =
"No matter where life takes us... you'll always be my brother. 💙";

function showEnding() {

    endingMessage.innerHTML = "";
    theEnd.style.opacity = "0";

    let i = 0;

    function type() {

        if (i < endingText.length) {

            endingMessage.innerHTML += endingText.charAt(i);

            i++;

            setTimeout(type, 60);

        } else {

            setTimeout(() => {
                theEnd.style.opacity = "1";
            }, 800);

        }

    }

    type();

}
