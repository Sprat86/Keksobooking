/** @Description of the action: Создание массива карточек объявлений mapCard: */

const titles = [
    "Большая уютная квартира"
    , "Маленькая неуютная квартира"
    , "Огромный прекрасный дворец"
    , "Маленький ужасный дворец"
    , "Красивый гостевой домик"
    , "Некрасивый негостеприимный домик"
    , "Уютное бунгало далеко от моря"
    , "Неуютное бунгало поколено в воде"
];


const types = ['flat', 'house', 'bungalo'];

const checkin = ['12:00', '13:00', '14:00'];

const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let mapEl = document.getElementsByClassName('map')[0];
let mapPins = document.getElementsByClassName('map__pins');
let RUBLE = '\u20bd';

for (let i = 1; i < 9; i++) {
    let x = '1',
        y = '2';

    const checkIn = checkin[getRandomInt(0, 2)];//Передаем рандомное значение из массива checkIn (см.выше) и затем используем в переменной publication, чтобы время заезда и выезда синхронизировалось.

    let publication = {
        author: {avatar: "img/avatars/user0" + i},
        offer: {
            title: titles[i - 1],
            address: x + '-' + y,
            price: getRandomInt(1000, 1000000),
            type: types[getRandomInt(0, 2)],
            rooms: getRandomInt(1, 5),
            guests: getRandomInt(1, 10),
            checkin: checkIn,
            checkout: checkIn,
            features: features.slice(Math.floor(Math.random() * ((features.length - 1) + 1))),
            description: "Hi!",
            photos: []
        },
        location: {
            x: getRandomInt(300, 900),
            y: getRandomInt(100, 500)
        }
    };

    createElement(publication);
    createElementArticle(mapEl, publication);
}

// Create DOM element btn_map

function createElement(publicationCreatingEl) { // Задаем функции параметр "publicationCreatingEl" и внутри функции работаем с этим параметром.
    let buttonMap = document.createElement("button");
    buttonMap.setAttribute('class', 'map__pin');
    buttonMap.style = "left: " + publicationCreatingEl.location.x + "px; top:" + publicationCreatingEl.location.y + "px;";

    let avatarImg = document.createElement('img');
    avatarImg.setAttribute('src', publicationCreatingEl.author.avatar + '.png');
    avatarImg.setAttribute("height", "40");
    avatarImg.setAttribute("width", "40");
    avatarImg.setAttribute("draggable", "false");
    buttonMap.appendChild(avatarImg);
    mapPins[0].appendChild(buttonMap);
}

// Create DOM element notice

function createElementArticle(mapEl, publicationCreatingElement) { // Задаем функции параметр "publicationCreatingElement" и внутри функции работаем с этим параметром.
    let publicationBlock = document.createElement("article");
    publicationBlock.setAttribute('class', 'map__card popup');

    let popupAvatar = document.createElement('img');
    popupAvatar.setAttribute('src', publicationCreatingElement.author.avatar + '.png');
    popupAvatar.setAttribute('class', 'popup__avatar');
    popupAvatar.setAttribute("height", "70");
    popupAvatar.setAttribute("width", "70");
    publicationBlock.appendChild(popupAvatar);

    let popupClose = document.createElement("button");
    popupClose.setAttribute('class', 'popup__close');
    popupClose.setAttribute('tabindex', '1');
    let popupCloseText = document.createTextNode('Закрыть');
    popupClose.appendChild(popupCloseText);
    publicationBlock.appendChild(popupClose);

    let title = document.createElement('h3');
    let h3 = document.createTextNode(publicationCreatingElement.offer.title);
    title.appendChild(h3);
    publicationBlock.appendChild(title);

    let address = document.createElement('p');
    let pAddress = document.createTextNode(publicationCreatingElement.offer.address);
    address.appendChild(pAddress);
    publicationBlock.appendChild(address);

    let price = document.createElement('p');
    let pPrice = document.createTextNode(publicationCreatingElement.offer.price + ' ' + RUBLE + '/ночь');
    price.setAttribute('class', 'popup_price');
    price.appendChild(pPrice);
    publicationBlock.appendChild(price);

    let type = document.createElement('h4');
    let h4 = document.createTextNode(getTypeTranslation(publicationCreatingElement.offer.type));
    type.appendChild(h4);
    publicationBlock.appendChild(type);

    let roomsGuest = document.createElement('p');
    let pRoomsGuest = document.createTextNode(publicationCreatingElement.offer.rooms + ' комнаты для ' + publicationCreatingElement.offer.guests + ' гостей');
    roomsGuest.appendChild(pRoomsGuest);
    publicationBlock.appendChild(roomsGuest);

    let checkInCheckOut = document.createElement('p');
    let pCheckInCheckOut = document.createTextNode('Заезд после ' + publicationCreatingElement.offer.checkin + ' , выезд после ' + publicationCreatingElement.offer.checkout);
    checkInCheckOut.appendChild(pCheckInCheckOut);
    publicationBlock.appendChild(checkInCheckOut);


    let features = document.createElement('ul');
    features.setAttribute('class', 'popup__features');
    for (let i = 0; i < publicationCreatingElement.offer.features.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('class', 'feature feature--' + publicationCreatingElement.offer.features[i]);
        features.appendChild(li);
        publicationBlock.appendChild(features)
    }


    let description = document.createElement('p');
    let pDescription = document.createTextNode(publicationCreatingElement.offer.description);
    description.appendChild(pDescription);
    publicationBlock.appendChild(description);


    mapEl.appendChild(publicationBlock);
    console.log(publicationCreatingElement.offer.type)
}


function getTypeTranslation(type) {
    if (type === 'bungalo') {
        return 'Бунгало';
    } else if (type === 'flat') {
        return 'Квартира';
    }
    return 'Дом';
}


// Add style for "window.onload"

let mapId = document.getElementById("map");
let noticeId = document.getElementById("notice");
let fieldset = document.getElementsByTagName("fieldset");
let mapPin = document.querySelectorAll('.map__pin');
let mapCard = document.querySelectorAll('.map__card');

window.onload = function () {
    mapId.classList.add('map--faded');
    noticeId.classList.add("notice__form--disabled");
    for (let i = 0; i < fieldset.length; i++) {
        fieldset[i].setAttribute("disabled", "disabled");
    }
    mapPinHide(mapPin);
    mapCardHide(mapCard);
    mapPinMain.style = "display: block";
};


function mapPinHide(mapPin) {
    for (let i = 0; i < mapPin.length; i++) {
        // mapPin[i].style = "display: none"; - Перезапишет существующее значение style (в данном случае координаты) - использовать нельзя.
        mapPin[i].style.display = "none"; // Добавит стиль к существующему
    }
}


function mapCardHide(mapCard) {
    for (let i = 0; i < mapCard.length; i++) {
        mapCard[i].classList.add('hidden');
    }
}


// Remove slyle for "mouseup"

let mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener("mouseup", function () {
        mapId.classList.remove('map--faded');
        noticeId.classList.remove("notice__form--disabled");
        for (let i = 0; i < fieldset.length; i++) {
            fieldset[i].disabled = false;
        }
        mapPinShow(mapPin);
    }
);

function mapPinShow(mapPin) {
    for (let i = 0; i < mapPin.length; i++) {
        //mapPin[i].style = "display: block";
        mapPin[i].style.display = ""; // убирает стиль display
    }
}


function mapCardShow(mapCard) {
    for (let i = 0; i < mapCard.length; i++) {
        mapCard[i].classList.remove('hidden');
    }
};


// Show/hide mapCard (notice):
let ESC_KEYCODE = 27;
let ENTER_KEYCODE = 13;
let mapPinActive = document.getElementsByClassName('map__pin--active'); // Берём элемент с классом 'map__pin--active'. Так как он всегда на странице один,
// то и работает с ним, как с массивом с одним элементом.

for (let i = 1; i < mapPin.length; i++) {
    mapPin[i].addEventListener("click", function (event) {

        if (mapPinActive.length) {
            mapPinActive[0].classList.remove('map__pin--active');
        }
        mapCardHide(mapCard); // Вызываем функцию, чтобы каждый раз присваивать класс 'hidden' карточкам объявления. Тогда при удалении класса (см. ниже) показывается только одна карточка.

        //mapPin[i].classList.toggle('map__pin--active'); //- добавляет/убирает класс при повторном клике на элементе.

        if (!mapPin[i].classList.contains('map__pin--active')) {
            mapPin[i].classList.add('map__pin--active');
            mapCard[i - 1].classList.remove('hidden');
        }
        document.addEventListener('keydown', function (evt) {
            if (evt.keyCode === ESC_KEYCODE || evt.keyCode === ENTER_KEYCODE) {
                mapPin[i].classList.remove('map__pin--active');
                mapCard[i - 1].classList.add('hidden');
            }
        });
        popupClose[i - 1].focus();
    });
}


// Рабочий код JQuery:
// $(".map__pin").click(function(e) {
//     e.preventDefault();
//     $(".map__pin").removeClass('map__pin--active');
//     $(this).addClass('map__pin--active');
// });


/** Действия на кнопку "Крестик" в объявлении.*/
let popupClose = document.querySelectorAll('.popup__close');
for (let i = 0; i < popupClose.length; i++) {
    popupClose[i].addEventListener("click", function () {
        mapCard[i].classList.add('hidden');
        mapPin[i + 1].classList.remove('map__pin--active');
    });
    popupClose[i].addEventListener("keydown", function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
            mapCard[i].classList.add('hidden');
            mapPin[i + 1].classList.remove('map__pin--active');
        }
    });
}


/** @Description of the action: Работа с формой объявления:*/
//let form = document.querySelector('.notice__form');
let inputsForm = document.querySelectorAll('.form__element input');
let titleForm = document.querySelector('#title');
let addressForm = document.querySelector('#address');
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


/** @Description of the action: Добавление реакции на перемещение (drag) пина текущего заполняемого объявления mapPinMain: */

let filtersContainer = document.querySelector('.map__filters-container');
let mapPinMainSize = {
    HEIGHT: 87,
    WIDTH: 65
};
// Задаем координаты, в пределах которых будем ограничивать перемещение mapPinMain (согласно условиям проекта):
let mapBordersCoordinates = {
    top: mapEl.offsetTop + 100,
    right: mapEl.offsetWidth + mapPinMainSize.WIDTH / 2,
    bottom: mapEl.offsetHeight - filtersContainer.offsetHeight,
    left: mapPinMainSize.WIDTH / 2
};

mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let startCoords = {
        x: evt.clientX,
        y: evt.clientY
    };

    /** Функция перемещения. */
    function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        // Переменная сдвига курсора:
        let shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
        };

        startCoords = {  // Перезаписываем переменную, чтобы считать смещение относительно Dom- элемента, а не начальной точки.
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };

        /** Функция, ограничивающая перемещение объекта mapPinMain в пределах карты mapEl:*/
        function onDrag(evt) {
            if (mapPinMain.offsetLeft - shift.x >= mapBordersCoordinates.left && mapPinMain.offsetLeft - shift.x <= mapBordersCoordinates.right - mapPinMain.offsetWidth) {
                mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
            }
            if (mapPinMain.offsetTop - shift.y >= mapBordersCoordinates.top && mapPinMain.offsetTop - shift.y <= mapBordersCoordinates.bottom - mapPinMain.offsetHeight) {
                mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
            }
        };

        // mapPinMain.style.zIndex = 10; - добавляем, если необходимо, чтобы элемент "перекрывал" другие элементы. Иначе он перетаскивается под ними.
        // mapPinMain.style = "left: " + (mapPinMain.offsetLeft - shift.x) + "px; top:" + (mapPinMain.offsetTop - shift.y) + "px;"; - тоже рабочий вариант записи.


        /** Функция добавления координат метки mapPinsMain в поле Address:
         * внутри функции onMouseMove(moveEvt), потому что переменная shift объявлена локально. Вне пределов этой функции ее не будет видно. */
        let xAddress = mapPinMain.offsetLeft - shift.x;
        let yAddress = mapPinMain.offsetTop - shift.y;

        function refreshAddress() {
            addressForm.value = 'x: ' + xAddress + ', y: ' + yAddress;
        };
        onDrag(evt);
        refreshAddress();
    };

    /** Функция нужна для того, чтобы перетаскивание закончилось при отжатии клавиши мыши. Иначе объект "не отвяжется" от курсора и будет его "преследовать". */
    function onMouseUp(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});




/*
// Функция проверяет, будет ли метка находиться в пределах допустимых границ по горизонтали после предполагаемого сдвига
function isPinInHorizontalBorders(xShift) {
    if (mapPinMain.offsetLeft - xShift >= mapBordersCoordinates.left && mapPinMain.offsetLeft - xShift <= mapBordersCoordinates.right - mapPinMain.offsetWidth) {
        return mapPinMain.offsetLeft - xShift;
    }
};

// Функция проверяет, будет ли метка находиться в пределах допустимых границ по вертикали после предполагаемого сдвига
function isPinInVerticalBorders(yShift) {
    if (mapPinMain.offsetTop - yShift >= mapBordersCoordinates.top && mapPinMain.offsetTop - yShift <= mapBordersCoordinates.bottom - mapPinMain.offsetHeight) {
        return mapPinMain.offsetTop - yShift;
    }
};


// Функция, отрисовывающая новое положение метки во время перетаскивания
function refreshMapPinPosition(xShift, yShift) {
    if (isPinInVerticalBorders(yShift)) {
        mapPinMain.style.top = mapPinMain.offsetTop - yShift + 'px';
    }
    if (isPinInHorizontalBorders(xShift)) {
        mapPinMain.style.left = mapPinMain.offsetLeft - xShift + 'px';
    }
};


// Обработчик перетаскивания метки
function mapPinMouseDown(evt) {
    evt.preventDefault();
    let startCoords = {
        x: evt.clientX,
        y: evt.clientY
    };

    function onMouseMove(moveEvt) {
        let shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };

        let xAddress = mapPinMain.offsetLeft - shift.x;
        let yAddress = mapPinMain.offsetTop - shift.y;

        function refreshAddress() {
            addressForm.value = 'x: ' + xAddress + ', y: ' + yAddress;
        };

        refreshMapPinPosition(shift.x, shift.y);
        refreshAddress();
    };

    /!** Функция нужна для того, чтобы перетаскивание закончилось при отжатии клавиши мыши. Иначе объект "не отвяжется" от курсора и будет его "преследовать". *!/
    function onMouseUp(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

mapPinMain.addEventListener('mousedown', mapPinMouseDown);

*/




