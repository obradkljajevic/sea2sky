const images = [
    "img1.jpg",
    "img2.jpg",
    "img6.jpg",
    "img7.jpg",
    "durmitor.webp"
];

let i=0;

function changeBackground() {
  document.body.style.backgroundImage = `url(${images[i]})`;
  document.body.className="";
  i = (i + 1) % images.length;
}

changeBackground();

setInterval(changeBackground, 5000);