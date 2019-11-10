<template>
  <li class="post-item">
    <router-link class="post-title page-link" :to="page.path"># {{ page.title }}</router-link>
    <div class="post-info">
      <post-time
        class="post-time"
        :last-updated="page.frontmatter.date || page.lastUpdated"></post-time>
    </div>
  </li>
</template>

<script>
  import PostTime from './PostTime'

  export default {
    name: 'PostItem',
    props: ['page'],
    components: {
      PostTime
    },
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  @require '../styles/typography.styl'

  .post-item
    padding 10px 0
    margin-bottom 16px
    line-height 1.5
    display flex
    justify-content space-between
    border-bottom 1px solid $borderColor
    font-size $fontSizeMedium
    box-sizing border-box
    .page-link
      text-decoration none
      color $textColor
      &:hover
        color $accentColor
    .post-info
      font-size $fontSizeBase
    .post-time
      vertical-align middle
</style>