const musicas = [
    {
        nome: "Six Days",
        audio: "./assets/music/six-days.mp3",
        capa: "./assets/img/six-days-capa.jpg",
        autor: "Dj Shadow",
        cor: "rgba(255,107,0,0.3)",
    },
    {
        nome: "Notion",
        audio: "./assets/music/notion.mp3",
        capa: "./assets/img/notion-capa.jpg",
        autor: "The Rare Ocassions",
        cor: "rgba(240,102,79,0.3)",
    },
    {
        nome: "Stronger",
        audio: "./assets/music/stronger.mp3",
        capa: "./assets/img/stronger-capa.jpg",
        autor: "Kanye West",
        cor: "rgba(255,0,184,0.3)",
    },
    {
        nome: "The King's Affirmation",
        audio: "./assets/music/the-kings-affirmation.mp3",
        capa: "./assets/img/the-kings-affirmation-capa.jpg",
        autor: "Iniko",
        cor: "rgba(221,188,98,0.3)",
    },
    {
        nome: "Tokka",
        audio: "./assets/music/tokka.mp3",
        capa: "./assets/img/tokka-capa.jpg",
        autor: "Agnes Obel",
        cor: "rgba(152,35,6,0.3)",
    },
    {
        nome: "Ruins Of A Long Gone Past",
        audio: "./assets/music/ruins-of-a-long-gone-past.mp3",
        capa: "./assets/img/ruins-of-a-long-gone-past-capa.jpg",
        autor: "Alpine Universe",
        cor: "rgba(96,105,123,0.3)",
    },
];

const audio = document.getElementById("audio");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const playBtn = document.getElementById("playBtn");
const playBtnIcon = playBtn.querySelector("img");
const volumeMinus = document.getElementById("minusVolume");
const volumePlus = document.getElementById("plusVolume");
const capa = document.getElementById("capa");
const nome = document.getElementById("nome");
const autor = document.getElementById("autor");
const html = document.querySelector(':root');
const timePlus = document.getElementById('plusTime');
const timeMinus = document.getElementById('minusTime');

let musicaAtual = 0;

audio.volume = 0.5;

prev.addEventListener('click', () => {
    alterarMusica(-1);
});

next.addEventListener('click', () => {
    alterarMusica(1);
});

playBtn.addEventListener('click', togglePlay);

volumeMinus.addEventListener('click', () => {
    changeVolume(-0.1);
});

volumePlus.addEventListener('click', () => {
    changeVolume(0.1);
});

timeMinus.addEventListener('click', () => {
    changeTime(-10);
});

timePlus.addEventListener('click', () => {
    changeTime(10);
});

audio.addEventListener('timeupdate', timeUpdate);

audio.addEventListener('ended', () => {
    alterarMusica(1);
});


function alterarMusica(num) {
    musicaAtual += num;

    if (musicaAtual > musicas.length - 1) {
        musicaAtual = 0;
    } else if (musicaAtual < 0) {
        musicaAtual = musicas.length - 1;
    }

    capa.src = musicas[musicaAtual].capa;
    nome.innerHTML = musicas[musicaAtual].nome;
    autor.innerHTML = musicas[musicaAtual].autor;
    html.style.setProperty('--bg-grandient', musicas[musicaAtual].cor);

    let isPaused = audio.paused;
    let isEnded = audio.ended;
    audio.src = musicas[musicaAtual].audio;
    audio.load();

    if (!isPaused || isEnded) audio.play();
}

function togglePlay() {
    if (audio.paused == true) {
        playBtnIcon.src = "./assets/icon/pause-icon.svg";
        audio.play();
    } else {
        playBtnIcon.src = "./assets/icon/play-icon.svg";
        audio.pause();
    }
}

function changeVolume(num) {
    let volume = audio.volume + num;
    if (volume >= 0 && volume <= 1) audio.volume = volume;
}

function changeTime(num) {
    audio.currentTime += num;
}

let lastPercentage = -1;
function timeUpdate() {
    let timePercentage = Math.round((audio.currentTime / audio.duration) * 100);

    if (timePercentage != lastPercentage) {
        lastPercentage = timePercentage;
        playBtn.style.background = `radial-gradient(closest-side, rgb(36,36,36) 90%, transparent 90% 100%), conic-gradient(white ${timePercentage || 0}%, #474d4d 0)`;
    }
}