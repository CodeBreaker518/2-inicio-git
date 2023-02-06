
const playBtn = document.querySelector('.play-btn')
const music = document.querySelector('#audio')
const seekBar = document.querySelector('.seek-bar')
const songName = document.querySelector('.music-name')
const artistName = document.querySelector('.artist-name')
const disk = document.querySelector('.disk')
const currentTime = document.querySelector('.current-time')
const musicDuration = document.querySelector('.song-duration')
const forwardBtn = document.querySelector('.forward-btn')
const backwardBtn = document.querySelector('.backward-btn')

playBtn.addEventListener('click', () => {
  if (playBtn.className.includes('pause')){
    playBtn.classList.toggle('pause')
    disk.classList.toggle('play')
    music.play() 
  }else{ 
    playBtn.classList.toggle('pause')
    disk.classList.toggle('play') 
    music.pause()
  }
})

const setMusic = (i) => {
  seekBar.value = 0
  let song = songs[i]
  currentMusic = i
  music.src = song.path //song['path']
  songName.innerHTML = song.name
  artistName.innerHTML = song.artist
  disk.style.backgroundImage = `url('${song.cover}')`
  currentTime.innerHTML = '00:00'
  // delay
  setTimeout(() => {
    seekBar.max = music.duration
    console.log('duration', music.duration)
    musicDuration.innerHTML = formatTime(music.duration)
  }, 300)
}
setMusic(4)

const formatTime = (time) =>{
  let minutes = Math.floor(time/60)
  if (minutes < 10){
    minutes = `0${minutes}`
  }

  let seconds = Math.floor(time % 60)
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  return `${minutes} : ${seconds}`
}

// seekBar

setInterval(() => {
  seekBar.value = music.currentTime
  currentTime.innerHTML = formatTime(music.currentTime)
  if (Math.floor(music.currentTime === Math.floor(seekBar.max))){
    forwardBtn.click()
  }
}, 1000);

// forward & backward 

forwardBtn.addEventListener('click', () => {
  if(currentMusic >= songs.length - 1){
    currentMusic = 0
  } else{
    currentMusic++
  }
  setMusic(currentMusic)
  playMusic()
})