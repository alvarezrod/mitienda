// EMULADOR DE LOCALSTORAGE PARA GESTION DE USUARIOS.

const localusuario = window.localStorage;

const localstorageEmulator = {
  users: [],
  addUser: function (email, password) {
    this.users.push({ email: email, password: password });
    localusuario.setItem("users", JSON.stringify(this.users));
  },
  getUser: function (email) {
    return this.users.find((user) => user.email === email);
  },
  deleteUser: function (email) {
    this.users = this.users.filter((user) => user.email !== email);
    localusuario.setItem("users", JSON.stringify(this.users));
  },
};

document.getElementById("login").addEventListener("click", function () {
  // Crear el modal si no existe
  let loginModal = document.getElementById("loginModal");
  if (!loginModal) {
    loginModal = document.createElement("div");
    loginModal.id = "loginModal";
    loginModal.style.position = "fixed";
    loginModal.style.top = "50%";
    loginModal.style.left = "50%";
    loginModal.style.transform = "translate(-50%, -50%)";
    loginModal.style.background = "#fff";
    loginModal.style.padding = "24px 36px";
    loginModal.style.border = "1px solid #ccc";
    loginModal.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
    loginModal.style.zIndex = "1000";
    loginModal.style.fontSize = "1em";
    loginModal.style.borderRadius = "10px";
    loginModal.style.display = "none";
    loginModal.innerHTML = `
      <div style="margin-bottom: 12px;width:350px;height:auto;">
      <label>Nombre : <input type="text" id="modalName" required></label>
      </div>
      <div style="margin-bottom: 12px;">
      <label>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="email" id="modalEmail" required></label>
      </div>
      <div style="margin-bottom: 12px;">
      <label>Password: <input type="password" id="modalPassword" required></label>
      </div>
      <button id="modalLoginBtn">Ingresar</button>
      <button id="modalCloseBtn" style="margin-left:8px;">Cancelar</button>
    `;
    document.body.appendChild(loginModal);

    document.getElementById("modalCloseBtn").onclick = function () {
      loginModal.style.display = "none";
    };
    document.getElementById("modalLoginBtn").onclick = function () {
      const name = document.getElementById("modalName").value;
      const email = document.getElementById("modalEmail").value;
      const password = document.getElementById("modalPassword").value;
      if (email && password) {
        localstorageEmulator.addUser(email, password);
        loginModal.style.display = "none";
        document.getElementById("logged").textContent = email;
        document.getElementById("logged").href = `mailto:${email}`;
        document.getElementById("user-logged").textContent = `Usuario: ${name}`;
      } else {
        alert("Please enter both email and password.");
      }
    };
  }
  loginModal.style.display = "block";
});

const cartItems = [];
const products = [
  {
    code: "cod12",
    name: "Fender Stratocaster® H.E.R. Limited Edition",
    price: 199.99,
  },
  { code: "cod34", name: "Drum Set Maple Complete 5 Pieces", price: 499.99 },
  { code: "cod56", name: "Keyboard Yamaha PSR-E373", price: 299.99 },
  { code: "cod78", name: "Hayden HY-12 wireless Microphone", price: 149.99 },
  { code: "cod90", name: "Guitar Amplifier", price: 249.99 },
];

function showAlert() {
  alert("¡Hola! Has hecho clic en el botón.");
}

function updateCartTotal() {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const cartTotalElement = document.getElementById("cart-total");
  console.log("Mostrando item en el carrito:", total);
  if (cartTotalElement) {
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }
}

// Añadir productos al carrito

function addCartItem(code) {
  const product = products.find((item) => item.code === code);
  if (product) {
    cartItems.push(product);
    console.log("Producto añadido al carrito:", product);
    console.log("Carrito actual:", cartItems);
  } else {
    console.log("Producto no encontrado con el código:", code);
  }
}

function removeCartItem(index) {
  if (index >= 0 && index < cartItems.length) {
    cartItems.splice(index, 1);
  }
  refresh();
}

function updateCartSummary() {
  const productSummary = {};
  cartItems.forEach((item, idx) => {
    if (!productSummary[item.code]) {
      productSummary[item.code] = {
        name: item.name,
        quantity: 0,
        price: 0,
        indexes: [],
      };
    }
    productSummary[item.code].quantity += 1;
    productSummary[item.code].price += item.price;
    productSummary[item.code].indexes.push(idx);
  });

  const summaryList = document.getElementById("summary");
  summaryList.innerHTML = "";

  // Create table
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  // Table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Product", "#", "Price", ""].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    th.style.borderBottom = "1px solid #ccc";
    th.style.padding = "8px";
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Table body
  const tbody = document.createElement("tbody");
  Object.values(productSummary).forEach((product) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;
    nameCell.style.padding = "8px";

    const quantityCell = document.createElement("td");
    quantityCell.style.textAlign = "center";
    quantityCell.style.padding = "8px";
    // Botón -
    const minusBtn = document.createElement("button");
    minusBtn.textContent = "−";
    minusBtn.title = "Quitar uno";
    minusBtn.style.marginRight = "6px";
    minusBtn.style.cursor = "pointer";
    minusBtn.onclick = function () {
      // Elimina solo uno de ese producto (el primero en el array)
      removeCartItem(product.indexes[0]);
    };
    // Cantidad
    const qtySpan = document.createElement("span");
    qtySpan.textContent = product.quantity;
    qtySpan.style.margin = "0 0px";
    // Botón +
    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.title = "Agregar uno";
    plusBtn.style.marginLeft = "6px";
    plusBtn.style.cursor = "pointer";
    plusBtn.onclick = function () {
      addCartItem(
        Object.keys(
          products.find((p) => (p.code === product.indexes ? p.code : null)),
        )[0] || product.indexes[0],
      );
      refresh();
    };
    // Usar el código directamente
    plusBtn.onclick = function () {
      addCartItem(
        product.indexes.length > 0
          ? products.find((p) => p.name === product.name).code
          : null,
      );
      refresh();
    };

    quantityCell.appendChild(minusBtn);
    quantityCell.appendChild(qtySpan);
    quantityCell.appendChild(plusBtn);

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${product.price.toFixed(2)}`;
    priceCell.style.textAlign = "right";
    priceCell.style.padding = "8px";

    // Celda vacía para mantener el diseño
    const emptyCell = document.createElement("td");
    emptyCell.style.padding = "8px";

    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(emptyCell);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  summaryList.appendChild(table);
}

// Llama a updateCartSummary cada vez que se actualiza el carrito
function showCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
  });
  updateCartSummary();
  updateCartTotal();
  updateCartSummary();
}

// Escuchar el evento de clic en el botón "Add Cart"

function showProductAddedModal() {
  // Crear el modal si no existe
  let modal = document.getElementById("productAddedModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "productAddedModal";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.background = "#fff";
    modal.style.padding = "20px 40px";
    modal.style.border = "1px solid #ccc";
    modal.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
    modal.style.zIndex = "1000";
    modal.style.fontSize = "1em";
    modal.style.borderRadius = "8px";
    modal.style.display = "none";
    modal.textContent = "💥 Producto agregado";
    document.body.appendChild(modal);
  }
  modal.style.display = "block";
  setTimeout(() => {
    modal.style.display = "none";
  }, 1200);
}

// Modificar el evento del botón para mostrar el modal
document.getElementById("buttonCart1").addEventListener("click", function () {
  addCartItem(this.value);
  showProductAddedModal();
  //showCart();
  refresh();
});
document.getElementById("buttonCart2").addEventListener("click", function () {
  addCartItem(this.value);
  showProductAddedModal();
  //showCart();
  refresh();
});
document.getElementById("buttonCart3").addEventListener("click", function () {
  addCartItem(this.value);
  showProductAddedModal();
  //showCart();
  refresh();
});
document.getElementById("buttonCart4").addEventListener("click", function () {
  addCartItem(this.value);
  showProductAddedModal();
  //showCart();
  refresh();
});

function refresh() {
  updateCartSummary();
  updateCartTotal();
}

// modal aboutus
document.getElementById("aboutUs").addEventListener("click", function () {
  // Crear el modal si no existe
  let aboutModal = document.getElementById("aboutUsModal");
  if (!aboutModal) {
    aboutModal = document.createElement("div");
    aboutModal.id = "aboutUsModal";
    aboutModal.style.position = "fixed";
    aboutModal.style.top = "50%";
    aboutModal.style.left = "50%";
    aboutModal.style.transform = "translate(-50%, -50%)";
    aboutModal.style.background = "#fff";
    aboutModal.style.padding = "24px 36px";
    aboutModal.style.border = "1px solid #ccc";
    aboutModal.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
    aboutModal.style.zIndex = "1000";
    aboutModal.style.fontSize = "1em";
    aboutModal.style.borderRadius = "10px";
    aboutModal.style.display = "none";
    // Cerrar botón
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✖";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "8px";
    closeBtn.style.right = "12px";
    closeBtn.style.background = "transparent";
    closeBtn.style.border = "none";
    closeBtn.style.fontSize = "1.2em";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = function () {
      aboutModal.style.display = "none";
    };
    aboutModal.appendChild(closeBtn);

    // Contenido
    const content = document.createElement("div");
    content.style.marginTop = "16px";
    content.textContent =
      "We are a leading music store dedicated to providing high-quality instruments and exceptional customer service. Our mission is to inspire musicians of all levels to pursue their passion for music.";
    aboutModal.appendChild(content);

    document.body.appendChild(aboutModal);
  }
  aboutModal.style.display = "block";
});

function getDolar() {
  let diammanoApi = new Date().toISOString().split("T")[0];
  // Formatear la fecha como dd-mm-yyyy
  let [yyyy, mm, dd] = diammanoApi.split("-");
  diammanoApi = `${dd}-${mm}-${yyyy}`;

  console.log("MIFECHA " + diammanoApi);

  let getDolarApi = new XMLHttpRequest();
  getDolarApi.open("GET", "https://mindicador.cl/api/dolar/" + diammanoApi);

  getDolarApi.onreadystatechange = function () {
    if (this.readyState === 4 && this.status == 200 && this.responseText) {
      try {
        let dolarData = JSON.parse(this.responseText);
        console.log(dolarData);
        if (dolarData.serie && dolarData.serie.length > 0) {
          let dolarOficial = dolarData.serie[0].valor;
          document.getElementById("dolar-valor").textContent =
            `Dólar Oficial: $${dolarOficial}`;
        } else {
          document.getElementById("dolar-valor").textContent =
            "Dólar Oficial: No disponible";
        }
      } catch (e) {
        console.error("Error parsing JSON:", e);
        document.getElementById("dolar-valor").textContent =
          "Dólar Oficial: Error al obtener datos";
      }
    }
  };
  getDolarApi.send();
}

document.addEventListener("DOMContentLoaded", function () {
  getDolar();
});
