const intro = document.getElementById("intro");
const menu = document.getElementById("menu");
const birthdayText = document.getElementById("birthdayText");
const openGift = document.getElementById("openGift");

const messageModal = document.getElementById("messageModal");
const musicModal = document.getElementById("musicModal");
const photosModal = document.getElementById("photosModal");
const lightbox = document.getElementById("lightbox");

const messageCard = document.getElementById("messageCard");
const musicCard = document.getElementById("musicCard");
const photosCard = document.getElementById("photosCard");

const song = document.getElementById("song");
const bigCd = document.getElementById("bigCd");
const playSong = document.getElementById("playSong");
const songStatus = document.getElementById("songStatus");

const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");


/* Let the cake finish building, then reveal the greeting and try to start the song. */
let songStarted = false;

function startSongAutomatically() {
  if (songStarted) return;

  song.play()
    .then(() => {
      songStarted = true;
      bigCd.classList.add("playing");
      playSong.textContent = "❚❚ إيقاف الأغنية";
      songStatus.textContent = "الأغنية تعمل الآن 🤍";
    })
    .catch(() => {
      /* Blocked by the browser's autoplay policy until the visitor
         interacts with the page. The listeners below retry on the
         very first tap/click anywhere. */
    });
}

setTimeout(() => {
  birthdayText.classList.remove("hidden");
  startSongAutomatically();
}, 3300);

/* Most browsers refuse to play sound before any user interaction.
   The moment the visitor taps/clicks anywhere, try again. */
document.addEventListener("click", startSongAutomatically, { once: true });
document.addEventListener("touchstart", startSongAutomatically, { once: true });

/* Move from the intro to the three gifts. */
openGift.addEventListener("click", () => {
  intro.classList.add("hidden");
  menu.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Open modals. */
messageCard.addEventListener("click", () => {
  messageModal.classList.remove("hidden");
});

musicCard.addEventListener("click", () => {
  musicModal.classList.remove("hidden");
});

photosCard.addEventListener("click", () => {
  photosModal.classList.remove("hidden");
});

/* Close buttons. */
document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.close;
    document.getElementById(id).classList.add("hidden");
  });
});

/* Close when clicking outside the modal box. */
[messageModal, musicModal, photosModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

/* Music controls. */
async function toggleSong() {
  if (song.paused) {
    try {
      await song.play();
      songStarted = true;
      bigCd.classList.add("playing");
      playSong.textContent = "❚❚ إيقاف الأغنية";
      songStatus.textContent = "الأغنية شغاااله 🤍";
    } catch (error) {
      songStatus.innerHTML = 'ما لقيت ملف الأغنية. ضعي <b>song.mp3</b> بجانب index.html.';
    }
  } else {
    song.pause();
    songStarted = false;
    bigCd.classList.remove("playing");
    playSong.textContent = "▶ تشغيل الأغنية";
    songStatus.textContent = "وقفتي الاغنية يا هبله .";
  }
}

playSong.addEventListener("click", toggleSong);
bigCd.addEventListener("click", toggleSong);

song.addEventListener("ended", () => {
  bigCd.classList.remove("playing");
  playSong.textContent = "▶ تشغيل الأغنية";
  songStatus.textContent = "انتهت الأغنية 🤍";
});

/* Stop music when the music modal closes. */
document.querySelector('[data-close="musicModal"]').addEventListener("click", () => {
  song.pause();
  songStarted = false;
  bigCd.classList.remove("playing");
  playSong.textContent = "▶ تشغيل الأغنية";
});

/* Photo lightbox. */
document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightbox.classList.remove("hidden");
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.add("hidden");
  lightboxImage.src = "";
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.add("hidden");
    lightboxImage.src = "";
  }
});

/* Escape key closes open overlays. */
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  [messageModal, musicModal, photosModal, lightbox].forEach((element) => {
    element.classList.add("hidden");
  });

  song.pause();
  songStarted = false;
  bigCd.classList.remove("playing");
  playSong.textContent = "▶ تشغيل الأغنية";
});
