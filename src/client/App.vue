<template>
  <div id="app">
    <div v-if="$route.meta.showframe">
        <loadheader></loadheader>
        <router-view></router-view>
   </div>
    <div  v-if="!$route.meta.showframe">
      <loadlogin></loadlogin>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  #app {
  margin: 0px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #f5f5f5;
  overflow: hidden;
  font-size: 14px;
}
a,a:hover,a:link,a:visited,a:active{
  text-decoration:none;
  out-line: none;
  color: #000000;
}
a:hover{
  color:#2ca543;
}
  em{
    font-style: normal;
  }
  ul{
    padding: 0;
    margin: 0;
  }
  ul li{
    list-style: none;
  }
</style>
