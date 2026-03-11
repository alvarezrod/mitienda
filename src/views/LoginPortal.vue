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
            <label class="form-label text-start d-block" for="modalEmailLogin"
              >Email</label
            >
            <input
              class="form-control"
              type="email"
              id="modalEmailLogin"
              pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
              required
            />
          </div>

          <div class="mb-3">
            <label
              class="form-label text-start d-block"
              for="modalPasswordLogin"
              >Password</label
            >
            <input
              class="form-control"
              type="password"
              id="modalPasswordLogin"
              required
            />
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            id="modalLoginBtn"
            @click="validateUser"
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
  name: "LoginPortal",
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

    async validateUser() {
      const email = document.getElementById("modalEmailLogin").value;
      const password = document.getElementById("modalPasswordLogin").value;

      console.log(
        "Validando usuario con email: [" +
          email +
          "] y password: [" +
          password +
          "] desde LoginPortal.vue",
      );

      if (email === "" || password === "") {
        alert("Por favor, completa ambos campos.");
        return;
      }

      const checkUser = await this.$store.dispatch("user/validateUser", {
        email,
        password,
      });

      if (checkUser) {
        NavMusic.methods.loadUserData(checkUser[0].name, email);
        // alert("Login exitoso!!!", checkUser[0].name);
        localStorage.setItem("customerName", checkUser[0].name);
        localStorage.setItem("customerEmail", email);
        localStorage.setItem("customerPassword", password);
        console.log("Usuario validado:", checkUser[0].name);
        this.closeModal();
      } else {
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      }

      // Quitar foco antes de cerrar
      const focusedElement = document.activeElement;
      if (focusedElement && focusedElement.closest("#loginModal")) {
        focusedElement.blur();
      }

      this.closeModal();
    },
  },
};
</script>
