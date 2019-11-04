<template>
  <div class="global-header">
      <router-link to="/" class="global-header-logo">{{ $site.title }}</router-link>
      <router-link to="/tag/" class="global-header-sub">标签</router-link>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {}
  }
}
</script>
<style lang="stylus">
  .global-header
    display flex
    line-height 60px
    justify-content space-between
    align-items center

  .global-header-logo
    color $textColor
    text-decoration none
    font-size 40px

  .global-header-sub
    font-size 20px
    color $textColor
    text-decoration none
</style>