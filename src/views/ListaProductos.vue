<template>
  <div class="row justify-content-center">
    <TarjetaProducto
      class="col-4 m-2"
      v-for="producto in productos"
      :key="producto.id"
      :producto="producto"
    />
  </div>
  <div class="d-flex justify-content-center">
    <div class="paginacion">
      <router-link
        id="page-prev"
        :to="{ name: 'ListaProductos', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'ListaProductos', query: { page: page + 1 } }"
        rel="next"
        v-if="totalPaginasSiguientes"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
import TarjetaProducto from "@/components/TarjetaProducto.vue";
import ServiciosProductos from "@/servicios/ServiciosProductos.js";
import { watchEffect } from "vue";

export default {
  name: "ListaProductos",

  components: {
    TarjetaProducto,
  },
  props: ["page"],
  
  data() {
    return {
      productos: null,
      totalProductos: 0,
    };
  },
  computed: {
    totalPaginasSiguientes() {
      var totalPaginas = Math.ceil(this.totalProductos / 5);
      console.log("totalPaginas:", totalPaginas);

      return this.page < totalPaginas;
    },
  },
  created() {
    
    watchEffect(() => {
      this.productos = null;
      ServiciosProductos.obtenerProductos(5, this.page)
        .then((response) => {
          this.productos = response.data;
          this.totalProductos = (response.headers["x-total-count"]);
          
          console.log("total--- Productos:", this.totalProductos);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  
};
</script>

<style>
.paginacion {
  display: flex;
  width: 290px;
}
.paginacion a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
</style>
