/** Модуль для отрисовки элемента на карточке. */

(function () {

// Create DOM element "notice"(map card):

    let RUBLE = '\u20bd';

    window.createElementArticle = function (mapEl, publicationCreatingElement){ // Задаем функции параметр "publicationCreatingElement" и внутри функции работаем с этим параметром.
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


})();