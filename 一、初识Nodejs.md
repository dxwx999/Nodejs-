## 1、初识Node.js

### 一、浏览器中的JavaScript运行环境

#### 1、为什么JavaScript可以在浏览器中被执行

- 待执行的JS代码->JavaScript解析引擎
- 其中Chrome的V8解析引擎的性能最好

#### 2、为什么JavaScript可以操作DOM和BOM

- DOM:操作页面结构的API
- BOM:操作浏览器行为的API
- 因为每个浏览器都内置了DOM、BOM这样的API函数，因此，浏览器的JavaScript才可以调用他们

#### 3、浏览器中的JavaScript运行环境

- 运行环境是指代码正常运行所需要的必要环境
- Chrome浏览器运行环境
  - V8引擎
  - 内置API
    - DOM、BOM、Canvas、XMLHTTPRequest、JS内置对象、etc(暂时不知道是什么)

#### 4、总结：

- V8引擎负责解析和执行JavaScript
- 内置API的由运行环境提供的特殊接口，只能在所属的运行环境中被调用

### 二、什么是node.js

#### 1、JavaScript能否做后端开发

- 可以，需要借助node.js

#### 2、什么的Node.js

- Node.js是一个开源、跨平台的 JavaScript 运行时环境。

#### 3、Node.js简介

- Node.js中的JavaScript的运行环境
  - 内置API->待执行的JavaScript代码->V8引擎
- 注意：
  - 浏览器是JavaScript的前端运行环境
  - Node.js是JavaScript的后端运行环境
  - Node.js中无法调用DOM和BOM 等浏览器内置API

#### 4、Node.js可以做什么

- Node.js作为一个JavaScript的运行环境，仅仅提供了基础的功能和API。然而，基于Node.js提供的这些基础功能，很多强大的工具如雨后春笋，层出不穷，所以学会了Node.js，可以让前端程序员胜任更多的工作和岗位
- 基于Express框架(https://www.expressjs.com.cn/),可以快速构建Web应用
- 基于Electrom框架(https://www.electronjs.org/),可以构建跨平台的桌面应用
- 基于restify框架(http://restify.com/),可以快速构建API接口项目
- 读写和操作数据库、创建实用的命令行工具辅助前端开发、etc...
- 总之:Node.js是大前端时代的"宝剑",有了Node.js这个超级buff的加持，前端程序员的行业竞争力会越来越强!

#### 5、Node.js的学习路径

- JavaScript基础语法+Node.js内置API模块(fs,path,http等)+第三方API模块(express、mysql等)

### 三、Node.js环境的安装

- https://blog.csdn.net/m0_67393828/article/details/126113823
- 安装nvm可以动态控制Node.js的版本
- LTS版本：长期稳定版
- Current(现在)版本：测试版本 

