//? json-server -w db.json -p 8000

//? API for requests
const API = "http://localhost:8000/products";

//? products list
const list = document.querySelector("#products-list");

//? Form and inputs
const addForm = document.querySelector("#add-form");
const titleInp = document.querySelector("#title");
const priceInp = document.querySelector("#price");
const descInp = document.querySelector("#description");
const imageInp = document.querySelector("#image");

//? функция рендер
render();

//! GET
async function getProducts() {
  const res = await fetch(API); //? Запрос на получение данных
  const data = await res.json(); //? Расшифровка данных
  return data; //? возвращаем данные
}
//! POST
async function addProduct(newProduct) {
  await fetch(API, {
    method: "POST", //? Указываем метод запроса
    body: JSON.stringify(newProduct), //? Данные которые хотим добавить
    headers: {
      "Content-Type": "application/json", //? Указываем тип контента
    },
  });
  //? Стянуть и отобразить актуальные данные
  render();
}

//? функция рендер для отображения данных на странице
async function render() {
  //? стягиваем актуальные данные
  const data = await getProducts();
  //? очищаем лист чтобы карточки не дублировались
  list.innerHTML = "";
  //? Перебираем полученные данные и на каждый элемент отрисовываем карточку
  data.forEach((item) => {
    list.innerHTML += `<div class="card m-5" style="width: 18rem">
    <img
      src="${item.image}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">
        ${item.description.slice(0, 70)}...
      </p>
      <p class="card-text">${item.price}$</p>
      <button class="btn btn-dark w-25">Edit</button>
      <button class="btn btn-danger">Delete</button>
    </div>
  </div>
    `;
  });
}

//? Обработчик события для добавления
addForm.addEventListener("submit", (e) => {
  //? чтобы страница не перезагружалась
  e.preventDefault();
  //? Проверка на заполненость полей
  if (
    !titleInp.value.trim() ||
    !priceInp.value.trim() ||
    !descInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    alert("Заполните все поля");
    return;
  }

  //? Собираем объект из значения инпутов
  const product = {
    title: titleInp.value,
    price: priceInp.value,
    description: descInp.value,
    image: imageInp.value,
  };

  //? добавляем объект в дб джейсон
  addProduct(product);
  titleInp.value = "";
  priceInp.value = "";
  descInp.value = "";
  imageInp.value = "";
});
