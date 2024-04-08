class Song {
  constructor(obj) {
    this.title = obj.title;
    this.artist = obj.artist;
    this.lyrics = obj.lyrics;
    this.filePath = obj.filePath;
    this.coverPath = obj.coverPath;
    this.musicWavesPath = obj.musicWavesPath;
    this.playing = false;
  }
}

document.addEventListener("alpine:init", () => {
  Alpine.store("lyrics", {
    nowPlaying: null,
    songs: [],

    init() {
      const song1 = new Song({
        title: "Believer",
        artist: " Imagine Dragons",
        lyrics: song_1_lyrics,
        filePath: "./assets/songs/believer.mp3",
        coverPath: "./assets/images/bg-poster/believer-poster.jpg",
        musicWavesPath: "./assets/images/audio-waves/audio-waves-1.gif",
      });
      const song2 = new Song({
        title: "Arcade",
        artist: "Duncan Laurence",
        lyrics: song_2_lyrics,
        filePath: "./assets/songs/arcade.mp3",
        coverPath: "./assets/images/bg-poster/arcade-poster.jpg",
        musicWavesPath: "./assets/images/audio-waves/audio-waves-2.gif",
      });
      const song3 = new Song({
        title: "Lovely",
        artist: "Billie Eilish",
        lyrics: song_3_lyrics,
        filePath: "./assets/songs/lovely.mp3",
        coverPath: "./assets/images/bg-poster/lovely-poster.jpg",
        musicWavesPath: "./assets/images/audio-waves/audio-waves-3.gif",
      });
      const song4 = new Song({
        title: "Happier",
        artist: "Bastille, Marshmello",
        lyrics: song_4_lyrics,
        filePath: "./assets/songs/happier.mp3",
        coverPath: "./assets/images/bg-poster/happier-poster.jpg",
        musicWavesPath: "./assets/images/audio-waves/audio-waves-4.gif",
      });
      const song5 = new Song({
        title: "Thunder",
        artist: "Imagine Dragons, K.Flay",
        lyrics: song_5_lyrics,
        filePath: "./assets/songs/thunder.mp3",
        coverPath: "./assets/images/bg-poster/thunder-poster.jpg",
        musicWavesPath: "./assets/images/audio-waves/audio-waves-5.gif",
      });

      // push above information into songs[] array
      this.songs.push(song1, song2, song3, song4, song5);
    },

    // song list Play-Button
    play(song) {
      if (this.nowPlaying) {
        this.nowPlaying.playing = false;
        this.nowPlaying.audioElement.pause();
      }
      this.nowPlaying = song;
      this.nowPlaying.audioElement = new Audio(this.nowPlaying.filePath);
      this.nowPlaying.audioElement.play();
      this.nowPlaying.playing = true;

      // assign current time to the progress bar 
      this.nowPlaying.audioElement.addEventListener("timeupdate", () => {
        this.progress = parseInt((this.nowPlaying.audioElement.currentTime / this.nowPlaying.audioElement.duration) * 100);
      });
    },

    // current song Play-Button
    toggle() {
      if (this.nowPlaying.audioElement.paused) {
        this.nowPlaying.audioElement.play();
        this.nowPlaying.playing = true;
      } else {
        this.nowPlaying.audioElement.pause();
        this.nowPlaying.playing = false;
      }
    },

    // for selected song lyrics & remove others
    handleLyrics(song) {
      song.lyricspri = !song.lyricspri;
      this.songs.forEach((s) => {
        if (s != song) {
          s.lyricspri = false;
        }
      });
    },

    // find current time of any audio
    currentTime: 0,
    progress: 0,
    isPlaying: false,
    audioElement: null,
    customBar: null,
    updateCurrentTime() {
      this.nowPlaying.audioElement.currentTime =
        (this.nowPlaying.audioElement.duration * this.progress) / 100;
    },

    // skip function
    backward() {
      this.nowPlaying.audioElement.currentTime = this.nowPlaying.audioElement.currentTime - 10;
    },
    forward() {
      this.nowPlaying.audioElement.currentTime = this.nowPlaying.audioElement.currentTime + 10;
    },

    // next song     
    next() {
      let currentSongIndex = this.songs.indexOf(this.nowPlaying);
      if(currentSongIndex < this.songs.length - 1){
        currentSongIndex += 1;
        
        const nextSong = this.songs[currentSongIndex];
        this.play(nextSong);
      }
      // when there is a last song loop again a playlist
      else{
        currentSongIndex = 0;
        const nextSong = this.songs[currentSongIndex];
        this.play(nextSong);
      }
    },

    // previous song
    previous() {
      let currentSongIndex = this.songs.indexOf(this.nowPlaying);
      if(currentSongIndex > 0){
        currentSongIndex -= 1;
        
        const prevSong = this.songs[currentSongIndex];
        this.play(prevSong);
      }
      // when there is first song loop again a playlist
      else{
        currentSongIndex = this.songs.length - 1;
        const prevSong = this.songs[currentSongIndex];
        this.play(prevSong);
      }
    },


  });
});
