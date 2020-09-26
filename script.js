const music = document.querySelector('.music')
const audio = document.querySelector('.audio')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const author = document.querySelector('.author')
const title = document.querySelector('.title')
const coverImage = document.querySelector('.image')
const background = document.querySelector('.container')

let currentSongIndex = 0
let isPlaying = false;

const songList = [
    { authorName: 'Hemanth', trackTitle: 'Are you ready?', id: 1 },
    { authorName: 'Hemanth', trackTitle: 'Are you ready?', id: 2 },
    // { authorName: 'Hemanth', trackTitle: 'Are you ready?', id: 3 },
    { authorName: 'Hemanth', trackTitle: 'Are you ready?', id: 4 },
]

function playSong() {
    audio.play();
    music.className= "music pause"
    isPlaying = true
}

function pauseSong() {
    audio.pause();
    music.className = "music play"
    isPlaying = false
}

function nextSong () {
    if (currentSongIndex === songList.length - 1) currentSongIndex = 0
    else currentSongIndex += 1
    loadSong(songList[currentSongIndex])
    playSong()
}

function previousSong () {
    if (currentSongIndex === 0) currentSongIndex = songList.length - 1
    else currentSongIndex -= 1
    loadSong(songList[currentSongIndex])
    playSong()
}

function loadSong(song) {
    const { authorName, trackTitle, id } = song
    const image = `./images/image${id}.jpg`
    author.innerHTML = authorName
    title.innerHTML = trackTitle
    audio.src = `./mp3/music${id}.mp3`
    coverImage.src = image
    background.style.backgroundImage = `url(${image})`
}

music.addEventListener('click', () => {
    isPlaying = !isPlaying
    music.className = `music ${isPlaying ? 'pause' : 'play'}`
    isPlaying ? playSong() : pauseSong()
})

next.addEventListener('click', nextSong)
prev.addEventListener('click', previousSong)

//init
loadSong(songList[currentSongIndex])