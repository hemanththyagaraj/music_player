const music = document.querySelector(".music");
const audio = document.querySelector(".audio");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const author = document.querySelector(".author");
const title = document.querySelector(".title");
const coverImage = document.querySelector(".image");
const background = document.querySelector(".container");
const elapsedTime = document.querySelector(".time__elapsed");
const songDuration = document.querySelector(".duration");
const progressContainer = document.querySelector('.progress__container')
const progressBar = document.querySelector('.progress')

let currentSongIndex = 0;
let isPlaying = false;

const songList = [
  { authorName: "Ethos Music", trackTitle: "Final Hope", id: 1 },
  { authorName: "Calvin Harris", trackTitle: "Lets Go", id: 2 },
  { authorName: "Rihanna", trackTitle: "We Found Love", id: 3 },
  { authorName: "Samuel Karl", trackTitle: "Unlocking the mind", id: 4 },
];

function playSong() {
  audio.play();
  music.className = "music pause";
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  music.className = "music play";
  isPlaying = false;
}

function nextSong() {
  if (currentSongIndex === songList.length - 1) currentSongIndex = 0;
  else currentSongIndex += 1;
  loadSong(songList[currentSongIndex]);
  playSong();
}

function previousSong() {
  if (currentSongIndex === 0) currentSongIndex = songList.length - 1;
  else currentSongIndex -= 1;
  loadSong(songList[currentSongIndex]);
  playSong();
}

function loadSong(song) {
  const { authorName, trackTitle, id } = song;
  const image = `./images/image${id}.jpg`;
  author.innerHTML = authorName;
  title.innerHTML = trackTitle;
  audio.src = `./mp3/music${id}.mp3`;
  coverImage.src = image;
  background.style.backgroundImage = `url(${image})`;
}

function setTimings(elapsed, totalDuration) {
  if (isNaN(totalDuration)) {
    songDuration.textContent = "0:00";
  } else {
    const totalDurationMinutes = Math.floor(totalDuration / 60);
    const totalDurationSeconds = Math.floor(totalDuration % 60);
    songDuration.textContent = `${totalDurationMinutes}:${
      totalDurationSeconds < 10
        ? `0${totalDurationSeconds}`
        : totalDurationSeconds
    }`;
  }

  if (!elapsed) elapsedTime.textContent = "0:00";
  else {
    const minutesElapsed = Math.floor(elapsed / 60);
    const secondsElapsed = Math.floor(elapsed % 60);
    elapsedTime.textContent = `${minutesElapsed}:${
      secondsElapsed < 10 ? `0${secondsElapsed}` : secondsElapsed
    }`;
    const progress = Math.floor((elapsed / totalDuration) * 100)
    setProgressBar(progress)
  }
}

function setProgressBar (width) {
    progressBar.style.width = `${width}%`
}

function setProgress (clientWidth, clickX) {
    const clickPercentage = (clickX / clientWidth) * audio.duration
    audio.currentTime = clickPercentage
}

music.addEventListener("click", () => {
  isPlaying = !isPlaying;
  music.className = `music ${isPlaying ? "pause" : "play"}`;
  isPlaying ? playSong() : pauseSong();
});

next.addEventListener("click", nextSong);
prev.addEventListener("click", previousSong);

// on current song ends playing
audio.addEventListener("ended", () => {
  nextSong()
});

// as playback changes
audio.addEventListener("timeupdate", (e) => {
  const {
    target: { currentTime, duration },
  } = e;
  setTimings(currentTime, duration);
});

// as progress bar is clicked
progressContainer.addEventListener("click", function(e) {
    const { clientWidth } = this
    const clickX= e.offsetX
    setProgress(clientWidth, clickX)
})


//init
loadSong(songList[currentSongIndex]);
