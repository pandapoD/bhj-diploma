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
  		console.log(responseObj.message); 
  		console.log(`Загружено: ${xhr.status} ${xhr.response}`);
  		return responseObj;
    };
    xhr.onerror = function() {
        //отработка ошибок
        console.log(`Ошибка соединения`)
    };

//     // xhr.onprogress = function(event) {
//     // 	console.log(`Загружено ${event.loaded} из ${event.total}`);
//     // };

    xhr.withCredentials = true;

    if ( options.method === 'GET' ) {
        //формируете get запрос
        console.log(options.url)
        console.log(url);
        url = `${options.url}` + '?' + `${encodeURI(options.data)}`//надо придумать и дописать данные в строчном виде с = и &
        requestData = '';
        console.log(url)
    }
    else {
        //формируете post запрос
        requestData = options.data;
        console.log(options.data)
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
    console.log(xhr.response)
    return xhr;
};


function encodeURI(url) {
  return Object.entries(url).map(([key, value]) => (`${key}` + '=' + encodeURIComponent(`${value}`))).join('&');
}


// // // 	if (options.method === 'GET') {
// // // 		options.url = `${options.url}` + '?' //надо придумать и дописать данные в строчном виде с = и &
// // // 	} else { //возможно else совсем можно будет убрать
// // // 		console.log(options.url);
// // // 		console.log(options.data)
// // // 		options.url = `${options.url}`;
// // // 		options.data = `${options.data}`;
// // // 		console.log(options.url)
// // // 		console.log(options.data)
// // // 	}
// // // 	options.callback()
// // // 	console.log(response)

// // // // const request = new XMLHttpRequest,
// // // // request.open( options.method, options.url );
// // // // request.send( options.data );
   
// // //     // callback: ( err, response ) => {
// // //       /*
// // //         при успешном выполнении err = null, response содержит данные ответа
// // //       */
// // //     //   console.log( err ); // null
// // //     //   console.log( response ); // ответ
// // //     // }
// // //   };

