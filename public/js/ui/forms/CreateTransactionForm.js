/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm{
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);    
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountList = document.querySelectorAll(`.accounts-select`);
    Account.list(User.current(), (err, response) => {
      for (let item of accountList) {
        item.innerHTML = "";
      }

      if (err) {
        return err;
      } else if (response.success == true) {
          response.data.forEach(item => {
          let account = `<option value="${item.id}">${item.name}</option>`;
          for (let elem of accountList) {
            elem.insertAdjacentHTML(`beforeend`, account)
          }
        })
      }
    
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options.data, (err, data) => {
      console.log(options)
      if (err) {
        return err;
      } else if (data.success) {
        App.update();
        this.element.reset();
        let modalName = `new${options.data.type[0].toUpperCase()}${options.data.type.slice(1)}`;
        console.log(modalName)
        App.getModal(modalName).close();
      }
    })
  }
}
