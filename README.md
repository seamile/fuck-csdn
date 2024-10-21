# CSDN Blocker

搜索一些技术问题时，结果中常会出现 CSDN 的博客链接。这些文章质量又差排名又高，尤其是在 Google 上，非常烦人。

于是乎就写了一个浏览器扩展，用来屏蔽搜索结果中 CSDN 链接。

目前对 Google、Bing、Baidu 三个搜索引擎有效，理论上应该支持所有 Chrome 体系的浏览器，比如 Edge、360 等。

## 用法

因为懒得发布到 Chrome 和 Edge 的扩展商店 (主要是注册成开发者需要花钱 T-T)，所以使用时需要通过开发者模式加载源码。

1. 下载扩展程序的[源代码](https://github.com/seamile/csdn-blocker/archive/refs/heads/main.zip)。
2. 打开浏览器的扩展页面：
    - Chrome: `chrome://extensions/`
    - Edge: `edge://extensions/`
3. 开启“开发者模式”。
4. 点击“加载解压缩的扩展”按钮。
5. 选择 `csdn-blocker/src` 目录。
6. 刷新一下搜索结果页面，从此再也不会看到烦人的 CSDN 博客链接了。
7. Enjoy!
