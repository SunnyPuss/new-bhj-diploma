/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element, lastOptions ) {
    if (!element) {
      throw new Error(`Элемент не существует в TransactionPage`);
    };
    this.element = element;
    this.lastOptions = lastOptions;
    this.registerEvents();
  }

  static lastOptions = {};
  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    } else {
      this.render();
    };
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    document.querySelector(`.content-wrapper`).addEventListener(`click`, (e) => {
      e.preventDefault();
      if (e.target == document.querySelector(`.remove-account`)) {
        this.removeAccount();
      } else if (e.target == document.querySelector(`.transaction__remove`)) {
        this.removeTransaction(e.target.dataset.id);
      };
    })

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    
    
    if (this.lastOptions && confirm(`Вы действительно хотите удалить этот счёт?`)) {
      
      
      Account.remove(this.lastOptions.account_id, this.lastOptions, (err, response) => {
        console.log(response);
        if (err) {
          return err;
        } else if (response.success == true) {
          App.update();
          this.clear();
          
        }
      })
    };
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if (this.lastOptions && confirm(`Вы действительно хотите удалить этоту транзакцию?`)) {
      
      Account.remove(id, this.lastOptions, (err, response) => {
        console.log(response);
        if (err) {
          return err;
        } else if (response.success == true) {
          App.update();
        }
      })
    };
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    this.lastOptions = options;
    
    if (this.lastOptions) {
      console.log( options)
      Account.get(this.lastOptions.account_id, User.current(), (err, response) => {
        
        if (err) {
          return (err);
        } else if (response.success == true) {
          console.log( options)
          // console.log (`куку`)
          this.renderTitle(response.data.name);
          console.log(response);
          
        }
      })
      
      Transaction.list(this.lastOptions, (err, response) => {
        
        if (err) {
          return err;
        } else if (response.success == true) {
          response.data.forEach(object => {
            this.renderTransactions(object)
          });
        }
      })
    }
    
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
      this.renderTransactions([]);
    this.renderTitle(`Название счёта`);
    this.lastOptions = {};
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    document.querySelector(`.content-title`).textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    console.log(Date.parse(date).toLocaleString());
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {

  }
}

