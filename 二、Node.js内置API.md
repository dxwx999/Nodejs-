## 二、Node.js内置API模块

### 一、fs文件系统模块

 #### 2.1什么是fs文件系统模块

   fs模块是Node.js官方提供的、用来操作文件的模块，它提供了一系列的方法和属性，用来满足用户对文件的操作需求

   例如:

     fs.readFile()方法，用来读取指定文件中的内容
     fs.writeFile()方法，用来向指定的文件中写入内容

   如果要在JavaScript代码中，使用fs模块来操作文件，则需要使用如下的方式先导入它:

    ```js
    const fs = require('fs')
    ```

 #### 2.2读取指定文件中的内容

   1、fs.readFile()的语法格式

   使用fs.readFile()方法，可以读取指定文件中的内容，语法格式如下

    ```js
    fs.readFile(path,[options],callback)
    ```
    
     参数path:必选参数,字符串,表示文件的路径
     参数options:可选参数，表示读取文件的编码格式
     参数callback:必选参数，表示回调函数 包含err, dataStr

   ```js
    //1、导入fs模块，来操作文件
    const fs = require('fs')
    
    //2、调用fs.readFile()方法来读取文件
    //3、读取成功则data为返回内容，err为null
    //4、读取失败则data为undifine,err为错误信息的对象
    
    fs.readFile('./text/demo.txt','utf8',(err,data)=>{
      if(err){
        return console.log('读取文件失败');
      }
      console.log('文件读取成功，内容是: '+data);//文件读取成功，内容是:文件读取成功，内容是: 今天的天气的真不错，我来学习node.js
    })
    
   ```

 #### 2.3向指定的文件中写入内容

   1、fs.writeFile()的语法格式

   使用fs.writeFile()方法，可以向指定的文件中写入内容

   ```js
    //1.导入fs文件系统模块
    const fs = require('fs')
    
    //2.调用fs.writeFile()方法，写入文件的内容
    //  参数1:表示写入文件的路径
    //  参数2:表示要写入的内容
    //  参数3:写入的编吗格式
    //  参数4:回调函数
    //  注意:主要路径存在，就会覆盖并写入文件，如果文件不存在会创建文件
    fs.writeFile('c./text/demo1.txt','我来给你加点文字','utf8',(err)=>{
      if(err){
       return  console.log('写入失败，文件路径不存在'+err.message);  
      }
      console.log('写入成功');
      //如果写入成功则返回null
    })
   ```

 #### 2.4练习考试成绩整理

  ```js
  const fs = require('fs')
  
  fs.readFile('./text/grade.txt','utf8',(err,data)=>{
    if(err){
      return console.log('读取文件失败'+err.message);
    }
    // console.log('读取文件成功,数据为'+data);//读取文件成功,数据为小红=98 小明=87 小王=89 小李=90 小张=88 小肖=39
    //1、先把成绩的数据按照空格分割
    const spArr=data.split(' ')
    const newArr=[]
    spArr.forEach(item=>{
      newArr.push(item.replace('=',':'))
    })
    const newArr2=newArr.join('\r\n') /r/n表示换行
    fs.writeFile('./text/newGrade.txt',newArr2,'utf8',err=>{
      if(err){
      return  console.log('修改成功但写入失败，文件路径不存在');
      }
      console.log('修改成功并写入',);
    })
  })
  /* 得到结果
  小红:98
  小明:87
  小王:89
  小李:90
  小张:88
  小肖:39 */
  ```

 #### fs模块路径动态拼接的问题

   在使用fs模块操作文件时候，如果提供的操作路径是相对路径，很容易出现动态路径拼接错误的问题

   原因:代码的运行的时候，会以执行node命令时所处的目录，动态拼接处被操作文件的完整路径

   解决方法: 

     (1)提供完整路径(移植性非常差)
    
     (2)__dirname表示当前目录存在的路径
    
     ```js
      const fs = require('fs')
      
      fs.readFile(__dirname+'/text/demo.txt','utf8',(err,data)=>{
        if(err){
          return console.log('文件读取失败');
        }
        console.log(data); //对啊，我来给你加点文字
      })
      ```

### 二、path路径模块

 #### 1、什么是path路径模块

   path模块是Node.js官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。

   例如：

     path.join()方法，用来将多个路径片段拼接成一个完整的路径字符串
     path.basename()方法，用来从路径字符串中，将文件名解析出来

   如果要在JavaScript代码中，使用path模块来处理路径，则需要使用如下的方式先导入它:

     ```js
      const path = require('path')
      ```

 #### 2、path.join()路径拼接

   ```js
    const path = require('path')
    //../会抵消前面的一层路径
    const pathStr = path.join('/a','/b/c','../','./d','e')
    console.log(pathStr);
   ```

   ```js
    fs.readFile(path.join(__dirname,'/text/demo.txt'),'utf8',(err,data)=>{
      if(err){
        return console.log('读取失败');
      }
      console.log(data); //对啊，我来给你加点文字
    })
   ```

   好处:如果使用+拼接可能会将.也拼接到前面的路径中，产生错误，path.join不会

 #### 3、path.basename()

   读取路径中的文件名

   ```js
    console.log(path.basename('/text/demo.txt')); //demo.txt
    console.log(path.basename('/text/demo.txt','.txt')); //demo
    //在后添加参数可以隐藏文件扩展名
   ```

 #### 4、path.extname()

   读取路径中文件的扩展名

   ```js
    console.log(path.extname('/text/demo.txt')); //.txt
   ```

### 三、http模块

 回顾：什么是客户端、什么是服务器？

 在网络节点中，负责消费资源的电脑，叫做客户端；负责对外提供网络资源的电脑，叫做服务器

 http模块是Node.js 官方提供的、用来创建web服务器的模块。通过http模块提供的http.createServer()方法，就能方便的把一台普通的电脑，变成一台服务器，从而对外提供Web资源服务

 导入

   ```js
    const http= require('http')
   ```

  #### 3.2进一步理解http模块的作用

   服务器和普通电脑的区别在于，服务器上安装了web服务器软件，例如:IIS、Apache等，通过安装这些服务器软件，就能把一台普通的电脑变成一台web服务器
   在Node.js中，我门不需要使用IIS、Apache等这些第三方web服务器软件。因为我门可以基于Node.js提供的http模块，通过几行简单的代码，就能轻松的手写一个服务器软件，从而对外提供web服务

  #### 3.4创建最基本的web服务器

  ```js
  //导入http模块
  const http = require('http')
  
  //创建web服务器实例
  const server =http.createServer()
  
  //为服务器实例绑定request事件，监听客户端的请求
  server.on('request',function(req,res){
    console.log(req.url);
    console.log("===================");
    console.log(req.method);
  
  })
  
  server.listen('7777',function(){
    console.log('server running at 127.0.0.1');
  })
  ```

  #### 3.5.req和res的常用方法

  ```
  req.url:客户端请求的url地址.例如/index.htmlreq是request或者require:请求的意思
  req.method:客户端请求的method地址，例如post get
  res是reponse:响应的意思
  
  
  res.setHeader('ContentType','text/html;charset=utf8') //设置编码格式
  
  ```

  #### 3.6、Node.js中的模块化规范

  CommonJS规定

  ①每个模块内部，moudule变量代表当前模块

  ②moudule变量是一个对象的，它的exports属性（即module.exports）是对外的接口

  ③加载某个模块，其实是加载该模块的module.exports属性,require()方法用于加载模块

  #### 3.7、解决npm下包速度慢的问题

  ```js
  #查看当前的下包镜像源
  
  npm config get registry
  
  #切换淘宝镜像源
  
  npm config set registry=https://registry.npm.taobao.org/
  
  
  #通过npm包管理器，将nrm安装为全局可用的工具
  npm i nrm g
  
  #查看所有可用的镜像源
  nrm ls
  
  #将下包的镜像源切换为 taobao
  nrm use taobao
  ```

### 四、模块的加载机制

#### 4.1、优先从缓存中加载

模块再第一次加载后被缓存，这也意味着多次调用require()不会导致模块的代码被执行多次

注意：模块分为 内置模块，用户自定义模块和第三方模块，都会优先从缓存中加载，提高模块的加载效率

#### 4.2、内置模块的加载优先级最高

#### 4.3、自定义模块

自定义模块必须以./之类的路径标识符开头，没有指定的话会被node当作是内置模块或者是第三方模块进行加载

node.js加载顺序是 按照原完整文件名>拼接上js>拼接上json>拼接上node

#### 4.4、目录作为模块

①再被加载的目录下查找一个交packge.json的文件，并寻找main属性，作为require()加载的入口

②如果目录里没有package.json文件，或者main入口不存在或无法解析的，则node.js将会视图加载目录下的index.js文件

③如果以上两部都失败了,则node.js会再终端打印错误消息，报告模块的缺失Error:Cannot find module ‘xxxx'





