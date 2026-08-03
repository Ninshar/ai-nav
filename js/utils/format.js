/** 格式化与安全输出工具 */

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatCount(n) {
  if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + " 万";
  return String(n);
}

/** 按百分比加深/减淡十六进制颜色，percent 为负时加深 */
export function shadeColor(hex, percent) {
  const num = parseInt(hex.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const r = Math.min(255, Math.max(0, (num >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amt));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/** 生成应用名首字母/首字符（中文取第一个汉字） */
export function initialOf(name) {
  return name.replace(/[a-zA-Z0-9]/g, "").slice(0, 1) || name.slice(0, 1).toUpperCase();
}
