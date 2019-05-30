import { setAttribute } from "./dom";


/**
 * @param {HTMLElement} dom 真实DOM
 * @param {vnode} vnode 虚拟DOM
 * @param {HTMLElement} container 容器
 * @returns {HTMLElement} 更新后的DOM
 */
export function diff( dom, vnode, container ) {
  const ret = diffNode( dom, vnode );

  return ret;
}

function diffNode( dom, vnode ) {
  console.log( dom, vnode )
  let out = dom;

  if ( vnode === undefined || vnode === null || typeof vnode === 'boolean' ) vnode = '';

  if ( typeof vnode === 'number' ) vnode = String( vnode );
  
  if ( typeof vnode === 'string' ) {
    console.log( dom, dom.nodeType )
  }

  if ( !dom || !isSameNodeType( dom, vnode ) ) {
    console.log('初始化节点')
    out = document.createElement( vnode.tag );
    if (dom) {
      [ ...dom.childNodes ].map( out.appendChild );
      if ( dom.parentNode ) {
        dom.parentNode.replaceChild( out, dom );
      }
    }
   }
  
  diffAttributes( out, vnode );
  return out
}

function isSameNodeType ( dom, vnode ) {
  if ( typeof vnode === 'string' || typeof vnode === 'number') {
    return dom.nodeType === 3;
  }
  if ( typeof vnode.tag === 'string' ) {
    return dom.nodeName.toLowerCase() === vnode.tag.toLowerCase();
  }

  return dom && dom._component && dom._component.constructor === vnode.tag;
}

function diffAttributes ( dom, vnode ) {
  const old = {};// 当前DOM的属性

  const attrs = vnode.attrs;// 虚拟dom属性

  // 赋值
  for ( let i = 0, len = dom.attrbutes? dom.attrbutes.length : 0; i < len; i++ ) {
    const attr = dom.attrbutes[i];
    old[ attr.name ] = attr.value;
  }

  // 移除不在新属性的属性的旧属性
  for ( let name in old ) {
    if ( !(name in attrs )) {
      setAttribute( dom, name, undefined );
    }
  }
  
  // 更新属性
  for ( let name in attrs ) {
    if ( old[name] !== attrs[name] ) {
      setAttribute( dom, name, attrs[ name ]);
    }
  }
}