module.exports = {
  plugins: [
    '@vuepress/last-updated',
    ['@vuepress/blog', {
      directories: [
        {
          id: 'post',
          dirname: '_posts',
          path: '/',
          frontmatter: { title: '文章' },
          pagination: {
            sorter: function sorter(prev, next){
              const prevTime = new Date(prev.frontmatter.date).getTime()
              const nextTime = new Date(next.frontmatter.date).getTime()
              return prevTime - nextTime > 0 ? -1 : 1
            },
            lengthPerPage: 15,
          }
        }
      ],
      frontmatters: [
        {
          id: "tag",
          keys: ['tag', 'tags'],
          path: '/tag/',
          layout: 'Tag',
          frontmatter: { title: '标签' },
          itemlayout: 'Tag',
          pagination: {
            lengthPerPage: 15,
          }
        }
      ]
    }],
  ],
}
