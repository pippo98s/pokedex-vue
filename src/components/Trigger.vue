<template>
  <span class="trigger" ref='trigger'>
    <p>
      loading
      <span class="dot">.</span>
      <span class="dot">.</span>
      <span class="dot">.</span>
    </p>
    <i class="fas fa-circle-notch"></i>
  </span>
</template>

<script>
export default {
  props:{
    options:{
      type: Object,
      default: () => ({
        root: null,
        threshold: "0",
      })
    }
  },
  data(){
    return{
      observer : null
    }
  },
  mounted(){
    this.observer = new IntersectionObserver(this.observerHandler, this.options)

    const elements = document.querySelectorAll('.trigger')

    elements.forEach(element => {
      this.observer.observe(element)
    })
  },
  destroyed(){
    this.observer.disconnect();
  },
  methods:{
    observerHandler(entries) {
      for (const entry of entries) {
        this.handleIntersect(entry)
      }
    },
    handleIntersect(entry){
      if (entry.intersectionRatio > 0) this.$emit("triggerIntersected")
    }
  }
}
</script>

<style lang='scss' scoped>

.trigger{
  position: relative;
  text-align: center;
  height: 200px;
  min-height: 200px;
  padding: 10px 0;
  border-radius: 20px;
  background-color: white;
  i{
    font-size: 60px;
    margin-top: 20px;
    animation: loading 1s infinite linear;
  }
  @keyframes loading {
    from {transform:rotate(-360deg);}
    to {transform:rotate(0deg);}
  }
  p{
    margin-top: 20px;
    text-transform: capitalize;
  }
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

</style>