<template>
  <div>
    <post-list :list="$pagination.pages"></post-list>
    <div class="tac">
      <Pagination />
    </div>
  </div>
</template>

<script>
  import PostList from '../components/PostList'
  import { Pagination } from '@vuepress/plugin-blog/lib/client/components'

  export default {
    name: 'Layout',
    components: {
      PostList,
      Pagination
    },
    data () {
      return {}
    }
  }
</script>