const form = document.forms.tourCreationForm;

//Добавляем на неё обработчик события submit
form.addEventListener('submit', function (evt) {
  //Отменяем стандартное поведение
  evt.preventDefault();
  form.reset(); //Сброс полей формы
});

const button = document.querySelector('.find');
const checkbox = form.elements.checkbox;
const select = form.elements.select;
//По нажатию на кнопку выведем
//В консоль значения текстовых полей
button.addEventListener('click', function (evt) {
  evt.preventDefault();
  console.log(form.value);    //Вывод значения form
  console.log(checkbox.checked); //Выводит true или false
  console.log(select.value); //Выводит выбранный вариант
  console.log('Индекс выбранного элемента: ' + select.selectedIndex); //Выводит индекс выбранного элемента
});

