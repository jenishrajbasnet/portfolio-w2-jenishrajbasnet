document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("nav-links");
  const menuButton = document.getElementById("menu-button");
  const themeToggle = document.getElementById("theme-toggle");
  const scrollProgress = document.getElementById("scroll-progress");
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  const yearSpan = document.getElementById("year");

  // Music Player
  const audioPlayer = document.getElementById("audio-player");
  const audioSource = document.getElementById("audio-source");
  const trackTitle = document.getElementById("track-title");
  const playPauseBtn = document.getElementById("play-pause");
  const prevTrackBtn = document.getElementById("prev-track");
  const nextTrackBtn = document.getElementById("next-track");
  const playlistButtons = document.querySelectorAll(".playlist-item");

  // Preload track list
  const tracks = [
    { title: "Lofi Track 1", file: "audio/track1.mp3" },
    { title: "Lofi Track 2", file: "audio/track2.mp3" },
    { title: "Lofi Track 3", file: "audio/track3.mp3" },
  ];

  let currentTrack = 0;

  function loadTrack(index) {
    currentTrack = index;
    audioSource.src = tracks[index].file;
    trackTitle.textContent = tracks[index].title;
    audioPlayer.load();

    playlistButtons.forEach((btn) => btn.classList.remove("active"));
    playlistButtons[index].classList.add("active");
  }

  function togglePlay() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseBtn.textContent = "⏸";
    } else {
      audioPlayer.pause();
      playPauseBtn.textContent = "▶";
    }
  }

  playPauseBtn.addEventListener("click", togglePlay);
  prevTrackBtn.addEventListener("click", () => {
    loadTrack((currentTrack - 1 + tracks.length) % tracks.length);
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
  });
  nextTrackBtn.addEventListener("click", () => {
    loadTrack((currentTrack + 1) % tracks.length);
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
  });

  playlistButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      loadTrack(parseInt(btn.dataset.index));
      audioPlayer.play();
      playPauseBtn.textContent = "⏸";
    });
  });

  // Initialize first track
  loadTrack(0);

  // Year auto-update
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Mobile Menu
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", isOpen);
      menuButton.textContent = isOpen ? "✕" : "☰";
    });
  }

  // Theme Toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  // Scroll Progress Bar
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
  });

  // Contact Form
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formMessage.textContent = "Message sent successfully!";
    formMessage.style.color = "var(--success)";
    contactForm.reset();
  });
});
