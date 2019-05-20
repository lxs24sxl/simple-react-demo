# React简易源码编写

#### 1. JSX和虚拟DOM

实现 `ReactDOM.render` 和 `React.createElement` 方法
```javascript
let temp = {
    fontSize: 20, 
    color: 'green'
  }
  const element = (
    <div className={"test"}>
      <h1 style="color: red;" className="test-title" onClick={test}>Hello, world!</h1>
      <h2 style={temp} className={"test-desc"}>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
```

1. 通过babel-plugin-transform-react-jsx转化为语法树
```json
{
    "tag":"div",
    "attrs":{
        "className":"test"
    },
    "children":[
        {
            "tag":"h1",
            "attrs":{
                "style":"color: red;",
                "class":"test-title",
                "onClick": function() {}
            },
            "children":[
                "Hello, world!"
            ]
        },
        {
            "tag":"h2",
            "attrs":{
                "style":{
                    "fontSize":20,
                    "color":"green"
                },
                "className":"test-desc"
            },
            "children":[
                "It is ",
                "下午5:31:58",
                "."
            ]
        }
    ]
}
```
2. 遍历语法树来渲染各自的节点

##### 对应的React的基础功能
初始化
```javascript
import React from 'react';   // 引入React.createElement
import ReactDOM from 'react-dom';

ReactDOM.render( <App />, document.getElementById( 'editor' ) );

```