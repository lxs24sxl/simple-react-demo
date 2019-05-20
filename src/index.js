const React = {
  createElement
};

const ReactDom = {
  render: (vnode, container) => {
    container.innerHTML = '';
    return render(vnode, container);
  }
}

function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  }
}

function render(vnode, container) {

  if (typeof vnode === 'string') {
    let textNode = document.createTextNode(vnode);
    return container.appendChild(textNode)
  }

  const dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key]
      setAttribute(dom, key, value)
    })
  }

  vnode.children.forEach(child => render(child, dom))
  return container.appendChild(dom);
}

function setAttribute(dom, name, value) {
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
let temp = {
  fontSize: 20, 
  color: 'green'
}
const element = (
  <div className={"test"}>
    <h1 style="color: red;" class="test-title" onClick={test}>Hello, world!</h1>
    <h2 style={temp} className={"test-desc"}>It is {new Date().toLocaleTimeString()}.</h2>
  </div>
);
console.log('element', element)
console.log('element', JSON.stringify(element))
function test() {
  console.log('test')
}

function tick() {
  let temp = {
    fontSize: 20, 
    color: 'green'
  }
  const element = (
    <div className={"test"}>
      <h1 style="color: red;" class="test-title" onClick={test}>Hello, world!</h1>
      <h2 style={temp} className={"test-desc"}>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDom.render(
    element,
    document.getElementById('app')
  )
}

setInterval(tick, 1000);