import { getDocs, collection, addDoc, query, where } from "firebase/firestore";
import { db } from "@/firebase";

import { useCollection } from "vuefire";

export default {
  namespaced: true,

  state: {
    user: [],
    loading: false,
  },

  // en español lo que viene de fuera como parametro
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOADING(state, estado) {
      state.loading = estado;
    },
  },

  actions: {
    async getUser({ commit }, id) {
      try {
        commit("SET_LOADING", true);

        const q = query(collection(db, "users"), where("id", "==", id));

        const listuser = useCollection(q);

        const data = await listuser.promise.value;

        const salida = data.map((doc) => ({ id: doc.id, ...doc }));

        if (salida.length > 0) {
          return true; // Se encontró un usuario con ese ID
        }

        console.log("User data retrieved successfully:", salida);

        commit("SET_USER", salida);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async validateUser({ commit }, { email, password }) {
      try {
        commit("SET_LOADING", true);
        const q = query(collection(db, "users"), where("email", "==", email));

        const listuser = useCollection(q);

        const data = await listuser.promise.value;

        const salida = data.map((doc) => ({ id: doc.id, ...doc }));

        if (salida.length > 0 && salida[0].password === password) {
          console.log(
            "[validateUser] User data retrieved successfully:",
            salida,
          );
          return salida; // Se encontró un usuario con ese email y contraseña
        }

        return false; // No se encontró un usuario con ese email y contraseña
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addUser({ commit }, userData) {
      try {
        commit("SET_LOADING", true);

        await addDoc(collection(db, "users"), userData);
      } catch (error) {
        console.error("Error adding user:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    settingusers({ commit }) {
      commit("SET_LOADING", true);

      console.log("LLegamos a la acción usuarios");
      try {
        const userCollection = collection(db, "users");
        getDocs(userCollection)
          .then((querySnapshot) => {
            const user = [];
            querySnapshot.forEach((doc) => {
              user.push({ id: doc.id, ...doc.data() });
            });
            commit("SET_USER", user);
            console.log("Users loaded successfully:", user);
          })
          .catch((error) => {
            console.error("Error loading users:", error);
          });
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },

  getters: {
    allProducts: (state) => state.user,
  },
};
