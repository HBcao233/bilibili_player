const isNumber = s => Object.prototype.toString.call(s) === "[object Number]";
const isString = s => Object.prototype.toString.call(s) === "[object String]";
const isArrayLike = s => s != null && typeof s[Symbol.iterator] === 'function';
function formatDateTime(d) {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  return formatter.format(d).replaceAll('/', '-')
}
function formatTime(t) {
  let s = Math.floor(t % 60);
  if (s < 10) s = '0' + s;
  let m = Math.floor(t / 60 % 60);
  if (m < 10) m = '0' + m;
  let h = Math.floor(t / 3600);
  if (h < 10) h = '0' + h;
  if (h > 0) return h + ':' + m + ':' + s;
  return m + ':' + s;
}
function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}
function isMobile() {
  if(navigator && navigator.userAgent) return /Mobi|Android|iPhone/i.test(navigator.userAgent);
  return window.innerWidth <= 300;
}
/**
 * 创建 Element
 * @param {String} tagName 
 * @param {Object} options 
 * @param {function} func 
 * @returns {SVGElement | HTMLElement}
 */
function tag(tagName, options, func) {
  options = options || {};
  var svgTags = ['svg', 'g', 'path', 'filter', 'animate', 'marker', 'line', 'polyline', 'rect', 'circle', 'ellipse', 'polygon'];
  let newElement;
  if (svgTags.indexOf(tagName) >= 0) {
    newElement = document.createElementNS("http://www.w3.org/2000/svg", tagName);
  } else {
    newElement = document.createElement(tagName);
  }
  if (options.id) newElement.id = options.id;
  if (options.class) {
    if (!Array.isArray(options.class)) options.class = options.class.split(' ');
    for (const e of options.class) {
      if (e) newElement.classList.add(e);
    }
  }
  if (options.innerHTML) newElement.innerHTML = options.innerHTML;
  if (options.innerText) newElement.innerText = options.innerText;
  if (options.children) {
    if (!isArrayLike(options.children)) options.children = [options.children];
    for (let e of options.children) {
      if (isString(e) || isNumber(e)) e = document.createTextNode(e);
      newElement.appendChild(e);
    }
  }
  if (options.style) newElement.style.cssText = options.style
  if (options.attrs) {
    for (const [k, v] of Object.entries(options.attrs)) {
      newElement.setAttribute(k, v)
    }
  }
  func && func(newElement)
  return newElement;
}
