// content.js
function removeCSDNResults() {
  const hostname = window.location.hostname;
  if (hostname.includes('google.com')) {
    const results = document.querySelectorAll('div[data-lpage]');
    if (results.length > 0) {
      // 图片搜索结果
      results.forEach((res) => {
        if (res.getAttribute('data-lpage').includes('csdn.net')) {
          res.remove();
        }
      });
    } else {
      // 普通搜索结果
      document.querySelectorAll('.MjjYud').forEach((res) => {
        for (const link of res.querySelectorAll('a')) {
          if (link.href.includes('csdn.net')) {
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
              res.remove(); // 删除包含 csdn 的结果
            }
          }
        }
      });
    }
  } else if (hostname.includes('baidu.com')) {
    document.querySelectorAll('div[mu]').forEach((res) => {
      const muAttribute = res.getAttribute('mu');
      if (muAttribute && muAttribute.includes('csdn.net')) {
        res.remove();
      }
    });
  } else if (hostname.includes('bing.com')) {
    let removed = false;
    document.querySelectorAll('.b_algo, .b_wpt_bl, div[class="slide"]').forEach((res) => {
      for (const link of res.querySelectorAll('a')) {
        if (link.href.includes('csdn.net')) {
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
  }
}

// 初始运行
removeCSDNResults();

// 设置 MutationObserver 以处理动态加载的内容
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      removeCSDNResults();
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
