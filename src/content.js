// content.js
function removeCSDNResults() {
  // 搜索引擎选择器设置
  const se_selectors = {
    "google.com": ".MjjYud",
    "bing.com": ".b_algo, .b_ans, .b_top, .wptSld",
    "baidu.com": ".result",
  };

  const hostname = window.location.hostname;
  let se_selector;
  // 根据域名选择相应的选择器
  for (const [domain, sel] of Object.entries(se_selectors)) {
    if (hostname.includes(domain)) {
      se_selector = sel;
      break;
    }
  }

  // 根据选择器查找结果
  if (se_selector) {
    const results = document.querySelectorAll(se_selector);
    results.forEach((result) => {
      if (hostname.includes("baidu.com")) {
        const muAttribute = result.getAttribute("mu");
        if (muAttribute && muAttribute.includes("csdn.net")) {
          result.remove();
        }
      } else {
        const links = result.querySelectorAll("a");
        for (const link of links) {
          if (link.href.includes("csdn.net")) {
            result.remove(); // 删除包含 csdn 的结果
          }
        }
      }
    });
  }
}

// 初始运行
removeCSDNResults();

// 设置 MutationObserver 以处理动态加载的内容
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "childList") {
      removeCSDNResults();
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
