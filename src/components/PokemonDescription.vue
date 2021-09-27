<template>
  <div id="container">
    <div id="description" v-if="flavorCheck && evolutionCheck">
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
      <section id="definition">
        <p>{{flavorText[0]}}</p>
      </section>
      <section id="evolution-chain">
        <h2>Evolution chain</h2>
        <div id='flex-container'>
          <div id="base">
            <router-link :to="{
                            name: 'pokemon',
                            params:{
                              name:base.name,
                              img:base.img,
                              index:base.index,
                              url:base.link
                            }
                          }">
              <img :src="base.img" :alt="base.name" @error='imgCheck'>
              <h2>{{base.name}}</h2>
            </router-link>
          </div>
          <div v-if="secondCheck" class="arrow-container">
            <i class="fas fa-chevron-right right"></i>
            <i class="fas fa-chevron-down down"></i>
          </div>
          <div v-if="secondCheck" id="second">
            <div v-for='pokemon in second' :key='pokemon.name'>
              <router-link :to="{
                            name: 'pokemon',
                            params:{
                              name:pokemon.name,
                              img:pokemon.img,
                              index:pokemon.index,
                              url:pokemon.link
                            }
                          }">
              <img :src="pokemon.img" :alt="pokemon.name" @error='imgCheck'>
              <h2 >{{pokemon.name}}</h2>
              <p v-if="pokemon.minLevel !== null">
                min lv. {{pokemon.minLevel}}
              </p>
              <p v-if="pokemon.item !== null">
                {{pokemon.item.name}}
              </p>
            </router-link>
            </div>
          </div>
          <div v-if="thirdCheck" class="arrow-container">
            <i class="fas fa-chevron-right right"></i>
            <i  class="fas fa-chevron-down down"></i>
          </div>
          <div v-if="thirdCheck" id="third">
            <div v-for='pokemon in third' :key='pokemon.name'>
              <router-link :to="{
                            name: 'pokemon',
                            params:{
                              name:pokemon.name,
                              img:pokemon.img,
                              index:pokemon.index,
                              url:pokemon.link
                            }
                          }">
              <img :src="pokemon.img" :alt="pokemon.name" @error='imgCheck'>
              <h2 >{{pokemon.name}}</h2>
              <p v-if="pokemon.minLevel !== null">
                min lv. {{pokemon.minLevel}}
              </p>
              <p v-if="pokemon.item !== null">
                {{pokemon.item.name}}
              </p>
            </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div id="loading-data" v-if="!flavorCheck || !evolutionCheck">
      <p>
        loading
        <span class="dot">.</span>
        <span class="dot">.</span>
        <span class="dot">.</span>
      </p>
    </div>
  </div>
</template>

<script>
import notImg from '../assets/notImg.png'
export default {
  name:'Desci',
  data(){
    return{
      pokemon: [],
      flavorText:[],
      base: [],
      second: [],
      secondCheck: false,
      third: [],
      thirdCheck: false,
      notImg: notImg,
      // check load rest data
      flavorCheck: false,
      evolutionCheck: false,
      oldImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      newImg: 'https://pokeres.bastionbot.org/images/pokemon/'
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
    this.scrollToTop();
  },
  methods: {
    getData(){
      this.$axios
      .get(this.url)
      .then(res => {
        this.pokemon = res.data;

        this.getFlavorText(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemon.id}`);

        this.$axios
        .get(this.pokemon.species.url)
        .then(res => {

          this.$axios
          .get(res.data.evolution_chain.url)
          .then(res => {

            const data = res.data.chain;
            this.base = data.species;
            const index= this.getIndex(this.base.url);
            this.helperEvolution(data.species,
                            index,
                            data.evolution_details[0],
                            data.evolution_details[0]
            );
            
            if(data.evolves_to[0] !== undefined)
            {
              data.evolves_to.forEach(element => {
                const index = this.getIndex(element.species.url);
                this.helperEvolution( element.species,
                                      index,
                                      element.evolution_details[0].min_level,
                                      element.evolution_details[0].item
                );
                this.secondCheck = true;
                this.second.push(element.species);
              });
              

              if(data.evolves_to[0].evolves_to[0] !== undefined)
              {
                data.evolves_to[0].evolves_to.forEach(element => {
                  const index = this.getIndex(element.species.url);
                  this.helperEvolution( element.species,
                                        index,
                                        element.evolution_details[0].min_level,
                                        element.evolution_details[0].item
                  );
                  this.thirdCheck = true;
                  this.third.push(element.species);
                });
              }
            }
            this.evolutionCheck = true;
          })
        })
      })
    },
    getFlavorText(url){
      this.$axios
      .get(url)
      .then(res => {
        let check = false;
        res.data.flavor_text_entries.forEach(text => {
          if(text.language.name === 'en' && check == false){
            this.flavorText.push(text.flavor_text);
            this.flavorCheck = true;
            check = true;
          }
        });
      })
    },
    getIndex(url){
      const index = url.split('/')
          .filter(function (string) { return !!string })
          .pop();
      return index;
    },
    helperEvolution(element , index , min_level , _item){
      element.id= index;
      element.index = index;
      element.img = `${this.oldImg}${index}.png`;
      element.link = `https://pokeapi.co/api/v2/pokemon/${index}/`;

      if(min_level !== undefined && _item !== undefined){
        element.minLevel = min_level;
        element.item = _item;
      }
      
      if(index < 100){
        if (element.index < 10) {
          element.index = '00' + index;
        } else {
          element.index = '0' + index;
        }
      }
    },
    imgCheck(e){
      e.target.src = this.notImg;
    },
    scrollToTop() {
      window.scrollTo(0,0);
    }
  }
}
</script>

<style lang="scss" scoped>
#container{
  max-width: 1595px;
  margin: auto;
}

#description{
  margin: 30px 0;
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
    border-right: 1.5px solid;
    border-bottom: 1.5px  solid;
    img{
      width: 200px;
      margin: 10px 0;
    }
  }
  #right-side{
    border-top: 1.5px solid;
    border-left: 1.5px solid;
    border-bottom: 1.5px solid;
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
    }
  }
}
#definition{
  background-color: #fff;
  padding: 20px 10px;
  border: 3px solid #000;
  border-top: 1.5px solid;
  border-bottom: 1.5px solid;
}

#evolution-chain{
  text-align: center;
  background-color: #fff;
  border: 3px solid #000;
  border-top: 1.5px solid;
  padding-bottom: 10px;
  img{
    width: 200px;
    @media screen and (max-width: 912px) {
      width: 150px;
    }
  }
  > h2{
    color: #008000;
  }
  h2{
    padding: 20px 0;
  }
  #flex-container{
    display: flex;
    justify-content: space-around;
    @media screen and (max-width: 680px){
      flex-direction: column;
    }
    #base,
    #second,
    #third{
      align-self: center;
    }
    #second div,
    #third div{
      margin-bottom: 20px;
    }
    div h2{
      text-transform: capitalize;
    }
    .arrow-container{
      position: relative;
      i{
        font-size: 40px;
        @media screen and (min-width: 680px){
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        @media screen and (max-width: 680px){
          margin: 15px 0;
        }
      }
      .right{
        @media screen and (max-width: 680px){
          display: none;
        }
      }
      .down{
        display: none;
        @media screen and (max-width: 680px){
          display: inline-block;
        }
      }
    }
  } 
}
#loading-data{
  text-align: center;
  background: #fff;
  padding: 50px 0;
  margin: 40px auto;
  width: 165px;
  border-radius: 20px;
  .dot{
    animation: dot 1s infinite linear;
  }
  @keyframes dot {
    from{ opacity: 0;}
    to{opacity: 1;}
  }
  .dot:nth-child(2){
    animation-delay: 0.25s;
  }
  .dot:nth-child(3){
    animation-delay: 0.50s;
  }
}
// type class
.bug{
  background-color: #A8B820;
}
.dark{
  background-color: #705848;
}
.dragon{
  background-color: #7038F8;
}
.electric{
  background-color: #F8D030;
}
.fairy{
  background-color: #EE99AC;
}
.fighting{
  background-color: #C03028;
}
.fire{
  background-color: #F08030;
}
.flying{
  background-color: #A890F0;
}
.ghost{
  background-color: #705898;
}
.grass{
  background-color: #008000;
}
.ground{
  background-color: #E0C068;
}
.ice{
  background-color: #98D8D8;
}
.normal{
  background-color: #808080;
}
.poison{
  background-color: #800080;
}
.psychic{
  background-color: #F85888;
}
.rock{
  background-color: #B8A038;
}
.shadow{
  background-color: #3a3e72;
}
.steel{
  background-color: #B8B8D0;
}
.unknown{
  background-color: #68A090;
}
.water{
  background-color: #6890F0;
}
</style>