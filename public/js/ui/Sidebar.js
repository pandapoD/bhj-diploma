// const entrance = document.querySelector( '.menu-item_register' );
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
    const buttonMenu = document.querySelector('.sidebar-toggle');
    buttonMenu.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registration = document.querySelector('.menu-item_register');
    const entrance = document.querySelector('.menu-item_login');
    const logOff = document.querySelector('.menu-item_logout');
    entrance.addEventListener('click', () => App.getModal('login').open());
    registration.addEventListener('click', () => App.getModal('register').open());
    logOff.addEventListener('click', () => {
      User.logout(User.current(), () => App.setState('init'));
    });
     
  }

}
