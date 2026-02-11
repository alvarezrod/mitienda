<template>
  <div id="dolar-valor" class="p-2 bg-warning text-dark text-center"></div>

  <!-- BOTÓN PARA CANVAS OFF -->
  <div class="container-fluid bg-secondary text-white p-2">
    <button
      class="btn btn-warning"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
    >
      ☰ Cart
    </button>
    <a href="#" id="aboutUs" class="btn btn-light ms-2">About Us</a>
    <a href="#" id="login" class="btn btn-light ms-2">Login/Register</a>
  </div>

  <!-- OFFCANVAS DERECHO -->
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
    style="width: 70%"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">Cart Shopping</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>

    <div class="offcanvas-body">
      <p>Your order summary:</p>
      <ul class="list-group mb-3" id="summary">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        ></li>
        <div
          class="d-flex justify-content-between align-items-center mb-3"
        ></div>
      </ul>
      <strong>Total</strong>
      <span class="badge bg-success rounded-pill" id="cart-total">$0</span>
      <hr />
      <button class="btn btn-primary w-100">Pay</button>
    </div>
  </div>
</template>
