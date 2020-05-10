<template>
  <div id="app">
    <router-link to='/'>
    <img src="./assets/logo.png" alt="Pokedex logo" id="logo">
    </router-link>
    <transition name="slide" mode='out-in'>
    <router-view :key="$route.fullPath"/>
    </transition>
    <footer>
        <a href="https://pokeapi.co/" target="_blank">pokeapi.co</a>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang='scss'>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
@font-face {
  font-family: test;
  src: url(./assets/pokemon-font.ttf);
}
body{
  background-color: #515151;
  font-family: test;
}
a{
  display: block;
  margin: auto;
  padding: 0 5px;
  max-width: max-content;
  text-decoration: none;
  color: #000;
  #logo{
    max-width: 100%;
  }
}
.slide-enter-active,
.slide-leave-active{
  // transition: opacity 0.5s linear, transform 0.5s linear;
  transition: opacity .3s ease;
}
.slide-enter,
.slide-leave-to{
  opacity: 0;
  // transform: translateX(-30%);
}

footer{
  position: fixed;
  bottom: 0;
  right: 0;
  a{
    text-decoration: none;
    color: #000;
    padding: 5px 10px;
    background-color: #ff0000;
    border-top-left-radius: 5px;
  }
}
</style>
