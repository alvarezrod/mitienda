import { createStore } from "vuex";

export default createStore({
  state: {
    carrito: [],
  },
  mutations: {
    setCarrito(state, payload) {
      state.carrito.push({ ...payload });
    },
    eliminarProducto(state, index) {
      state.carrito.splice(index, 1);
    },
    setVaciar(state) {
      state.carrito = [];
    },
  },
  actions: {
    agregarProducto({ commit }, producto) {
      commit("setCarrito", producto);
    },
    deleteProducto({ commit, state }, producto) {
      const index = state.carrito.findIndex((p) => p.id === producto.id);
      if (index !== -1) {
        commit("eliminarProducto", index);
      }
    },
    vaciarCarrito({ commit }) {
      commit("setVaciar");
    },
  },
  getters: {
    totalcantidad(state) {
      return state.carrito.length;
    },
    totalCarrito(state) {
      console.log("Calculando total del carrito:", state.carrito);
      return state.carrito.reduce((acc, prod) => acc + prod.precio, 0);
    },
    imprimirCarrito(state) {
      console.log(
        "Carrito actual:",
        state.carrito.forEach((item) => console.log(item)),
      );

      return state.carrito;
    },
    resumenProductos: (state) => {
      const resumen = state.carrito.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = {
            id: item.id,
            nombre: item.nombre,
            imagen: item.imagen,
            precio: item.precio,
            cantidad: 0,
            total: 0,
          };
        }

        acc[item.id].cantidad++;
        acc[item.id].total += item.precio;

        return acc;
      }, {});

      return Object.values(resumen);
    },
  },
});
