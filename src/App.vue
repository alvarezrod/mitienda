<template>
  <nav>
    <router-link to="/">Lista Productos</router-link> |
    <router-link to="/sobre-nosotros">Sobre Nosotros</router-link>
  </nav>
  <div><NavMusic /></div>
  <div>
    <NavMusicTool />
  </div>
  <router-view />
</template>

<script>
import NavMusicTool from "./views/NavMusicTool.vue";
import NavMusic from "./views/NavMusic.vue";

export default {
  name: "App",
  components: {
    NavMusicTool,
    NavMusic,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
