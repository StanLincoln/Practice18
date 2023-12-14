function renderProduct(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("productCard");

  productCard.addEventListener("click", (event) => {
    productCard.classList.toggle("productCardHighlighted");
  });

  const productTitle = document.createElement("h3");
  productTitle.textContent = product.name;
  productTitle.classList.add("productTitle");

  const productPrice = document.createElement("p");
  productPrice.textContent = product.price;
  productPrice.classList.add("productPrice");

  const productCategory = document.createElement("p");
  productCategory.textContent = product.category;
  productCategory.classList.add("productCategory");

  const productImg = document.createElement("img");
  productImg.src = !!product.img ? product.img : "";
  productImg.classList.add("productImg");

  const productDescription = document.createElement("p");
  productDescription.textContent = product.description;
  productDescription.classList.add("productDescription");

  productCard.append(
    productImg,
    productTitle,
    productPrice,
    productCategory,
    productDescription
  );

  return productCard;
}

// 1. Пишем сетевой запрос. Наша задача - обратиться к "бэку" по адресу `https://fakestoreapi.com/products/categories` GET-запросом, и вывести в консоль результат в "удобоваримом" виде (результат нам возвращается в виде JSON). Этот запрос нам вернет массив с категориями товаров.

// fetch(`https://fakestoreapi.com/products/categories`)
//     .then(response => {
//         console.log(response);
//         return response.json()
//     })
//     .then((result) => console.log(result))

// 2. Добавляем в разметку ПЕРЕД блоком `.productsContainer` компонент `select` (выпадающее меню). Нужно заполнить этот `select` опциями (`<option value='value'>option_text</option>`), которые нам пришли с "бэка" в предыдущей задаче. То есть, пройтись по массиву результатов, для каждого создать элемент `option`, и добавить его в наш `select`. В качестве `value` используем значение, в качестве `option_text` используем то же.

const mainContainer = document.querySelector(".mainContainer");
const select = document.createElement("select");
mainContainer.prepend(select);

fetch(`https://fakestoreapi.com/products/categories`)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((result) => {
    result.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.text = category;
      select.append(option);
    });
  });

// 3. Пишем функцию `getProducts`. В качестве аргумента, она принимает категорию товаров. Она должна сделать запрос по адресу `https://fakestoreapi.com/products/category/CATEGORY`. В ответ нам придет список товаров этой категории. Наша задача - отрендерить их в списке товаров (`div.productsContainer`).  ВАЖНО! Список товаров перед рендерингом надо очистить! Товары рендерим с помощью функции `renderProduct`, она умеет создавать DOM-элемент, но нужно его еще добавить в контейнер.

// function getProducts(category) {

//   const productsContainer = document.querySelector(".productsContainer");
//   console.log(productsContainer);
//   productsContainer.innerHTML = "";

//   fetch(`https://fakestoreapi.com/products/category/${category}`)
//     .then((response) => response.json())
//     .then((result) => {
//       result.forEach((product) => {
//         const productItem = renderProduct(product);
//         productsContainer.append(productItem);
//       });
//     });
// }
// getProducts("electronics");

// 4. Дорабатываем функцию `getProducts`. Нужно добавить рассмотрение случая, когда у нас не задана категория (хотим запросить все товары). Нужно сделать так, чтобы, если в аргументе не передана категория, то запрос шел на адрес `https://fakestoreapi.com/products`.
// 5. Добавляем обработчик события `change` на наш `select`. При событии, нам нужно вызывать функцию из п.12 с соответствующей категорией - т.е. мы рисуем список товаров выбранной категории.

getProducts(electronics);

function getProducts(category) {

  const productsContainer = document.querySelector(".productsContainer");
  console.log(productsContainer);
  productsContainer.innerHTML = "";

const urlAll = `https://fakestoreapi.com/products`

  fetch(category ? `https://fakestoreapi.com/products/category/${category}`: urlAll)
    .then((response) => response.json())
    .then((result) => {
      result.forEach((product) => {
        const productItem = renderProduct(product);
        productsContainer.append(productItem);
      });
    });
}

select.addEventListener("change", function (event) {
  const selectedCategory = event.target.value;
  getProducts(selectedCategory);
});


// 6. Добавляем "иконку загрузки" на нашу страницу. Добавляем перед нашим `select` контейнер (`div.loader`) с текстом "Подождите, идет загрузка...". По умолчанию он скрыт (`display: none`). Нам нужно показывать этот блок при начале запроса списка товаров, и скрывать, когда список товаров успешно загружен.

const loader = document.createElement('div');
loader.className = 'loader';
loader.innerText = "Подождите, идет загрузка...";
mainContainer.prepend(loader);

// 7. Async/await. Переписать нашу функцию `getProducts` с использованием синтаксиса async/await.

async function getProducts () {
const urlAll = `https://fakestoreapi.com/products`
  let products = await fetch(category ? `https://fakestoreapi.com/products/category/${category}`: urlAll);
  const response = await products.json();
  console.log(response);
}


// 8. Добавить в функцию рассмотрение нештатных ситуаций (ошибок).
// 9. Пишем универсальную функцию отправки GET-запроса, которая будет возвращать JSON. Назовем ее `jsonRequest`. В аргументах она принимает URL, к которому надо обратиться. Она должна сделать запрос по этому адресу, затем преобразовать результат в JSON, и вернуть "готовый к употреблению" результат. Используем синтаксис async/await.

