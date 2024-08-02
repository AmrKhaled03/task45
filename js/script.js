let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let id = document.getElementById("id");
let total = document.getElementById("total");
let search = document.getElementById("search");

document.getElementById("create").disabled = true;

[id, title, price, taxes, ads, discount, count, category].forEach((element) => {
  element.addEventListener("input", function () {
    document.getElementById("create").disabled = 
      id.value === "" || 
      title.value === "" || 
      price.value === "" || 
      taxes.value === "" || 
      ads.value === "" || 
      discount.value === "" || 
      count.value === "" || 
      category.value === "";
  });
});

let allProducts = localStorage.getItem("books") ? JSON.parse(localStorage.getItem("books")) : [];
let filteredProducts = [...allProducts]; // Initialize filteredProducts with allProducts

function addProduct() {
  let newProduct = {
    id: id.value,
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  allProducts.push(newProduct);
  localStorage.setItem("books", JSON.stringify(allProducts));
  filteredProducts = [...allProducts]; // Reset filteredProducts after adding
  clearData();
  renderProducts();
}

const calcTotal = () => {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "none";
  }
};

const renderProducts = () => {
  let productsContainer = document.querySelector(".tbody");
  productsContainer.innerHTML = "";
  if(allProducts.length === 0){
     productsContainer.innerHTML += `
 <tr>
        <td colspan="10" style="text-align: center;">No Books Found</td>
      </tr>`;

  }else{
      filteredProducts.forEach((product, index) => {
    productsContainer.innerHTML += `
      <tr>
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.count}</td>
        <td>${product.category}</td>
        <td>
          <div class="row">
            <div class="col-6">
              <button class="Btn" onclick="updateData(${index})">Edit 
                <svg class="svg" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                </svg>
              </button>
            </div>
            <div class="col-6">
              <button class="button" onclick="deleteProduct('${product.id}')">
                <svg viewBox="0 0 448 512" class="svgIcon">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
              </button>
            </div>
          </div>
        </td>
      </tr>`;
  });
  }

};

renderProducts();

function clearData() {
  id.value = "";
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
  document.getElementById("create").disabled = true;
}

const deleteProduct = (id) => {
  allProducts = allProducts.filter((product) => product.id !== id);
  localStorage.setItem("books", JSON.stringify(allProducts));
  filteredProducts = [...allProducts]; // Update filteredProducts after deletion
  renderProducts();
};

function updateData(i) {
  title.value = allProducts[i].title;
  price.value = allProducts[i].price;
  taxes.value = allProducts[i].taxes;
  ads.value = allProducts[i].ads;
  category.value = allProducts[i].category;
  id.value = allProducts[i].id;
  discount.value = allProducts[i].discount;
  count.value = allProducts[i].count;

  calcTotal();
  count.style.display = "none";
  document.getElementById("create").innerHTML = "Update";

  // Event listener for updating the product when "Update" button is clicked
  document.getElementById("create").onclick = function () {
    allProducts[i] = {
      id: id.value,
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value
    };

    localStorage.setItem("books", JSON.stringify(allProducts));
    filteredProducts = [...allProducts]; // Update filteredProducts after update
    clearData();
    renderProducts();
    document.getElementById("create").innerHTML = "Create";
    document.getElementById("create").onclick = addProduct;
  };
}

let searchMood = "title"; // Default search mood

function getSearchMood(id) {
  if (id === "searchCategory") {
    searchMood = "category";
  } else {
    searchMood = "title";
  }
  search.placeholder = `Search By ${searchMood.charAt(0).toUpperCase() + searchMood.slice(1)}`;
  search.value = "";
  filteredProducts = [...allProducts]; // Reset filteredProducts when changing search mood
  renderProducts();
}

function searchData(value) {
  value = value.trim().toLowerCase();
  filteredProducts = allProducts.filter(product => 
    product[searchMood].toLowerCase().includes(value) // Use includes for partial match
  );
  renderProducts();
}

search.addEventListener("keyup", (e) => searchData(e.target.value));
