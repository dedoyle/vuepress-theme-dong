<template>
  <ul id="default-layout" class="post-list">
    <post-item
      v-for="page in $pagination.pages"
      :key="page.key"
      :page="page"></post-item>
  </ul>
</template>

<script>
  import PostItem from './PostItem.vue'
  export default {
    name: 'PostList',
    props: ['list'],
    components: {
      PostItem
    },
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  .post-list
    margin-top 16px
</style>