/** Модуль взаимодействия с удаленным сервером через XHR. */

(function () {

    let URL = "https://js.dump.academy/keksobooking";




    let setup = function (onLoad, onError) {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.timeout = 10000;


            xhr.addEventListener('load', function () {
                switch (xhr.status) {
                    case 200:
                        onLoad(xhr.response);
                        break;
                    default:
                        onError('Ошибка данных: ' + xhr.status + ' ' + xhr.statusText);
                }


                xhr.response.forEach(function(item){
                    jointArray.push(item);
                });

            });

            xhr.addEventListener('error', function () {
                onError('Произошла ошибка соединения');
            });

            xhr.addEventListener('timeout', function () {
                onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
                console.log(onError);
            });
            return xhr;
        };



    /** Функция загрузки данных на сервер: */
    window.upload = function (data, onLoad, onError) {
        let xhr = setup(onLoad, onError);
        xhr.open('POST', URL);
        xhr.send(data);
    };

    /** Функция скачивания данных с сервера: */
    window.download = function (onLoad, onError) {
        let xhr = setup(onLoad, onError);
        xhr.open('GET', URL + '/data');
        xhr.send();
    };



    window.form = document.querySelector('.notice__form');
    /** Функция отправки введенных в форму данных на сервер: */
    let formSubmit = function (evt) {
        window.upload(new FormData(form), window.popup.uploadSuccessHandler, window.popup.errorHandler);
        form.reset();
        evt.preventDefault();
    };

    form.addEventListener('submit', formSubmit);





})();
