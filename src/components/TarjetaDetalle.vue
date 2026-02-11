<template>
  <div v-if="producto" class="card" style="width: 50%">
    <div class="text-center">
      <img
        :src="fixUrl(producto.imagen)"
        class="card-img-top"
        alt="Producto"
        style="width: 200px; height: 200px"
      />
    </div>

    <div class="card-body">
      <h5 class="card-title">{{ producto.nombre }}</h5>
      <p class="card-text">
        {{ producto.descripcion }}
      </p>
      <router-link to="/">
        <button class="btn btn-primary">Volver</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    producto: Object,
  },
  methods: {
    fixUrl(p) {
      // convierte "./imagenes/xx.jpeg" -> "/imagenes/xx.jpeg"
      if (!p) return "";
      return p.startsWith("./") ? p.replace("./", "/") : p;
    },
  },
};
</script>
