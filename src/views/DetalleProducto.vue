<template>
  <div v-if="producto" class="row justify-content-center">
    <TarjetaDetalle :producto="producto" />
  </div>
</template>

<script>
import ServiciosProductos from "../servicios/ServiciosProductos.js";
import TarjetaDetalle from "../components/TarjetaDetalle.vue";

export default {
  name: "DetalleProducto",
  components: {
    TarjetaDetalle,
  },
  props: ["id"],
  data() {
    return {
      producto: null,
    };
  },
  created() {
    ServiciosProductos.obtenerProductoId(this.id)
      .then((response) => {
        this.producto = response.data;
        console.log("producto:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
