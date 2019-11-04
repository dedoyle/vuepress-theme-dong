<template>
  <div id="global-layout" class="global-layout">
    <Header/>
    <DefaultGlobalLayout/><br>
    <!-- <footer style="background-color: #DDD"><a href="https://github.com/ulivz/70-lines-of-vuepress-blog-theme">Github</a> · Powered by VuePress</p></footer> -->
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import GlobalLayout from '@app/components/GlobalLayout.vue'
  
  export default {
    components: {
      DefaultGlobalLayout: GlobalLayout,
      Header
    },
  }
</script>

<style lang="stylus">
  .global-layout
    max-width 780px
    padding 0 16px
    box-sizing border-box
    margin 0 auto
    background-color #FFF
</style>