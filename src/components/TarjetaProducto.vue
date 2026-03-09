<template>
  <div class="card" style="width: 18rem">
    <img :src="producto.imagen" class="card-img-top" alt="" />
    <div class="card-body">
      <h5 class="card-title">{{ producto.nombre }}</h5>
      <p class="card-text">
        {{ producto.descripcion }}
      </p>
      <p class="card-text">
        <strong>Precio: ${{ producto.precio }}</strong>
      </p>
      <router-link
        :to="{ name: 'DetalleProducto', params: { id: producto.id } }"
      >
        <a href="#" class="btn btn-primary">Leer mas</a>
      </router-link>
      <button @click="addProductoCarrito" class="btn btn-success mt-2">
        Agregar al carrito
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["addToCart"],
  name: "TarjetaProducto",
  props: {
    producto: Object,
  },

  methods: {
    addProductoCarrito() {
      console.log("PProducto agregado al carrito:", this.producto);
      this.$emit("addToCart", this.producto);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
