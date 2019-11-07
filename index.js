module.exports = {
  plugins: [
    '@vuepress/last-updated',
    ['@vuepress/blog', {
      directories: [
        {
          id: 'post',
          dirname: '_posts',
          path: '/',
          pagination: {
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
