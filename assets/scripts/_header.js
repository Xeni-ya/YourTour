// Фиксированное меню появляется после 450px и меняет цвет
window.addEventListener('scroll', () => {
  document.querySelector('.header').classList.toggle('scrolling', window.scrollY > 450);
});