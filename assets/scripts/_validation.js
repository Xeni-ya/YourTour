const inputField = document.getElementById('tel');

const maskOptions = {
  mask: '+7 (000) 000-00-00',
  lazy: false,
}

// eslint-disable-next-line no-unused-vars
const mask = window.IMask(inputField, maskOptions);