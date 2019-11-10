<template>
  <ul class="tag-list">
    <li
      class="tag-item"
      v-for="tag in $tag.list"
      :key="tag.key">
      <router-link class="page-link" :to="tag.path">{{ tag.name }}</router-link>
    </li>
  </ul>
</template>
<style lang="stylus" scoped>
  @require '../styles/typography.styl'
  .tag-list
    margin-top 16px
  .tag-item
    margin-bottom 16px
  .page-link
    text-decoration none
    color $textColor
    font-size $fontSizeLarge
    &:hover
      color $accentColor
</style>
