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

//Pictures and caption for every park

const galleries = {
  durmitor: {
    name: "National Park Durmitor",
    images: [
      { src: "parks/d1.webp", caption: "Durmitor peaks" },
      { src: "parks/d2.jpg", caption: "Black Lake" },
      { src: "parks/d3.webp", caption: "Tara Canyon" },
    ]
  },
  biogradska: {
    name: "Biogradska Gora",
    images: [
      { src: "parks/b1.jpg", caption: "Biogradsko Lake" },
      { src: "parks/b2.jpg", caption: "500-year-old beech canopy" },
      { src: "parks/b3.jpg", caption: "Forest trail — Bjelasica" },
    ]
  },
  lovcen: {
    name: "Lovćen",
    images: [
      { src: "parks/l1.jpg", caption: "View toward Bay of Kotor" },
      { src: "parks/l2.webp", caption: "Lovćen above the clouds" },
      { src: "parks/l3.jpg", caption: "Hills" },
    ]
  },
  skadar: {
    name: "Skadarsko Lake",
    images: [
      { src: "parks/s1.jpg", caption: "Water lilies" },
      { src: "parks/s2.jpg", caption: "Fishing villages" },
      { src: "parks/s3.webp", caption: "Pelicans" },
    ]
  },
  prokletije: {
    name: "Prokletije",
    images: [
      { src: "parks/p1.webp", caption: "Peaks" },
      { src: "parks/p2.jpg", caption: "Hiking tour"},
      { src: "parks/p3.jpg", caption: "Villages"},
    ]
  }
};

let currentGallery = null;
let currentIdx = 0;

function openGallery(id, idx = 0) {
  currentGallery = galleries[id];
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

// Keyboard navigation for images

document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'Escape')     closeLightbox();
});

// Close on backdrop click
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});

// Scroll-reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.park-section').forEach(s => observer.observe(s));