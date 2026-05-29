const first = document.querySelector('#first');

if (first) {

  const images = [
    "background/img1.jpg",
    "background/img2.jpg",
    "background/img6.jpg",
    "background/img3.png",
    "background/img7.jpg",
    "background/durmitor.webp"
  ];

  let i = 0;

  //BACKGROUND CHANGE FOR MAIN PAGE
  
  function changeBackground() {
    document.body.style.backgroundImage = `url(${images[i]})`;
    document.body.className = "";
    i = (i + 1) % images.length;
  }

  changeBackground();
  setInterval(changeBackground, 3000);
}

const sections = document.querySelectorAll('.category');

function scrollNext(currentId) {
  const ids = Array.from(sections).map(s => s.id);
  const index = ids.indexOf(currentId);
  const next = ids[index + 1];
  const before = ids[index - 1];

  if (next) {
    document.getElementById(next).scrollIntoView({ behavior: 'smooth' });
  } else if (before) {
    document.getElementById(before).scrollIntoView({ behavior: 'smooth' });
  }
}

let galleries = {};
let currentGallery = null;
let currentIdx = 0;

//LOAD JSON

fetch('galleries.json')
  .then(r => r.json())
  .then(data => {
    galleries = data.galleries;
    renderPage();
  });

//RENDER OF PAGE FOR PARKS, MOUNTAINS AND COASTAL DESTINATIONS

function renderPage() {
  const pageType = document.body.dataset.page;
  const container = document.querySelector("#dynamic-content");

  if (!container || !galleries[pageType]) return;

  const data = galleries[pageType];

  container.innerHTML = "";

  data.forEach((item, index) => {

    const section = document.createElement("section");
    section.className = "park-section";
    section.id = item.id;

    section.innerHTML = `
      <div class="park-info">
        <div class="park-number">${String(index + 1).padStart(2, "0")}</div>
        <h2 class="park-name">${item.name}</h2>
        <p class="park-desc">${item.desc || ""}</p>
        <div class="park-facts">
          ${(item.facts || []).map(f => `
            <div class="fact">
              <span class="fact-label">${f.label}</span>
              <span class="fact-value">${f.value}</span>
            </div>
          `).join("")}
        </div>
        <button class="gallery-btn"
          onclick="openGallery('${pageType}','${item.id}')">
          View all photos
        </button>
      </div>

      <div class="park-gallery-col">
        <div class="thumb-grid">
          ${item.images.map((img, i) => `
            <div class="thumb"
              onclick="openGallery('${pageType}','${item.id}',${i})">
              <img src="${img.src}" alt="${img.caption}">
              <div class="thumb-overlay"></div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    container.appendChild(section);
  });

  observeSections();
}

/* =========================
   🖼 LIGHTBOX
========================= */

function openGallery(category, id, idx = 0) {
  const list = galleries[category];

  if (!list) return;

  currentGallery = list.find(item => item.id === id);

  if (!currentGallery) return;

  currentIdx = idx;

  renderLightbox();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function renderLightbox() {
  if (!currentGallery) return;

  const img = currentGallery.images[currentIdx];

  document.getElementById('lb-image').src = img.src;
  document.getElementById('lb-image').alt = img.caption;

  document.getElementById('lb-caption').textContent =
    currentGallery.name + ' — ' + img.caption;

  const dots = document.getElementById('lb-dots');
  dots.innerHTML = '';

  currentGallery.images.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'lb-dot' + (i === currentIdx ? ' active' : '');
    d.onclick = () => {
      currentIdx = i;
      renderLightbox();
    };
    dots.appendChild(d);
  });
}

function lbNav(dir) {
  if (!currentGallery) return;

  currentIdx =
    (currentIdx + dir + currentGallery.images.length) %
    currentGallery.images.length;

  renderLightbox();
}

/* keyboard support */
const lightbox = document.getElementById('lightbox');

document.addEventListener('keydown', e => {
  if (!lightbox || !lightbox.classList.contains('active')) return;

  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'Escape') closeLightbox();
});

/* close on background click */
if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
}

/* =========================
   👁 SCROLL REVEAL
========================= */

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

function observeSections() {
  document.querySelectorAll('.park-section').forEach(s => observer.observe(s));
}

/* =========================
   🔐 PASSWORD LOGIC (UNCHANGED)
========================= */

document.addEventListener("DOMContentLoaded", () => {

  function setupToggle(toggleId, inputId, showId, hideId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    const show = document.getElementById(showId);
    const hide = document.getElementById(hideId);

    if (!toggle || !input || !show || !hide) return;

    toggle.addEventListener("click", () => {
      const isPassword = input.type === "password";

      input.type = isPassword ? "text" : "password";
      show.style.display = isPassword ? "none" : "flex";
      hide.style.display = isPassword ? "flex" : "none";
    });
  }

  setupToggle("togglePassword", "passwordLogin", "showEye", "hideEye");
  setupToggle("togglePassword2", "passwordRegister", "showEye2", "hideEye2");
  setupToggle("togglePassword3", "passwordRegister2", "showEye3", "hideEye3");

  function isValidPassword(password) {
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const longEnough = password.length >= 8;

    return hasUpper && hasNumber && hasSpecial && longEnough;
  }

  const form = document.querySelector("form");

  form?.addEventListener("submit", (e) => {
    const pw1 = document.getElementById("passwordRegister")?.value;
    const pw2 = document.getElementById("passwordRegister2")?.value;

    if (!pw1 || !pw2) return;

    if (pw1 !== pw2) {
      e.preventDefault();
      alert("Passwords do not match!");
      return;
    }

    if (!isValidPassword(pw1)) {
      e.preventDefault();
      alert("Password must have 8 or more characters, 1 uppercase, 1 number, 1 special character!");
      return;
    }
  });
});