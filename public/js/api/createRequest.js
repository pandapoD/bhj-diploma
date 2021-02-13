/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    xhr = new XMLHttpRequest();
    let { url, method, data, callback } = options;
    let formData = new FormData();
    xhr.onload = function() {           //запуск колбэка при получение ответа
        let responseObj = JSON.parse(this.responseText);
        console.log(responseObj)
        if (this.readyState == 4 && this.status == 200) {
            err = null;
            response = responseObj;
            callback(err, response); 
        }
    };
    xhr.onerror = function() {          //отработка ошибок
        callback(err, response);
    };

    xhr.withCredentials = true;

    if (method === 'GET') {           
        url = `${url}` + '?' + `${encodeURI(data)}`;
    }
    else {
       Object.entries(data).forEach(([key, value]) => formData.append(`${key}`, `${value}`));  
       console.log(formData)      
    }
    try {
        xhr.open(method, url);
        xhr.send( formData );
    }
    catch ( err ) {
        alert( 'Запрос не удалось отправить. Повторите попытку.' );
    }
};


function encodeURI(url) {
  return Object.entries(url).map(([key, value]) => (`${key}` + '=' + encodeURIComponent(`${value}`))).join('&');
}




