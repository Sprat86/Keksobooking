/** Показ всплывающего окна при работе с сервером */

(function () {


    /** Функция для создания и стилизации всплывающего окна:*/
    let createPopUp = function () {
        let popUp = document.createElement('div');
        popUp.style.position = 'fixed';
        popUp.style.top = '50%';
        popUp.style.left = '50%';
        popUp.style.zIndex = 100;
        popUp.style.padding = '50px';
        popUp.style.background = '#fff';
        popUp.style.border = '5px solid #ff6d51';
        popUp.style.borderRadius = '20px';
        popUp.style.transform = 'translate(-50%, -50%)';
        popUp.style.cursor = 'pointer';
        popUp.className = 'popup hidden';
        return popUp;
    };


    /** Функция добавления элементов диалогового окна на страницу*/
    let renderDialog = function () {
        let fragment = document.createDocumentFragment();
        fragment.appendChild(createPopUp());
        document.body.appendChild(fragment);
    };

    //* Функция показа диалогового окна*/
    let showDialog = function (message) {
        popUp.textContent = message;
        popUp.classList.remove('hidden');
    };

    /** Функция скрытия диалогового окна*/
    let hideDialog = function () {
        popUp.classList.add('hidden');
    };

    renderDialog();

    let popUp = document.querySelector('.popup');


    popUp.addEventListener("mouseup", function () {
            hideDialog ();
        });


    window.popup = {
        /** Функция, выводящая окно с ошибкой при неудачной передаче данных*/
        errorHandler: function (errorMessage) {
            showDialog(errorMessage);
        },

        /** Функция, выводящая окно с сообщением об успешной отправке данных и сбрасывающая форму к первоначальному состоянию*/
        uploadSuccessHandler: function () {
            showDialog('Данные успешно отправлены');
            form.reset();
        }
    };


})();