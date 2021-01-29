// // /**
// //  * Основная функция для совершения запросов
// //  * на сервер.
// //  * */
const createRequest = (options = {}) => {
	const f = function () {},
        {
          data //здесь значения объекта с параметрами из передаваемого атрибута функции
        } = options,
    xhr = new XMLHttpRequest();
    let { url } = options;
    let requestData;
    if (xhr.responseType) {
        xhr.responseType = 'json';//присваиваете для xhr responseType
    }
    xhr.onload = function() {
        //запуск колбэка при получение ответа
        let responseObj = xhr.response;
        console.log(xhr.response)
  		console.log(`Загружено: ${xhr.status} ${xhr.response}`);
        options.callback(responseObj); 
  		return responseObj;
    };
    xhr.onerror = function() {
        //отработка ошибок
        alert(`${xhr.status} + ': ' + ${xhr.statusText}`);
    };

    xhr.withCredentials = true;

    if ( options.method === 'GET' ) {
        //формируете get запрос
        console.log(options.url)
        console.log(url);
        url = `${options.url}` + '?' + `${encodeURI(options.data)}`;
        requestData = '';
        console.log(url)
    }
    else {
        //формируете post запрос
        requestData = options.data;
        console.log(options.data);
    }
    try {
        xhr.open(options.method, url);
        xhr.send( requestData );
    }
    catch ( err ) {
        error.call( this, err );
        callback.call( this, err );
        return xhr;
    }
    console.log(xhr)
    return xhr;
};


function encodeURI(url) {
  return Object.entries(url).map(([key, value]) => (`${key}` + '=' + encodeURIComponent(`${value}`))).join('&');
}




