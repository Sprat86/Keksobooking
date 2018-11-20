/** Модуль для отрисовки элемента на карточке. */

(function () {

    window.RUBLE = '\u20bd';


    /** Функция создания крточек объявлений из массива, созданного по проекту:*/
    window.createCardsProject = function (mapEl, publicationCreatingElement) {
            publicationCreatingElement.forEach(function(avatar){
            let publicationBlock = document.createElement("article");
            publicationBlock.setAttribute('class', 'map__card popup');

            let popupAvatar = document.createElement('img');
            popupAvatar.setAttribute('src', avatar.author.avatar/* + '.png'*/);
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
            let h3 = document.createTextNode(avatar.offer.title);
            title.appendChild(h3);
            publicationBlock.appendChild(title);

            let address = document.createElement('p');
            let pAddress = document.createTextNode(avatar.offer.address);
            address.appendChild(pAddress);
            publicationBlock.appendChild(address);

            let price = document.createElement('p');
            let pPrice = document.createTextNode(avatar.offer.price + ' ' + RUBLE + '/ночь');
            price.setAttribute('class', 'popup_price');
            price.appendChild(pPrice);
            publicationBlock.appendChild(price);

            let type = document.createElement('h4');
            let h4 = document.createTextNode(getTypeTranslation(avatar.offer.type));
            type.appendChild(h4);
            publicationBlock.appendChild(type);

            let roomsGuest = document.createElement('p');
            let pRoomsGuest = document.createTextNode(avatar.offer.rooms + ' комнаты для ' + avatar.offer.guests + ' гостей');
            roomsGuest.appendChild(pRoomsGuest);
            publicationBlock.appendChild(roomsGuest);

            let checkInCheckOut = document.createElement('p');
            let pCheckInCheckOut = document.createTextNode('Заезд после ' + avatar.offer.checkin + ' , выезд после ' + avatar.offer.checkout);
            checkInCheckOut.appendChild(pCheckInCheckOut);
            publicationBlock.appendChild(checkInCheckOut);


            let features = document.createElement('ul');
            features.setAttribute('class', 'popup__features');
            for (let i = 0; i < avatar.offer.features.length; i++) {
                let li = document.createElement('li');
                li.setAttribute('class', 'feature feature--' + avatar.offer.features[i]);
                features.appendChild(li);
                publicationBlock.appendChild(features)
            }


            let description = document.createElement('p');
            let pDescription = document.createTextNode(avatar.offer.description);
            description.appendChild(pDescription);
            publicationBlock.appendChild(description);


            mapEl.appendChild(publicationBlock);
        })
    };



    /** Функция преобразования типа жилья (функция перевода на русский язык): */
    function getTypeTranslation(type) {
        if (type === 'bungalo') {
            return 'Бунгало';
        } else if (type === 'flat') {
            return 'Квартира';
        }
        return 'Дом';
    };


    /** Функция создания крточек объявлений по данным, взятым из бэкэнда:*/
    window.createCardsBackend = function (mapEl, avatars) {
            avatars.forEach(function(item){
            let publicationBlock = document.createElement("article");
            publicationBlock.setAttribute('class', 'map__card popup');

            let popupAvatar = document.createElement('img');
            popupAvatar.setAttribute('src', item.author.avatar);
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
            let h3 = document.createTextNode(item.offer.title);
            title.appendChild(h3);
            publicationBlock.appendChild(title);

            let address = document.createElement('p');
            let pAddress = document.createTextNode(item.offer.address);
            address.appendChild(pAddress);
            publicationBlock.appendChild(address);

            let price = document.createElement('p');
            let pPrice = document.createTextNode(item.offer.price + ' ' + RUBLE + '/ночь');
            price.setAttribute('class', 'popup_price');
            price.appendChild(pPrice);
            publicationBlock.appendChild(price);

            let type = document.createElement('h4');
            let h4 = document.createTextNode(getTypeTranslation(item.offer.type));
            type.appendChild(h4);
            publicationBlock.appendChild(type);

            let roomsGuest = document.createElement('p');
            let pRoomsGuest = document.createTextNode(item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей');
            roomsGuest.appendChild(pRoomsGuest);
            publicationBlock.appendChild(roomsGuest);

            let checkInCheckOut = document.createElement('p');
            let pCheckInCheckOut = document.createTextNode('Заезд после ' + item.offer.checkin + ' , выезд после ' + item.offer.checkout);
            checkInCheckOut.appendChild(pCheckInCheckOut);
            publicationBlock.appendChild(checkInCheckOut);


            let features = document.createElement('ul');
            features.setAttribute('class', 'popup__features');
            for (let i = 0; i < item.offer.features.length; i++) {
                let li = document.createElement('li');
                li.setAttribute('class', 'feature feature--' + item.offer.features[i]);
                features.appendChild(li);
                publicationBlock.appendChild(features)
            }


            let description = document.createElement('p');
            let pDescription = document.createTextNode(item.offer.description);
            description.appendChild(pDescription);
            publicationBlock.appendChild(description);


            let photosUl = document.createElement('ul');
            photosUl.setAttribute('class', 'popup__pictures');
            let photos = Array.from(item.offer.photos);
            /** Cоздаём новый экземпляр Array из массивоподобного объекта "avatars" (что равно xhr.response[i].offer.photos).*/
            for (let i = 0; i < photos.length; i++) {
                let li = document.createElement('li');
                let imgPhotos = document.createElement('img');
                imgPhotos.src = photos[i];
                imgPhotos.setAttribute("height", "30");
                imgPhotos.setAttribute("width", "30");
                imgPhotos.style.marginRight = '10px';
                li.appendChild(imgPhotos);
                photosUl.appendChild(li);
                publicationBlock.appendChild(photosUl);
            }

            mapEl.appendChild(publicationBlock);

        })
    };


})();