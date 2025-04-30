// 默认要拦截的域名
const DEFAULT_BLOCKED_DOMAINS = [];

// 保存设置
function saveOptions() {
  const domainsText = document.getElementById('blocked-domains').value;
  const domains = domainsText
    .split('\n')
    .map((domain) => domain.trim())
    .filter((domain) => domain.length > 0);

  chrome.storage.sync.set({ blockedDomains: domains }, () => {
    const status = document.getElementById('status');
    status.textContent = '设置已保存！';
    status.className = 'status success';

    // 3秒后隐藏状态消息
    setTimeout(() => {
      status.textContent = '';
      status.className = 'status';
    }, 3000);
  });
}

// 重置为默认设置
function resetOptions() {
  document.getElementById('blocked-domains').value = DEFAULT_BLOCKED_DOMAINS.join('\n');
  saveOptions();
}

// 加载保存的设置
function restoreOptions() {
  chrome.storage.sync.get({ blockedDomains: DEFAULT_BLOCKED_DOMAINS }, (items) => {
    document.getElementById('blocked-domains').value = items.blockedDomains.join('\n');
  });
}

// 初始化页面
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('reset').addEventListener('click', resetOptions);
