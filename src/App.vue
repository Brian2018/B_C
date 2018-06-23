<template>
  <div id="app">
   
    <keep-alive>  
      <transition name="slide-fade">   
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </transition>
    </keep-alive>       
    <transition name="slide-fade">   
      <router-view v-if="!$route.meta.keepAlive"></router-view>    
    </transition>
  </div>  
</template>
<style>
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.black{
  width: 100%;
  height: 100%;
  opacity:0.6;
  background:#000000;
  position: fixed;
  top: 0;
  left:0;
}
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .1s ease;;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}
</style>
