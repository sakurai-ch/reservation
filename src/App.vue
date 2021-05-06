<template>
  <div id="app">
    <TheHeader></TheHeader>
    <router-view class="main"></router-view>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
export default {
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>

<style>
*{
margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  min-height: 100vh;
  position: relative;
  padding-top: 82px;
  padding-bottom: 66px;
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

.flex{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-end{
  justify-content:flex-end;
}

.main{
  width:1000px;
  margin: auto;
}

.input-box{
  box-sizing: border-box;
  border: solid 2px #ffc700;
  border-radius: 10px;
  margin:5px 0 5px 15px; 
  height: 45px;
  text-align: center;
}

.input-box-select{
  height: 100%;
  width: 90%;
  border-radius: 20px;
  font-size:14px;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0);
  font-family: initial;
}

.input-box-input{
  width: 90%;
  height: 85%;
  font-size:14px;
  cursor: text;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0);
  font-family: initial;
}

.input-box-button{
  background-color: #ffe454;
  font-size:14px;
  cursor: pointer;
  outline: none;
}

.input-padding{
  width: 88%;
  padding-left: 5px;
}

.input-width390{
  width: 390px;
}

.input-width243{
  width: 243px;
}

.input-width184{
  width: 184px;
}

.input-width122{
  width: 122px;
}

.input-height32{
  height: 32px;
  border-radius: 5px;
}

p{
  font-size:14px;
  cursor:default;
}

@media screen and (max-width : 480px){
  .main{
    width:100%;
  }
}
</style>
