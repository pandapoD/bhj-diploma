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
      throw new Error('Элемент не существует');
    }
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
    const buttonNewAccount = this.element.querySelector('.create-account');
    buttonNewAccount.addEventListener('click', () => App.getModal( 'createAccount' ).open());
    this.element.addEventListener('click', (e) => {
      const currentElement = e.target;
      const account = currentElement.closest('.account')
      if (account && account.classList.contains('account')) {
        this.onSelectAccount(currentElement);
      }
    });
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
    const currentUser = User.current();
    if (!currentUser) {
      return;
    }
    Account.list(currentUser, (err, data) => {
      this.clear()
      if (err == null) {
        this.renderItem(data);
      }
      
    });    
    ;
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountElements = [...this.element.querySelectorAll('.account')];
    accountElements.forEach((element) => element.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
     const accounts = [...this.element.querySelectorAll('.account')];
     accounts.forEach((account) => {
      if (account.classList.contains('active')) {
        account.classList.remove('active');
        return;
      }
     });
     element.closest('.account').classList.add('active');
     App.showPage('transactions', { account_id: element.closest('.account').dataset.id });
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
        <span>${item.sum} ₽</span>
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
    const accounts = item.data;
    const accountСontainer = this.element.querySelector('li');
    console.log(accountСontainer)
    let template = accounts.map((account) => this.getAccountHTML(account)).join(' ');
    accountСontainer.insertAdjacentHTML('afterend', template);
  }
}
