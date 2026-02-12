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
                Usuario:{{ username }}
              </p>
              <p class="mb-0 text-start" id="mail-logged">
                Email:{{ emailuser }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavMusic",

  data() {
    return {
      username: "",
      emailuser: "",
    };
  },

  methods: {
    loadUserData(username, email) {
      this.username = username;
      this.emailuser = email;
      console.log(
        "User data loaded in NavMusic:",
        this.username,
        this.emailuser,
      );
    },
  },

  mounted() {
    // Cargar datos del localStorage si existen
    const storedName = localStorage.getItem("customerName");
    const storedEmail = localStorage.getItem("customerEmail");
    if (storedName && storedEmail) {
      this.loadUserData(storedName, storedEmail);
    }
  },
};
</script>
