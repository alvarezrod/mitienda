import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";

import { useCollection } from "vuefire";

export default {
  namespaced: true,

  state: {
    products: [],
    loading: false,
  },

  // en español lo que viene de fuera como parametro
  mutations: {
    SET_PRODUCTS(state, productos) {
      state.products = productos;
    },
    SET_LOADING(state, estado) {
      state.loading = estado;
    },
  },

  actions: {
    async setproducts({ commit }) {
      try {
        commit("SET_LOADING", true);
        //const listproducts1 = useCollection(collection(db, "products"));
        const listproducts = useCollection(collection(db, "musicstore"));

        const data = await listproducts.promise.value;

        const salida = data.map((doc) => ({ id: doc.id, ...doc }));

        commit("SET_PRODUCTS", salida);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    settingproducts({ commit }) {
      commit("SET_LOADING", true);

      console.log("LLegamos a la acción");
      try {
        const productsCollection = collection(db, "musicstore");
        getDocs(productsCollection)
          .then((querySnapshot) => {
            const products = [];
            querySnapshot.forEach((doc) => {
              products.push({ id: doc.id, ...doc.data() });
            });
            commit("SET_PRODUCTS", products);
            console.log("Products loaded successfully:", products);
          })
          .catch((error) => {
            console.error("Error loading products:", error);
          });
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },

  getters: {
    allProducts: (state) => state.products,
  },
};
