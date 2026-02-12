<template>
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-warning">
          <h5 class="modal-title" id="loginModalLabel">Login</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label text-start d-block" for="modalName"
              >Nombre</label
            >
            <input class="form-control" type="text" id="modalName" required />
          </div>

          <div class="mb-3">
            <label class="form-label text-start d-block" for="modalEmail"
              >Email</label
            >
            <input
              class="form-control"
              type="email"
              id="modalEmail"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label text-start d-block" for="modalPassword"
              >Password</label
            >
            <input
              class="form-control"
              type="password"
              id="modalPassword"
              required
            />
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            id="modalLoginBtn"
            @click="storeCustomerData"
          >
            Ingresar
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            id="modalCloseBtn"
            @click="closeModal"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import NavMusic from "./NavMusic.vue";

export default {
  name: "SubscribeCustomer",
  NavMusicTool: null,

  methods: {
    openModal() {
      const modal = document.getElementById("loginModal");
      if (modal) {
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
      }
    },
    closeModal() {
      // Quitar el foco de cualquier elemento dentro del modal
      const focusedElement = document.activeElement;
      if (focusedElement && focusedElement.closest("#loginModal")) {
        focusedElement.blur();
      }

      const modal = document.getElementById("loginModal");
      if (modal) {
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      }
    },

    storeCustomerData() {
      const name = document.getElementById("modalName").value;
      const email = document.getElementById("modalEmail").value;
      const password = document.getElementById("modalPassword").value;

      // Validate email format
      const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
      if (!name || !email || !password) {
        alert("Todos los campos son requeridos");
        return;
      }
      if (!emailPattern.test(email)) {
        alert("Por favor ingresa un email válido");
        return;
      }

      localStorage.setItem("customerName", name);
      localStorage.setItem("customerEmail", email);
      localStorage.setItem("customerPassword", password);

      // Quitar foco antes de cerrar
      const focusedElement = document.activeElement;
      if (focusedElement && focusedElement.closest("#loginModal")) {
        focusedElement.blur();
      }
      NavMusic.methods.loadUserData(name, email);
      this.closeModal();
    },
  },

};
</script>
