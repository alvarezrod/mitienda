<template>
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
          v-for="item in resumen"
          :key="item.id"
        >
          <div class="d-flex align-items-center">
            <img
              :src="item.imagen"
              :alt="item.nombre"
              style="
                width: 50px;
                height: 50px;
                object-fit: cover;
                margin-right: 15px;
              "
              class="rounded"
            />
            <div>
              <strong>{{ item.nombre }}</strong>
              <p class="mb-0">Qty: {{ item.cantidad }}</p>
            </div>
          </div>
          <div class="text-end">
            <span class="badge bg-primary rounded-pill me-2"
              >${{ item.total.toFixed(2) }}</span
            >
            <button class="btn btn-sm btn-success" @click="addToCart(item)">
              Add
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteFromCart(item)">
              Remove
            </button>
          </div>
        </li>
      </ul>
      <hr />
      <strong>Total: </strong>
      <span class="badge bg-success rounded-pill">${{ total.toFixed(2) }}</span>

      <hr />
      <button class="btn btn-primary w-100 mb-2">Pay</button>
      <button
        class="btn btn-danger w-100"
        @click="openModal"
        v-if="total.toFixed(2) > 0"
      >
        Clear Cart
      </button>
    </div>
  </div>
  <!-- Modal for cart confirmation -->
  <div
    class="modal fade"
    id="confirmClearModal"
    tabindex="100"
    aria-labelledby="confirmClearLabel"
    aria-hidden="true"
    @show="alert('¿Estás seguro de que deseas vaciar el carrito?')"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmClearLabel">Clear Cart</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div class="modal-body">
          Are you sure you want to clear your cart? This action cannot be
          undone.
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="cleanCart"
            data-bs-dismiss="modal"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "CartProduct",
  props: {
    product: Object,
  },
  data() {
    return {
      cartItems: [],
      showmodal: ref(false),
      voucher: {
        product: Object,
        quantity: Number,
        total: Number,
      },
    };
  },
  computed: {
    total() {
      console.log(
        "Calculating total carrito $" + this.$store.getters.totalCarrito,
      );
      return this.$store.getters.totalCarrito;
    },
    resumen() {
      return this.$store.getters.resumenProductos;
    },
    totalProductos() {
      return this.$store.getters.totalporProducto;
    },
  },
  methods: {
    openModal() {
      const modalEl = document.getElementById("confirmClearModal");
      console.log("Abriendo modal de confirmación...  -->>  ", modalEl);
      const modal = new Modal(modalEl);
      modal.show();
    },
    addToCart(product) {
      this.$store.dispatch("agregarProducto", product);
      this.total; // Actualiza el total después de agregar un producto
      console.log("Producto agregado al carrito:", product);
    },
    deleteFromCart(product) {
      this.$store.dispatch("deleteProducto", product);
      this.total; // Actualiza el total después de eliminar un producto
      console.log("Producto eliminado del carrito:", product);
      // this.calculateTotal();
    },
    cleanCart() {
      console.log("Limpiando carrito...");

      this.$store.dispatch("vaciarCarrito");
      this.total; // Actualiza el total después de vaciar el carrito
      this.showmodal = false;
    },
    createVoucher() {
      const voucher = {
        product: this.cartItems.map((item) => item.nombre).join(", "),
        quantity: this.cartItems.reduce(
          (total, item) => total + item.cantidad,
          0,
        ),
        total: this.total,
      };
      console.log("Voucher creado:", voucher);
      this.voucher = voucher;
      // Aquí podrías enviar el voucher a un servicio o almacenarlo según tus necesidades
    },
  },
};
</script>
