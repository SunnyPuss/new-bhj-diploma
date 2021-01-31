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
  constructor( element,) {
    if (!element) {
      throw new Error(`Элемент не существует в TransactionPage`);
    };
    this.element = element;
    this.registerEvents();
  }

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
      }
      if (e.target.closest(`.transaction__remove`)) {
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
    if (confirm(`Вы действительно хотите удалить этоту транзакцию?`)) {
      
      Transaction.remove(id, this.lastOptions, (err, response) => {
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
      // console.log(this.element);
      Account.get(options.account_id, options, (err, response) => {
        
        if (err) {
          return (err);
        } else if (response.success == true) {
          // console.log (response)
          // const actualAccount = response.data.find(item => item.id == this.lastOptions.account_id);
          // console.log(actualAccount.name);
          this.renderTitle(response.data.name);
        }
      })
      
      Transaction.list(options, (err, response) => {
        if (err) {
          return err;
        } else if (response.success == true) {
          this.renderTransactions(response.data);
          
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
    this.lastOptions = ``;
    this.renderTransactions(data = []);
    this.renderTitle(`Название счёта`);
    
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
    // const dateOptions = {
    //   day: `2-digit`,
    //   month: `long`,
    //   year: `numeric`,
    //   hour: `2-digit`,
    //   minute: `2-digit`

    // }
    // const otherViewDate = new Date(Date.parse(date)).toLocaleDateString(`default`, dateOptions);
    // console.log(`${setDay(otherViewDate)} ${getMonth(otherViewDate)} ${getYear(otherViewDate)} в ${getHour(otherViewDate)} ${getMinute(otherViewDate)}`)
    // return `${getDay(otherViewDate)} ${getMonth(otherViewDate)} ${getYear(otherViewDate)} в ${getHour(otherViewDate)} ${getMinute(otherViewDate)}`;
    const otherViewDate = new Date(Date.parse(date))
    const dateTimeFormat = new Intl.DateTimeFormat('ru', { year: 'numeric', month: 'long', day: '2-digit', hour:'2-digit', minute: '2-digit' }) 
    const [{ value: day },,{ value: month },,{ value: year },,{ value: hour },,{ value: minute }] = dateTimeFormat.formatToParts(otherViewDate) 
  // console.log(`${day} ${month} ${year} в ${hour}:${minute}`);
  return `${day} ${month} ${year} в ${hour}:${minute}`
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    return `<div class="transaction transaction_${item.type.toLowerCase()} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      
          ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        
        <button class="btn btn-danger transaction__remove" data-id="${item.account_id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    const content = document.querySelector(`.content`);
    content.innerHTML = ``;
    data.forEach(item => {
      content.innerHTML += this.getTransactionHTML(item);
    });
  }
}


