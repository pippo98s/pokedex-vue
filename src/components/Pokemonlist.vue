<template>
  <div id="pokemons-list">
    <ul>
      <PokemonItem v-for='pokemon in pokemons' 
                    :key='pokemon.name'
                    :index='pokemon.index'
                    :img='pokemon.img'
                    :name='pokemon.name'
                    :url='pokemon.url'
      />
      <li v-if='!show' v-on:click="test" id="show-more" >
          Show more 
      </li>
      <li v-show="next !== null && show" class="trigger">
        <Trigger @triggerIntersected='loadMore'/>
      </li>
      
    </ul>
    
  </div>
</template>

<script>
import PokemonItem from "./PokemonItem";
import Trigger from "./Trigger";

export default {
  name: 'PokemonList',
  components:{
    PokemonItem,
    Trigger
  },
  data(){
    return{
      pokemons: [],
      oldImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      newImg: 'https://pokeres.bastionbot.org/images/pokemon/',
      next: '',
      show: false
    }
  },
  created(){
    this.$axios
    .get("https://pokeapi.co/api/v2/pokemon/")
    .then(res => {
      this.next = res.data.next;
      this.getData(res);
    })
  },
  methods: {

    loadMore(){
      if(this.next == undefined){
        this.next = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'
      }
      this.$axios
      .get(this.next)
      .then(res => {
        this.next = res.data.next;
        if (res.data.results !== undefined){
          this.getData(res);
        }
      })
    },
    getData(res){
      res.data.results.forEach(pokemon => {
        pokemon.id = pokemon.url.split('/')
                    .filter(function (string) { return !!string })
                    .pop();

        pokemon.img = this.newImg + pokemon.id + '.png';

        if (pokemon.id <= 807){

          this.pokemons.push(pokemon);
          pokemon.index = pokemon.id;
          if(pokemon.id < 100){
            if (pokemon.index < 10) {
            pokemon.index = '00' + pokemon.index
            } else {
            pokemon.index = '0' + pokemon.index
            }
          } 
        } else{
          this.next = null;
        }
      });
    },
    test(){
      this.show = true;
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>


#pokemons-list ul{
  display: grid;
  grid-template-columns: repeat(auto-fit , minmax(150px,1fr));
  grid-gap: 10px;
  width: 100%;
  max-width: 1595px;
  margin: 40px auto;
  list-style-type: none;
  padding: 0 5px;
}

#show-more{
  line-height: 160px;
    text-align: center;
    padding: 10px;
    background-color: #356abc;
    color: #ffcd00;
    border-radius: 20px;
    cursor: pointer;
}
.trigger{
  text-align: center;
  padding: 10px 0;
  border-radius: 20px;
  background-color: white;
}



</style>
