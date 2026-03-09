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
      ☰ Cart ({{ gettotalcarrito }})
    </button>
    <router-link to="/" class="btn btn-light ms-2"
      >Lista de Productos</router-link
    >
    <router-link to="/sobre-nosotros" class="btn btn-light ms-2"
      >About Us</router-link
    >
    <button class="btn btn-light ms-2" @click="showModal">Login</button>
    <SubscribeCustomer ref="subscribeModal" />
    <CartProduct />
  </div>
</template>

<script>
import SubscribeCustomer from "./SubscribeCustomer.vue";
import CartProduct from "@/store/CartProduct.vue";
export default {
  name: "NavMusicTool",

  components: {
    SubscribeCustomer,
    CartProduct,
  },

  data() {
    return {
      localusuario: window.localStorage,

      localstorageEmulator: {
        users: [],
        addUser: function (email, password) {
          this.users.push({ email: email, password: password });
          this.localusuario.setItem("users", JSON.stringify(this.users));
        },
        getUser: function (email) {
          return this.users.find((user) => user.email === email);
        },
        deleteUser: function (email) {
          this.users = this.users.filter((user) => user.email !== email);
          this.localusuario.setItem("users", JSON.stringify(this.users));
        },
      },
    };
  },

  methods: {
    showModal() {
      this.$refs.subscribeModal.openModal();
    },
  },
  computed: {
    gettotalcarrito() {
      return this.$store.getters.totalcantidad;
    },
  },
};
</script>
