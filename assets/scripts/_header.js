// Фиксированное меню появляется после 450px и меняет цвет

const header = document.querySelector('.header');
const logoBlack = document.querySelector('.icon use');
const menuItems = document.querySelectorAll('.navbar__link');

window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolling', window.scrollY > 450);

    // тогда:
    // меняется логотип
    if (logoBlack) {
      if (window.scrollY > 450) {
        logoBlack.setAttribute('xlink:href', './assets/icons/sprite.svg#logo-black');
      } else {
        logoBlack.setAttribute('xlink:href', './assets/icons/sprite.svg#logo-white');
      }
    }

    // меняется цвет текста
    if (menuItems.length > 0) {
      if (window.scrollY > 450) {
        menuItems.forEach(link => {
          link.style.color = 'black'
        });
      } else {
        menuItems.forEach(link => {
          link.style.color = 'white';
        });
      }
    }
  }
});