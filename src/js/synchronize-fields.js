/** Модуль, связывающий поля между собой таким образом, чтобы логика изменения значения зависимого поля находилась в функции обратного вызова */

(function () {

    window.addressForm = document.querySelector('#address');
    let flatTypeForm = document.querySelector('#type');
    let priceForNightForm = document.querySelector('#price');
    let timeInForm = document.querySelector('#timein');
    let timeOutForm = document.querySelector('#timeout');


    let minPrice = {
        bungalo: 0,
        flat: 1000,
        house: 5000,
        palace: 10000
    };

    /** Функция присваивает значение элементу     */
    let syncValues = function (element, value) {
        element.value = value;
    };

    /** Функция присваивает минимальное значение элементу      */
    let syncValueWithMin = function (element, value) {
        element.min = value;
    };


    let synchronizeFields = function (firstElement, secondElement, firstValues, secondValues, callback) {
        firstElement.addEventListener('change', function () {
            let valueElement1 = secondValues[firstValues.indexOf(firstElement.value)];
            callback(secondElement, valueElement1);
        });
        secondElement.addEventListener('change', function () {
            let valueElement2 = firstValues[secondValues.indexOf(secondElement.value)];
            callback(firstElement, valueElement2);
        });
    };


    synchronizeFields(timeInForm, timeOutForm, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
    synchronizeFields(flatTypeForm, priceForNightForm, ['flat', 'bungalo', 'house', 'palace'], [minPrice.flat, minPrice.bungalo, minPrice.house, minPrice.palace], syncValueWithMin);

})();