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