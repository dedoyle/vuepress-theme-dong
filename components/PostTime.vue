<template>
  <time
    :datetime="lastUpdated | formatDate"
    :title="lastUpdated | formatDate"
    pubdate="pubdate"
  >{{ lastUpdated | timeago($lang) }}</time>
</template>

<script>
import { format } from 'timeago.js'
export default {
  name: 'PostTime',
  filters: {
    timeago: (str, lang) => {
      if (!str) return format()
      const locale = (lang === 'zh-CN') ? 'zh_CN': 'en_US'
      return format(new Date(str), locale)
    },
    formatDate: date => {
      return new Date(date).toLocaleDateString()
    }
  },
  props: {
    lastUpdated: {
      type: [ String, Date, Number ],
      default: ''
    },
  },
}
</script>