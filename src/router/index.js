import { createRouter, createWebHistory } from "vue-router";
import ListaProductos from "../views/ListaProductos.vue";
import NoEncontrado from "../views/NoEncontrado.vue";

const routes = [
  {
    path: "/sobre-nosotros",
    name: "SobreNosotros",
    component: () => import("../views/SobreNosotros.vue"),
  },
  {
    path: "/detalle-producto/:id",
    name: "DetalleProducto",
    props: true,
    component: () => import("../views/DetalleProducto.vue"),
  },
  {
    path: "/",
    name: "ListaProductos",
    component: ListaProductos,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NoEncontrado",
    component: NoEncontrado,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
