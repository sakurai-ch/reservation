<template>
  <div id="app">
    <Header></Header>
    <router-view class="main"></router-view>
    <!-- <router-view/> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Header,
    Footer,
  },
    data(){
    return{
      header_data:{
        auth : false,
      },
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  min-height: 100vh;
  position: relative;
  padding-bottom: 120px;
  box-sizing: border-box;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.main{
  width:900px;
  margin: auto;
}
</style>
