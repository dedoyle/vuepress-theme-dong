<template>
  <li class="post-item">
    <router-link class="post-title page-link" :to="page.path"># {{ page.title }}</router-link>
    <div class="post-info">
      <post-time
        class="post-time"
        :last-updated="page.frontmatter.date || page.lastUpdated"></post-time>
      <router-link
        class="page-link post-tag"
        v-for="tag in page.frontmatter.tag"
        :key="tag"
        :to="'/tag/' + tag">{{ tag }}</router-link>
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
  .post-item
    margin-bottom 16px
    font-size 20px
    .page-link
      text-decoration none
      color $textColor
      &:hover
        color $accentColor
    .post-title
      line-height 32px
    .post-info
      line-height 20px
      font-size 14px
    .post-time
      vertical-align middle
    .post-tag
      vertical-align middle
      margin-left 10px
</style>