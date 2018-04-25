/** @Description of the action: Работа с формой объявления:*/

(function () {

//let form = document.querySelector('.notice__form');
    let inputsForm = document.querySelectorAll('.form__element input');
    let titleForm = document.querySelector('#title');
    window.addressForm = document.querySelector('#address');
    let roomsForm = document.querySelector('#room_number');
    let guestsForm = document.querySelector('#capacity');


    /** Проверка правильности введенных данных полей "Заголовок" и "Адрес":*/
    titleForm.addEventListener('invalid', function (evt) {
        if (titleForm.validity.tooShort) {
            titleForm.setCustomValidity('Пожалуйста, введите сообщение длиной не менее 30 символов.')
            /*} else if (titleForm.validity.tooLong){
                titleForm.setCustomValidity('Пожалуйста, введите сообщеине длиной не более 100 символов')*/
        } else if (titleForm.validity.valueMissing) {
            titleForm.setCustomValidity('Введите, пожалуйста, заголовок объявления!')
        } else {
            titleForm.setCustomValidity('');
        }
    });


    addressForm.addEventListener('invalid', function (evt) {
        if (addressForm.validity.valueMissing) {
            addressForm.setCustomValidity('Без этого поля мы не сможем Вас найти')
        }
    });



    /** Количество комнат связано с количеством гостей: */
    roomsForm.addEventListener('change', function () {
        switch (roomsForm.options.selectedIndex) {
            case 0:
                guestsForm.options[2].selected = true;                       // Устанавливает вариант списка по умолчанию.
                guestsForm.options[2].removeAttribute('disabled');           // Удаляет атрибут disabled, чтобы вариант списка был доступен.
                guestsForm.options[0].setAttribute('disabled', 'disabled');  // Отключает вариант списка, чтобы нельзя было выбрать.
                guestsForm.options[1].setAttribute('disabled', 'disabled');
                guestsForm.options[3].setAttribute('disabled', 'disabled');
                break;
            case 1:
                guestsForm.options[1].selected = true;
                guestsForm.options[1].removeAttribute('disabled');
                guestsForm.options[2].removeAttribute('disabled');
                guestsForm.options[0].setAttribute('disabled', 'disabled');
                guestsForm.options[3].setAttribute('disabled', 'disabled');
                break;
            case 2:
                guestsForm.options[0].selected = true;
                guestsForm.options[0].removeAttribute('disabled');
                guestsForm.options[1].removeAttribute('disabled');
                guestsForm.options[2].removeAttribute('disabled');
                guestsForm.options[3].setAttribute('disabled', 'disabled');
                break;
            case 3:
                guestsForm.options[3].selected = true;
                guestsForm.options[3].removeAttribute('disabled');
                guestsForm.options[0].setAttribute('disabled', 'disabled');
                guestsForm.options[1].setAttribute('disabled', 'disabled');
                guestsForm.options[2].setAttribute('disabled', 'disabled');
                break;
        }
    });


    /** Проверка валидности формы:*/
    for (let i = 0; i < inputsForm.length; i++) {
        inputsForm[i].addEventListener('invalid', function (evt) {
            if (inputsForm[i].validity.valueMissing) {
                inputsForm[i].style.border = "2px solid red";
                inputsForm[i].style.background = 'rgba(222, 213, 213, .5)';
                inputsForm[i].setAttribute('placeholder', 'Заполните это поле.')
            } else if (inputsForm[i].validity.valid) {
                inputsForm[i].style.border = "";
            }
        });
    }

})();