const first = document.querySelector('#first');

if(first){

  const images = [
    "background/img1.jpg",
    "background/img2.jpg",
    "background/img6.jpg",
    "background/img3.png",
    "background/img7.jpg",
    "background/durmitor.webp"
  ];

  let i=0;

  function changeBackground() {
    document.body.style.backgroundImage = `url(${images[i]})`;
    document.body.className="";
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
    }else{
        document.getElementById(before).scrollIntoView({ behavior: 'smooth'});
    }
}

//Pictures and caption for every national park

fetch('galleries.json')
  .then(r => r.json())
  .then(data => {
    galleries = data.galleries;
  });


let currentGallery = null;
let currentIdx = 0;

function openGallery(category,id, idx = 0) {
  currentGallery = galleries[category][id];
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
  const img = currentGallery.images[currentIdx];
  document.getElementById('lb-image').src = img.src;
  document.getElementById('lb-image').alt = img.caption;
  document.getElementById('lb-caption').textContent = currentGallery.name + ' — ' + img.caption;

  const dots = document.getElementById('lb-dots');
  dots.innerHTML = '';
  currentGallery.images.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'lb-dot' + (i === currentIdx ? ' active' : '');
    d.onclick = () => { currentIdx = i; renderLightbox(); };
    dots.appendChild(d);
  });
}

function lbNav(dir) {
  currentIdx = (currentIdx + dir + currentGallery.images.length) % currentGallery.images.length;
  renderLightbox();
}

const lightbox = document.getElementById('lightbox');

// Keyboard navigation for images

document.addEventListener('keydown', e => {
  if (!lightbox) return;
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'Escape')     closeLightbox();
});

// Close on backdrop click
if (lightbox) {
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });
}

// Scroll-reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.park-section').forEach(s => observer.observe(s));

//password logic
//hide and show password


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

    //checking is password valid
    
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