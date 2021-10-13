<template>
  <li class="pokemon-box">
    <router-link :to="{
                          name: 'pokemon',
                          params:{
                            name:Name,
                            id:Id,
                          }
                        }">
        <p>#{{ Index}}</p> 
        <p class="pokemon-name">{{Name}}</p>  
        <img :src="Img" alt="pokemon img" class="poke-img" @error='imgCheck'>
      </router-link>
  </li>
</template>

<script>
import notImg from '../assets/notImg.png'
export default {
  name: 'PokemonItem',
  props: {
    index : String,
    img : String,
    name : String,
    id: String
  },
  data(){
    return{
      Index : this.index,
      Img : this.img,
      Name : this.name,
      notImg: notImg,
      Id: this.id
    }
  },
  methods:{
    imgCheck(){
      this.Img = this.notImg;
    }
  }
}
</script>

<style scoped>
.pokemon-box{
  text-align: center;
  height: 200px;
  min-height: 200px;
  padding: 10px 0;
  border-radius: 20px;
  background-color: white;
}
.poke-img{
  width:  100px;
  height: 100px;
  margin-top: 20px;
}
.pokemon-name{
  text-transform: capitalize;
  padding-top: 5px;
}
</style>