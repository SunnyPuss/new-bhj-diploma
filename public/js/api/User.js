/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent(user) {
    return localStorage.removeItem(`${user}`);
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current(user) {
    try {
      if (localStorage.user) { return JSON.parse(localStorage.user)
      } else {
        return JSON.parse(localStorage.getItem(`${user}`));
      }
    } catch (err) {
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    const xhr = createRequest({
      url: `/user/current`,
      data,
      method: `GET`,
      responseType: `json`,
      callback( err, response ) {
        if (err) {
            return err;
        } else if( response && response.user ) {
          User.setCurrent( response.user );
          if (User.current === undefined) {
            User.unsetCurrent (response.user);
          }
        }
        callback(err, response);
      }
    })
    return xhr;
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    const xhr = createRequest({
      url: `/user/login`,
      data,
      method: `POST`,
      responseType: `json`,
      callback( err, response ) {
        if (err) {
            return err;
        } else if( response && response.user ) {
          User.setCurrent( response.user );
        }
        callback(err, response);
      }
    })
    return xhr;
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    const xhr = createRequest({
      url: `/user/register`,
      data,
      method: `POST`,
      responseType: `json`,
      callback( err, response ) {
        if (err) {
            return err;
        } else if( response && response.user ) {
          User.setCurrent( response.user );
        }
        callback(err, response);
      }
    })
    return xhr;
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    const xhr = createRequest({
      url: `/user/logout`,
      data,
      method: `POST`,
      responseType: `json`,
      callback( err, response ) {
        if (err) {
            return err;
        } else if( response && response.user ) {
          User.unsetCurrent( response.user );
        }
        callback(err, response);
      }
    })
    return xhr;
  }
}