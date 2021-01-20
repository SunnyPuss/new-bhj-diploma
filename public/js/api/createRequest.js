/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const request = new XMLHttpRequest();
  var formData = new FormData();
  request.responseType = `json`;
  request.withCredentials = true;

  if (options.method === `GET`) {
    options.url += "?"; 
    for (let item in options.data) { 
    options.url += `${item}=${options.data[item]}&`;
    }
  } else {
    for (let key in options.data) {
      formData.append(key,options.data[key]);
    }
  };

  try {
    request.open(options.method, options.url, true);
      
      request.send(formData);
  } catch (err) {
    options.callback(err)
  };

  request.addEventListener(`readystatechange`, function() {
    if (request.readyState === request.DONE && request.status === 200) {
      options.callback(null, request.response);
    }
  });

  return request;
};