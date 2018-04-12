/** Модуль взаимодействия с удаленным сервером через XHR. */

(function () {


    /*let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function(evt){

        console.log(xhr.readyState);
        console.log(xhr.status + ' ' + xhr.statusText);
        console.log(evt.target === xhr);
        console.log(xhr.responseText);

        try{
            let arrayJSON = JSON.parse(xhr.responseText);
            console.log(arrayJSON);
        } catch (err){
            console.error(err.message)
        };
    })

    xhr.open('GET', "https://js.dump.academy/keksobooking/data");
    xhr.send();*/


    let URL = "https://js.dump.academy/keksobooking/data";

    let onError = function (message) {
        console.error(message);
    };

    let onLoad = function (data) {
        let avatars = data;
        console.log(avatars);
    };

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
        switch (xhr.status) {
            case 200:
                onLoad(xhr.response);
                break;
            default:
                onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
        }
//        console.log (xhr.response);
    });

    xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        console.log(onError);
    });
    xhr.timeout = 1000;
    xhr.open('GET', URL);
    xhr.send();


    window.upload = function (data, onLoad) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            onLoad(xhr.response);
        });
        xhr.open('POST', 'https://js.dump.academy/keksobooking');
        xhr.send(data);
    };


    window.download = function (onLoad, onError) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('GET', URL);

        xhr.addEventListener('load', function () {
            onLoad(xhr.response);
        });

        xhr.send();
    };


    let form = document.querySelector('.notice__form');
    form.addEventListener('submit', function (evt) {
        window.upload(new FormData(form), function (response) {
            form.reset();
        });
        evt.preventDefault();
    });


})();
