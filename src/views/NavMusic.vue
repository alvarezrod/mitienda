<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 bg-dark text-white p-3">
        <div class="row">
          <div
            class="col-md-6 d-flex align-items-center justify-content-center"
          >
            <h1 class="text-start mb-0">Music Store</h1>
          </div>
          <div
            class="col-md-6 d-flex align-items-center justify-content-center"
          >
            <img
              src="../assets/images/logo/logo.png"
              alt="Logo"
              style="width: 100px; height: auto"
            />
            <div class="ms-3 d-flex flex-column justify-content-center">
              <p class="mb-0 text-start" id="user-logged">
                Usuario:{{
                  this.$store.getters["user/lastUser"]?.name || "No registrado"
                }}
              </p>
              <p class="mb-0 text-start" id="mail-logged">
                Email:{{
                  this.$store.getters["user/lastUser"]?.email || "No registrado"
                }}
              </p>
              <button
                v-if="this.$store.getters['user/lastUser']"
                class="btn btn-sm btn-outline-light mt-2"
                @click="$store.dispatch('user/logoutUser')"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "NavMusic",

  data() {
    return {
      username: ref(""),
      emailuser: ref(""),
    };
  },

  mounted() {
    this.username = localStorage.getItem("username") || "";
    this.emailuser = localStorage.getItem("emailuser") || "";
  },

  methods: {
    loadUserData(username, email) {
      console.log("Loading user data in NavMusic:", username, email);
      this.username = username;
      this.emailuser = email;

      localStorage.setItem("username", username);
      localStorage.setItem("emailuser", email);
    },
  },
};
</script>
