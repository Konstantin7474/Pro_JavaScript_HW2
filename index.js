/* Задание 1
Представьте, что у вас есть класс для управления библиотекой. 
В этом классе будет приватное свойство для хранения списка книг, 
а также методы для добавления книги, удаления книги и получения информации о наличии книги.

Класс должен содержать приватное свойство #books, 
которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

Реализуйте геттер allBooks, который возвращает текущий список книг.

Реализуйте метод addBook(title), 
который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует 
в списке, выбросьте ошибку с соответствующим сообщением.

Реализуйте метод removeBook(title), 
который позволит удалять книгу из списка по названию. 
Если книги с таким названием нет в списке, 
выбросьте ошибку с соответствующим сообщением.

Реализуйте метод hasBook(title), 
который будет проверять наличие книги в библиотеке
 и возвращать true или false в зависимости от того, 
 есть ли такая книга в списке или нет.

Реализуйте конструктор, который принимает начальный
 список книг (массив) в качестве аргумента. Убедитесь, 
 что предоставленный массив не содержит дубликатов; 
 в противном случае выбрасывайте ошибку.
 */

class Library {
  #books;

  constructor(initialBooks = []) {
    const uniqueBooks = new Set(initialBooks);
    if (uniqueBooks.size !== initialBooks.length) {
      throw new Error("Начальный список книг содержит дубликаты");
    }

    this.#books = [...uniqueBooks];
  }

  get allBooks() {
    return this.#books;
  }

  addBook(title) {
    if (this.#books.includes(title)) {
      throw new Error(
        `Книга с названием "${title}" уже существует в библиотеке`
      );
    }
    this.#books.push(title);
  }

  removeBook(title) {
    const bookIndex = this.#books.indexOf(title);
    if (bookIndex === -1) {
      throw new Error(`Книга с названием "${title}" не найдена в библиотеке`);
    }
    this.#books.splice(bookIndex, 1);
  }

  hasBook(title) {
    return this.#books.includes(title);
  }
}

try {
  const library = new Library(["Book A", "Book B"]);
  console.log(library.allBooks);
  library.addBook("Book C");
  console.log(library.allBooks);
  console.log(library.hasBook("Book B"));
  library.removeBook("Book A");
  console.log(library.allBooks);
} catch (error) {
  console.error(error.message);
}

/* Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. 
Пользователи могут оставлять отзывы, 
но чтобы исключить слишком короткие или слишком длинные 
ообщения, вы решаете установить некоторые ограничения.

Создайте HTML-структуру с текстовым полем для ввода отзыва,
 кнопкой для отправки и контейнером, где будут отображаться отзывы.

Напишите функцию, которая будет добавлять отзыв в контейнер 
с отзывами. Однако если длина введенного отзыва менее 
50 или более 500 символов, функция должна генерировать исключение.

При добавлении отзыва, 
он должен отображаться на странице под предыдущими отзывами, а не заменять их.

Вы можете использовать этот массив initialData для 
начальной загрузки данных при запуске вашего приложения. */
const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: "1",
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: "2",
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: "3",
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: "4",
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

function initializeFeedback() {
  const feedbackContainer = document.querySelector(".feedback");

  initialData.forEach((product) => {
    const productTitle = document.createElement("h3");
    productTitle.textContent = product.product;
    feedbackContainer.appendChild(productTitle);

    product.reviews.forEach((review) => {
      const reviewItem = document.createElement("p");
      reviewItem.textContent = review.text;
      feedbackContainer.appendChild(reviewItem);
    });
  });
}

function addFeedback(reviewText) {
  if (reviewText.length < 50 || reviewText.length > 500) {
    throw new Error("Отзыв должен содержать от 50 до 500 символов");
  }

  const feedbackContainer = document.querySelector(".feedback");

  const newReview = document.createElement("p");
  newReview.textContent = reviewText;
  feedbackContainer.appendChild(newReview);
}

document.querySelector("button").addEventListener("click", () => {
  const reviewText = document.querySelector("input").value;

  try {
    addFeedback(reviewText);
    document.querySelector("input").value = "";
  } catch (error) {
    console.error(error.message);
  }
});

initializeFeedback();
