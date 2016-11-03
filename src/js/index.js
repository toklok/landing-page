let arrowUp = document.querySelectorAll('.arrow-button');
let scrollUp = document.getElementById('top-scroll');
let scrollDown = document.getElementById('scrollDown');

scrollUp.addEventListener('click', (e) => {
  e.preventDefault();
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});

scrollDown.addEventListener('click', (e) => {
  e.preventDefault();
  window.scroll({
    top: 500,
    left: 0,
    behavior: 'smooth'
  })
});

window.addEventListener('scroll', () => {
  let top = this.scrollY;
    // console.log(top);
    if (top > 400) {
      arrowUp[0].setAttribute('style', 'visibility: visible; opacity: 1; transition: opacity 2s ease-in-out;');
    } else {
      arrowUp[0].setAttribute('style', 'visibility: hidden; opacity: 0; transition: opacity 2s ease-out;');
    }
});