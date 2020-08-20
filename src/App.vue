<template>
  <div id="app">
    <proposals></proposals>
  </div>
</template>

<script>
import Proposals from './components/Proposals'

export default {
  name: 'app',
  components: {
    Proposals
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
