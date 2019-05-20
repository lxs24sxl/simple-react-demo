

import Component from '../react/component'
import { setAttribute } from './dom'

function createComponent(component, props) {
  let inst;
  if (component.prototype && component.prototype.render) {
    // 使用当前组件
    inst = new component(props);
  } else {
    // 创建新组件
    inst = new Component(props);
    inst.contructor = component;
    inst.render = function () {
      return this.contructor(props);
    }
  }
  return inst;
}

function setComponentProps(component, props) {

  if (!component.base) {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props);
  }

  component.props = props;

  renderComponent(component);

}


export function renderComponent(component) {
  let base;
  const renderer = component.render()

  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  base = _render(renderer);

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else if (component.componentDidMount) {
    component.componentDidMount();
  }

  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base);
  }


  component.base = base;
  base._component = component;
}


function _render(vnode) {
  let vnodeType = typeof vnode
  // 判断节点是否为空
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';

  // 判断是否为数字
  if (typeof vnode === 'number') vnode = String(vnode);

  // 判断是否为字符串
  if (typeof vnode === 'string') {
    let textNode = document.createTextNode(vnode);
    return textNode
  }

  if (typeof vnode.tag === 'function') {
    const component = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(component, vnode.attrs);
    return component.base;
  }


  const dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {

      const value = vnode.attrs[key];
      setAttribute(dom, key, value);
    })
  }

  if (vnode.children) {
    vnode.children.forEach(child => render(child, dom));
  }

  return dom
}
export function render(vnode, container) {
  return container.appendChild(_render(vnode));
}