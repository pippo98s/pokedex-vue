<template>
  <div id="notFound">
    <blockquote>
      There's a time and place for everything!
      <p>But not now!</p>
    </blockquote>
    <router-link :to='{name: "list"}'>
      home
    </router-link>
  </div>
</template>

<style scoped>
  #notFound{
    margin-top: 150px;
    padding: 0 30px;
    text-align: center;
  }

  blockquote{
    font-size: 35px;
    font-weight: bold;
    color: #fff;
  }
  p{
    margin-top: 15px;
  }
  a{
    text-decoration: none;
    color: #fff;
    margin-top: 50px;
    text-transform: capitalize;
  }
</style>