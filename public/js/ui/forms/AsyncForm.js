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
    if (!element) {
      throw new Error(`Элемент не существует в Modal`);
    };
    this.element = element;
    this.registerEvents(); 
  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.submit = this.submit.bind(this);
    this.element.addEventListener (`submit`, (event) => {
      this.submit();
      event.preventDefault();
    });
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const formObject = {};
    const formData = new FormData (this.element);
    const entries = formData.entries();
    for (let item of entries) {
      const key = item[ 0 ],
      value = item[ 1 ];
      formObject[key] = value;
    }
    return formObject;
  }

  onSubmit( options ) {
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    const options = {
      url: this.element.getAttribute(`action`),
      method: this.element.getAttribute(`method`),
      data: this.getData()
    }
    this.onSubmit(options);
    
    //console.log (options.data.toString())
 
  }
}

// const element = document.querySelector(`#register-form`);

// const af = new AsyncForm(element);

// const obj = {
//   url: `www.kot.ru`,
//   method: `POST`,
//   data: { 
//     name: basya,
//     password: kiskis  
//     }
// };

// console.log(af.onSubmit(obj));

