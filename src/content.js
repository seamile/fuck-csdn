// 搜索结果拦截器

let blockedDomains = []; // 要拦截的域名

// 从存储中加载配置
function loadConfig() {
  chrome.storage.sync.get({ blockedDomains: [] }, (items) => {
    blockedDomains = items.blockedDomains;

    // 加载配置后立即执行一次过滤
    removeBlockedResults();
  });
}

// 检查URL是否包含被拦截的域名
function shouldBlockUrl(url) {
  if (!url) {
    return false;
  } else {
    return blockedDomains.some((domain) => url.includes(domain));
  }
}

// 移除包含被拦截域名的搜索结果
function removeBlockedResults() {
  const hostname = window.location.hostname;

  if (hostname.includes('google.com')) {
    const results = document.querySelectorAll('div[data-lpage]');
    if (results.length > 0) {
      // 图片搜索结果
      results.forEach((res) => {
        const url = res.getAttribute('data-lpage');
        if (url && shouldBlockUrl(url)) {
          res.remove();
        }
      });
    } else {
      // 普通搜索结果
      document.querySelectorAll('.MjjYud').forEach((res) => {
        for (const link of res.querySelectorAll('a')) {
          if (shouldBlockUrl(link.href)) {
            if (res.querySelector('style')) {
              const urlParams = new URLSearchParams(link.href.split('?')[1]);
              const udmParam = urlParams.get('udm');
              if (udmParam === '1' || udmParam === null) {
                const styles = res.querySelectorAll('style');
                const parent = res.parentNode;
                styles.forEach((style) => parent.appendChild(style)); // 保留 <style> 元素
                res.innerHTML = ''; // 清空内容
              }
            } else {
              res.remove(); // 删除包含被拦截域名的结果
            }
          }
        }
      });
    }
  } else if (hostname.includes('baidu.com')) {
    document.querySelectorAll('div[mu]').forEach((res) => {
      const muAttribute = res.getAttribute('mu');
      if (muAttribute && shouldBlockUrl(muAttribute)) {
        res.remove();
      }
    });
  } else if (hostname.includes('bing.com')) {
    let removed = false;
    document.querySelectorAll('.b_algo, .b_wpt_bl, div[class="slide"]').forEach((res) => {
      for (const link of res.querySelectorAll('a')) {
        if (shouldBlockUrl(link.href)) {
          Array.from(res.children).forEach((child) => {
            if (child.tagName !== 'style') {
              child.remove();
            }
          });
          if (!res.hasChildNodes()) res.remove();
          removed = true;
        }
      }
    });
    if (removed) {
      // 遍历所有 .slide 元素，如果不包含子元素则将其删除
      document.querySelectorAll('.slide').forEach((slide) => {
        if (!slide.hasChildNodes()) slide.remove();
      });
    }
  } else if (hostname.includes('duckduckgo.com')) {
    document.querySelectorAll('li[data-layout="organic"]').forEach((res) => {
      for (const link of res.querySelectorAll('a')) {
        if (shouldBlockUrl(link.href)) {
          res.remove();
        }
      }
    });
  } else if (hostname.includes('sogou.com')) {
    document.querySelectorAll('div.vrwrap').forEach((res) => {
      res.querySelectorAll('[data-url]').forEach((element) => {
        const url = element.getAttribute('data-url');
        if (url && shouldBlockUrl(url)) {
          res.remove();
        }
      });
    });
  } else if (hostname.includes('so.com')) {
    document.querySelectorAll('li.res-list').forEach((res) => {
      for (const link of res.querySelectorAll('a')) {
        const url = link.getAttribute('data-mdurl') || link.href;
        if (url && shouldBlockUrl(url)) {
          res.remove();
        }
      }
    });
  }
}

// 监听存储变化，更新拦截域名列表
chrome.storage.onChanged.addListener((changes) => {
  if (changes.blockedDomains) {
    blockedDomains = changes.blockedDomains.newValue;
    removeBlockedResults();
  }
});

// 初始加载配置
loadConfig();

// 设置 MutationObserver 以处理动态加载的内容
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      removeBlockedResults();
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
