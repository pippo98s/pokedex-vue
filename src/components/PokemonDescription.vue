<template>
  <div id="description">
    <section id="header">
      <h1> {{name}} # {{index}}</h1>
    </section>
    <section id="main-info">
      <div id="left-side">
        <img :src="img" :alt="name">
      </div>
      <div id="right-side">
        <ul>
          <li class="stat-item" v-for="(value ,index ) in pokemon.stats" :key="'value'+index">
            <p class="stat-name">{{value.stat.name}} :</p> 
            <p class="stat-value">{{value.base_stat}}</p>
          </li>
        </ul>
        <ul class="types-list">
          <li :class="value.type.name" class="type-item" v-for="(value ,index ) in pokemon.types" :key="'value'+index">
            {{ value.type.name}}
          </li>

        </ul>
      </div>
    </section>
    
  </div>
</template>

<script>
export default {
  name:'Desci',
  data(){
    return{
      pokemon: []
    }
  },
  props:{
    name:{
      type: String,
      required: true
    },
    img:{
      type: String,
      required: true
    },
    index:{
      type: String,
      required: true
    },
    url:{
      type: String,
      required: true
    }
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){
      this.$axios
    .get(this.url)
    .then(res => {
      this.pokemon = res.data;
    })
    }
  }
}
</script>

<style lang="scss" scoped>
#description{
  margin-top: 30px;
}

#header{
  background: #fff;
  text-align: center;
  text-transform: capitalize;
  padding: 10px 0;
  border: 3px solid #000;
  border-bottom: 1.5px solid #000;
}
#main-info{
  display: flex;
  padding-bottom: 20px;
  @media screen and (max-width: 568px) {
    display: block;
  }
  #left-side,
  #right-side{
    width: 50%;
    background-color: #fff;
    border: 3px solid #000;
    @media screen and (max-width: 568px) {
      width: 100%;
    }
  }
  #left-side{
    text-align: center;
    border-top: 1.5px solid #000;
    border-right: 1.5px solid #000;
    img{
      width: 200px;
      margin: 10px 0;
    }
  }
  #right-side{
    border-top: 1.5px solid #000;
    border-left: 1.5px solid #000;
    ul{
      list-style-type: none;
      .stat-item{
        display: flex;
        justify-content: space-between;
        padding: 5px;
      }
      .stat-name{
        text-transform: capitalize;
      }
    }
    .types-list{
      display: flex;
      justify-content: space-around;
      padding-top: 10px;
      @media screen and (max-width: 568px) {
        padding-bottom: 10px;
      }
      .type-item{
        padding: 5px;
        border: 1px solid #000;
        border-radius: 10px;
        text-transform: capitalize;
      }
      .normal{
        background-color: #808080;
      }
      .grass{
        background-color: #008000;
      }
      .poison{
        background-color: #800080;
      }
      .fighting{
        background-color: #C03028;
      }
      .flying{
        background-color: #A890F0;
      }
      .ground{
        background-color: #E0C068;
      }
      .rock{
        background-color: #B8A038;
      }
      .bug{
        background-color: #A8B820;
      }
      .ghost{
        background-color: #705898;
      }
      .steel{
        background-color: #B8B8D0;
      }
      .fire{
        background-color: #F08030;
      }
      .water{
        background-color: #6890F0;
      }
      .electric{
        background-color: #F8D030;
      }
      .psychic{
        background-color: #F85888;
      }
      .ice{
        background-color: #98D8D8;
      }
      .dragon{
        background-color: #7038F8;
      }
      .dark{
        background-color: #705848;
      }
      .fairy{
        background-color: #EE99AC;
      }
      .unknown{
        background-color: #68A090;
      }
      .shadow{
        background-color: rgb(58, 62, 114);
      }
    }
  }
}
</style>