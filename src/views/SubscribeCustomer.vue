<template>
  <div
    class="modal fade"
    id="suscriberModal"
    tabindex="-1"
    aria-labelledby="suscriberModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-warning">
          <h5 class="modal-title" id="suscriberModalLabel">Suscribirse</h5>
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
              pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
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

          <div class="mb-3">
            <label class="form-label text-start d-block" for="modalRePassword"
              >Repetir Password</label
            >
            <input
              class="form-control"
              type="password"
              id="modalRePassword"
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
      const modal = document.getElementById("suscriberModal");
      if (modal) {
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
      }
    },
    closeModal() {
      // Quitar el foco de cualquier elemento dentro del modal
      const focusedElement = document.activeElement;
      if (focusedElement && focusedElement.closest("#suscriberModal")) {
        focusedElement.blur();
      }

      const modal = document.getElementById("suscriberModal");
      if (modal) {
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      }
    },

    async storeCustomerData() {
      const name = document.getElementById("modalName").value;
      const email = document.getElementById("modalEmail").value;
      const password = document.getElementById("modalPassword").value;
      const rePassword = document.getElementById("modalRePassword").value;

      if (password !== rePassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      const id = email;

      const existingUser = await this.$store.dispatch("user/getUser", id);

      //console.log("Existing user:", existingUser);

      if (existingUser) {
        alert("El usuario ya existe");
        return;
      } else {
        this.$store.dispatch("user/addUser", { name, email, password, id });
        localStorage.setItem("customerName", name);
        localStorage.setItem("customerEmail", email);
        localStorage.setItem("customerPassword", password);
        NavMusic.methods.loadUserData(name, email);
      }

      // Quitar foco antes de cerrar
      const focusedElement = document.activeElement;
      if (focusedElement && focusedElement.closest("#suscriberModal")) {
        focusedElement.blur();
      }

      this.closeModal();
    },
  },
};
</script>
