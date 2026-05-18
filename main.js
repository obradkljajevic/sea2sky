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
