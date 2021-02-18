/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.element = element;
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, data) => {
      if (err == null) {
        const selectElement = this.element.querySelector('select');
        selectElement.innerHTML = '';
        let template = data.data.map((item) => `<option value="${item.id}">${item.name}</option>`).join(' ');
        selectElement.insertAdjacentHTML('afterbegin', template);
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, () => {
      App.update();
      this.element.reset();
      App.getModal('newIncome').close();
      App.getModal('newExpense').close();
    });
  }
}
