/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element) {
      throw new Error (`Элемент не существует в TransactionsWidget`)
    };
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    document.querySelector(`.transactions-panel`).addEventListener(`click`, (e) => {
      e.preventDefault();
      if(e.target == this.element.querySelector(`.create-income-button`)) {
        App.getModal(`newIncome`).open();
      }
      if(e.target == this.element.querySelector(`.create-expense-button`)) {
        App.getModal(`newExpense`).open();
      }
    })
  }
}
