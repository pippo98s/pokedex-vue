<template>
  <div id="app">
    <router-link to='/'>
    <img src="./assets/logo.png" alt="Pokedex logo" id="logo">
    </router-link>
    <transition name="slide" mode='out-in'>
    <router-view/>
    </transition>
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
</style>
