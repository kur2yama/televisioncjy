<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body, a, img, div, p, span, ol, ul, li, h1, h2, h3, h4, h5, h6 {
  margin: 0px;
  padding: 0px;
  border: 0px;
  outline: 0px;
  list-style: none;
  font: inherit;
}

body {
  font-size: 20px;
  background: #000000;
  color: #666666;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
}
</style>
