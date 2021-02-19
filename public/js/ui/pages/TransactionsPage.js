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
  constructor( element ) {
     if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
      return ;
    }
    this.render();
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const buttonRemoveAccount = this.element.querySelector('.remove-account');
    const containerTransactionRemove = this.element.querySelector('.content');
    buttonRemoveAccount.addEventListener('click', () => this.removeAccount());
    containerTransactionRemove.addEventListener('click', (e) => {
      const currentTarget = e.target;
      if (currentTarget.classList.contains('transaction__remove')) {
        const idTransaction = currentTarget.dataset.id;
        this.removeTransaction(idTransaction);
      }
    });
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
    if (!this.lastOptions) {
      return;
    }
    const confirmMsg = confirm('Вы действительно хотите удалить счёт?');
    if (!confirmMsg) {
      return;
    }
    Account.remove(this.lastOptions, User.current(), () => App.update());
    this.clear();    
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    const confirmMsg = confirm('Вы действительно хотите удалить эту транзакцию?');
    if (!confirmMsg) {
      return;
    }
    Transaction.remove(id, User.current(), () => App.update());
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (!options) {
      return;
    }
    this.lastOptions = options;
    Account.get(options.account_id, User.current(), (err, data) => {
      if (err == null) {
        this.renderTitle(data);
      }
    }); 
    Transaction.list(options, (err, data) => {
      if(err == null) {
        this.renderTransactions(data);
      }
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions({data: []});
    this.renderTitle({data: {name: 'Название счёта'}});
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    const accountName = this.element.querySelector('.content-title');
    accountName.textContent = name.data.name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
   formatDate( date ) {
    const transactionDate = new Date(date);
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    return transactionDate.toLocaleString("ru", options);
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    return `
    <div class="transaction transaction_${item.type.toLowerCase()} row">
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
      <div class="transaction__summ">${item.sum}<span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">        
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    const transactionContainer = this.element.querySelector('.content');
    transactionContainer.innerHTML = '';
    let template = data.data.map((item) => this.getTransactionHTML(item)).join(' ');
    transactionContainer.insertAdjacentHTML('afterbegin', template);
  }
}
