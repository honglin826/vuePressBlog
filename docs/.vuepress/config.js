module.exports = {
  // 可以理解为路由的配置文件
  title: "Linlin",
  description: 'Live',
  base:'/',
  themeConfig: {
    lastUpdated: true,
    lastUpdated: 'Last Updated',
    // repoLabel: 'Github',
    nav: [
      { text: '学习', link: '/' },
      { text: '踩坑', link: '/test/' }
    ],
    sidebarDepth: 0,
    // 注意这个地方的配置顺序和nav上面的是反的，因为vuepress在匹配的时候实际上是对象的遍历
    sidebar: {
      '/test/': [
        ''
      ],
      '/': [
        '',
        {
          title: 'ts',
          collapsable: true,
          children: [
            'ts/basic'
          ]
        },
        {
          title: 'vue',
          collapsable: true,
          children: [
            'vue/basic',
            'vue/vue_ts',
            'vue/vue3'
          ]
        },
        {
          title: 'html',
          collapsable: true,
          children: [
            'html/html',
            'html/css'
          ]
        },
        {
          title: 'webpack',
          collapsable: true,
          children: [
            'webpack/config'
          ]
        },
        {
          title: 'http',
          collapsable: true,
          children: [
            'http/cookie',
            'http/https'
          ]
        },
        {
          title: 'npm',
          collapsable: true,
          children: [
            'npm/basic'
          ]
        },
        {
          title: 'tools',
          collapsable: true,
          children: [
            'tools/npx',
            'tools/lighthouse'
          ]
        },
        {
          title: 'todo',
          collapsable: true,
          children: [
            'todo/todo'
          ]
        },
        {
          title: 'work',
          collapsable: true,
          children: [
            'work/ie',
            'work/webpack'
          ]
        }
      ]
    }
  },
  markdown: {
    lineNumbers: true // 显示代码块行号
  }
}