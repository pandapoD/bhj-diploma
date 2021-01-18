/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    // if (!element) {

    // }
    this.element = element;
    this.registerEvents();
    console.log(this.element)

  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {

    this.element.addEventListener('submit', (e) => {
      console.log(this.element)
      e.preventDefault();
      this.submit();

    })
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const input = this.element.getElementsByTagName('input');
console.log(input)
    App.getForm('register').addEventListener('click', e => {
      const currentElement = e.target;
      console.log(currentElement);
      console.log(App.getForm('register')) 
  
    })
    
    // const data = {
    //   name: 
    //   value:
    // };

  }

  onSubmit( options ) {
    
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.getData();
    
    this.onSubmit();
  }
}
