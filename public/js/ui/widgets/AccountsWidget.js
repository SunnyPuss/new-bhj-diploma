/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error(`Элемент не существует в AccountsWidget`);
    };
    this.element = element;
    this.registerEvents();
    this.update();

  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    // this.onSelectAccount = this.onSelectAccount.bind(this);
    // this.element.addEventListener("click", (evt) => {
    //   if (evt.target.closest(".create-account")) {
    //     App.getModal(`createAccount`).open();
    //   } else if (evt.target.closest(".account")) {
    //     this.onSelectAccount(evt.target);
    //   }
    // })

    document.querySelector(`.accounts-panel`).addEventListener(`click`, (e) => {
      e.preventDefault();
      if (e.target == this.element.querySelector(`.create-account`)) {
        App.getModal(`createAccount`).open();
      }
      if (e.target.closest(`.account`)) {
        this.onSelectAccount(e.target.closest(`.account`));
      }
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (err) {
          return err;
        } else if (response.success == true) {
          this.clear();
          response.data.forEach(object => {
            this.renderItem(object)
          })
        }
      
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountsOnSB = document.querySelectorAll(`.account`);
    accountsOnSB.forEach((el) => {el.remove()});
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    // element.addEventListener(`click`, () => {
    //   document.querySelector(`active`).classList.remove(`active`);
    //   element.classList.add(`active`);
    //   App.showPage( 'transactions', { account_id: item.id });
    // })

    this.element.querySelectorAll(`.active`).forEach((account) => {
      account.classList.remove(`active`);
    })

    element.classList.add(`active`);
    App.showPage(`transactions`, {account_id: element.dataset.id});
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    return `<li class="account" data-id="${item.id}">
    <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum}</span>
    </a>
    </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    this.element.insertAdjacentHTML(`beforeend`, this.getAccountHTML(item));
  }
}