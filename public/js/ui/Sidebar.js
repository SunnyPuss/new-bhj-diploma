/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarMini = document.querySelector(`.sidebar-mini`);
    const sidebarToggleButton = document.querySelector(`.sidebar-toggle`);

    sidebarToggleButton.addEventListener(`click`, function () {
      if (sidebarMini.classList.contains(`sidebar-open`, `sidebar-collapse`)) {
        sidebarMini.classList.remove(`sidebar-open`, `sidebar-collapse`)
      } else {
        sidebarMini.classList.add (`sidebar-open`, `sidebar-collapse`)
      }
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const loginButton = document.querySelector(`.menu-item_login`);
    const logoutButton = document.querySelector(`.menu-item_logout`);
    const registerButton = document.querySelector(`.menu-item_register`);

    loginButton.addEventListener(`click`, function () {
      App.getModal(`login`).open();
    });

    registerButton.addEventListener(`click`, function() {
      App.getModal(`register`).open();
    });

    logoutButton.addEventListener(`click`, function() {
    //   User.logout((err, response) => {
    //     if (err) {
    //       return err;
    //     } else if (response.success) {
    //       App.setState('init')
    //     }
    //   });
      User.logout();
      if (User.logout()) {
        App.setState(`init`);
      }
    });
  }
}



