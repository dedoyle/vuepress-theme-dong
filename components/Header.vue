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
  @require '../styles/typography.styl'

  .global-header
    display flex
    font-size $fontSizeExtraLarge
    line-height 3
    justify-content space-between
    align-items center
    color $textColor

  .global-header-logo
    color inherit
    text-decoration none

  .global-header-sub
    color inherit
    text-decoration none
    &.router-link-exact-active
      color $accentColor
</style>