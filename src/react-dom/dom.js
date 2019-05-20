export function setAttribute(dom, name, value) {
  // 如果是className，转化成class
  if (name === 'className') name = "class";

  // 如果是点击事件
  let type = 'normal'
  if (/on\w+/.test(name)) {
    name = name.toLowerCase();
    dom[name] = value || '';
    return
  }
  
  // 如果是style
  if (name === 'style') {
    let type = typeof value
    if (!value || type === 'string') {
      dom.style.cssText = value || '';
    } else if (value && type === 'object') {
      for (let key in value ) {
        let temp = value[key]
        dom.style[key] = typeof temp === 'number'? `${temp}px`: temp
      }
    }
    return
  }


  if (name in dom) {
    dom[name] = value || '';
  } 
  if (value) {
    dom.setAttribute(name, value);
  } else {
    dom.removeAttribute(name, value);
  }
}