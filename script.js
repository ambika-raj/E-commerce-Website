const container = document.getElementById("product-container");
const btn = document.getElementById("btn");
const inputBox = document.getElementById("inputBox");

let allProducts = [];

let currentPage = 1;
let itemsPerPage = 8;

// fetch products
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;   
    renderProducts(allProducts);  
    
    renderPaginatedProducts();
});

// render products
function renderProducts(products) {

  container.innerHTML = "";

  products.forEach(product => {

    const card = document.createElement("div");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.thumbnail;

    const title = document.createElement("h3");
    title.innerText = product.title;

    const price = document.createElement("h4");
    price.innerText = `Price: $${product.price}`;

    const p = document.createElement("p");
    p.innerText = product.description;

    card.append(image, title, price, p);

    card.addEventListener("click", () => {
      console.log("Card clicked");

      saveVisit(product);

      window.location.href = `product.html?id=${product.id}`;
    });

    container.appendChild(card);
  });
}


// localStorage
function saveSearch(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // avoid duplicate search
  if (!history.includes(query)) {
    history.push(query);
  }

  localStorage.setItem("searchHistory", JSON.stringify(history));
  localStorage.setItem("testKey", "Hello World");
  console.log("Saved in localStorage:", history);
}

btn.addEventListener("click", () => {
  const query = inputBox.value.trim();

  if (!query) return;

  saveSearch(query);

  console.log(
    "localStorage before redirect:",
    localStorage.getItem("searchHistory"),
  );

  setTimeout(() => {
    window.location.href = `search.html?q=${query}`;
  }, 300);
});


function saveVisit(product) {
  let visits = JSON.parse(localStorage.getItem("visitHistory")) || [];

  const visitData = {
    id: product.id,
    title: product.title,
    time: new Date().toISOString(), // timestamp
  };

  visits.push(visitData);

  localStorage.setItem("visitHistory", JSON.stringify(visits));

  console.log("Visit saved:", visits);
}

function showVisitHistory() {

    let visits = JSON.parse(localStorage.getItem("visitHistory")) || [];

    visits.forEach(v => {
        console.log(v.title, v.time);
    });
}

function renderPaginationButtons() {
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    if (i === currentPage) {
      btn.className = "active-page";
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      renderPaginatedProducts();
    });

    paginationDiv.appendChild(btn);
  }
}

function renderPaginatedProducts() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedProducts = allProducts.slice(start, end);

  renderProducts(paginatedProducts);
  renderPaginationButtons();
}