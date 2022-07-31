let total = document.getElementById("total");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let category = document.getElementById("category");
let title = document.getElementById("title");
let totalDIV = document.querySelector(".total");
let count = document.getElementById("count");
let form = document.getElementsByTagName("form")[0];
let deletebtn = document.getElementById("delete");
let createbtn = document.getElementById("create");
let deleteAllBtn,
  searchMood,
  tmp,
  mood = "create";
let searchTitle = document.getElementById("title");
let searchCategory = document.getElementById("category");
let searchbtn = document.getElementById("search");

// Total Calcated & Displayed
function getTotal() {
  if (price.value != "") {
    let totalValue = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = totalValue;
    totalDIV.style.backgroundColor = "green";
  } else {
    totalDIV.style.backgroundColor = "red";
    total.innerHTML = "";
  }
}

// Saving Products
let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

// Product Creation On click
function CreateProd() {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (title.value != '' && price.value != '' && newPro.count <= 100) {

    // How Many Products to create
    // Or Update
    if (mood === "create") {
      if (newPro.count > 1) {
        while (newPro.count != 0) {
          dataPro.push(newPro);
          newPro.count--;
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      createbtn.value = "Create";
      count.style.display = "block";
    }
  
    // Save LocalStorage
    localStorage.setItem("product", JSON.stringify(dataPro));
    deleteAllBtn.innerHTML = `Delete All (${dataPro.length})`;
    form.appendChild(deleteAllBtn);
    showData();
  } 
}

// Clear Input On Creating Products
form.onsubmit = function (e) {
  e.preventDefault();
  title.value = "";
  price.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  taxes.value = "";
  category.value = "";
  count.value = "";
  totalDIV.style.backgroundColor = "red";
  showData();
};

// Displaying Data
function showData() {
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateProd(${i})"id="update">Update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
}

showData();

// Delete Product Button

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  deleteAllBtn.innerHTML = `Delete All (${dataPro.length})`;
  showData();
}

// Delete all Products

document.addEventListener("click", (e) => {
  if (e.target.className == "dt") {
    localStorage.clear();
    dataPro.splice(0);
    deleteAllBtn.innerHTML = "";
    deleteAllBtn.remove();
    showData();
  }
});

if (localStorage.length > 0) {
  deleteAllBtn = document.createElement("button");
  deleteAllBtn.className = "dt";
  form.appendChild(deleteAllBtn);
  deleteAllBtn.style.width = "75%";
  deleteAllBtn.innerHTML = `Delete All (${dataPro.length})`;
}

// Update Product

function updateProd(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  count.style.display = "none";
  createbtn.value = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search Mood

function getSearchMood(id) {
  searchbtn.focus();
  if(id === 'title') {
    searchMood = 'title'
  } else {
    searchMood = 'category'
  }
  searchbtn.placeholder = `Search By ${id}`
  searchbtn.value = '';
}

// Search 
function searchData(value) {
  let table='';
    if(searchMood = 'title') {
      for(let i = 0 ; i < dataPro.length ; i++) {
        if(dataPro[i].title.toLowerCase().includes(value)) {
          table += `
          <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateProd(${i})"id="update">Update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
          `;
        }
      }
    } else {
      for(let i = 0 ; i < dataPro.length ; i++) {
        if(dataPro[i].category.toLowerCase().includes(value)) {
          table += `
          <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateProd(${i})"id="update">Update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
          `;
        }
      }
    }
    document.getElementById("tbody").innerHTML = table;
}
