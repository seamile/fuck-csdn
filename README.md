# Search Blocker

搜索一些技术问题时，结果中常会出现一些质量差的链接，比如 CSDN 的博客文章。由于 SEO 等原因，这些链接的排名异常的高，非常烦人。

于是就写了这个浏览器扩展，用来屏蔽那些不想在搜索结果中看到的链接。

目前支持的搜索引擎有：Google、Bing、Baidu、DuckDuckGo、搜狗、360 搜索。理论上所有基于 Chromium 的浏览器上都可以运行，比如 Edge 浏览器、360 浏览器等。

## 用法

因为懒得发布到 Chrome 和 Edge 的扩展商店 (主要是注册成开发者需要花钱 T-T)，所以使用时需要通过开发者模式加载源码。

1. 下载扩展程序的[源代码](https://github.com/seamile/search-blocker/archive/refs/heads/main.zip)。
2. 打开浏览器的扩展页面：
    - Chrome: `chrome://extensions/`
    - Edge: `edge://extensions/`
3. 开启“开发者模式”。
4. 点击“加载解压缩的扩展”按钮。
5. 选择 `search-blocker/src` 目录。
6. 刷新一下搜索结果页面，从此再也不会看到烦人的垃圾文章链接了。
7. Enjoy!
