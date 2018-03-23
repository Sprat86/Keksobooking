/** @Description of the action: Работа с формой объявления:*/

(function () {

//let form = document.querySelector('.notice__form');
    let inputsForm = document.querySelectorAll('.form__element input');
    let titleForm = document.querySelector('#title');
    window.addressForm = document.querySelector('#address');
    let flatTypeForm = document.querySelector('#type');
    let priceForNightForm = document.querySelector('#price');
    let timeInForm = document.querySelector('#timein');
    let timeOutForm = document.querySelector('#timeout');
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


    /** Поля «время заезда» и «время выезда» - синхронизация:*/
    timeInForm.addEventListener('change', function () {
        timeOutForm.value = timeInForm.value;
    });

    timeOutForm.addEventListener('change', function () {
        timeInForm.value = timeOutForm.value;
    });


    /** Значение поля «Тип жилья» синхронизировано с минимальной ценой:*/
    let minPrice = {
        shack: 0,
        flat: 1000,
        house: 5000,
        palace: 10000
    };

    flatTypeForm.addEventListener('change', function () {
        switch (flatTypeForm.options.selectedIndex) {
            case 0:
                priceForNightForm.setAttribute('min', minPrice.flat);
                priceForNightForm.setAttribute('value', minPrice.flat);
                break;
            case 1:
                priceForNightForm.setAttribute('min', minPrice.shack);
                priceForNightForm.setAttribute('value', minPrice.shack);
                break;
            case 2:
                priceForNightForm.setAttribute('min', minPrice.house);
                priceForNightForm.setAttribute('value', minPrice.house);
                break;
            case 3:
                priceForNightForm.setAttribute('min', minPrice.palace);
                priceForNightForm.setAttribute('value', minPrice.palace);
                break;
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