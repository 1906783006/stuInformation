# 4、express - crud

## 4.1、 模块化思想

模块如何划分：

- 模块职责单一
- vue, angular, react 全部使用模块化

## 4.2、 自己编写的步骤

- 处理模板

- 配置开放静态资源

- 配置模板引擎

- 简单路由，/students渲染静态页面

- 路由设计

- 提取路由模块

  ```javascript
  var fs = require('fs')
  
  var express = require('express')
  var Students = require('./students')
  
  // 1. 创建一个路由容器
  var router = express.Router()
  
  // 2.把路由都挂载到router路由容器中
  // student首页
  router.get('/students', function(req, res) {
  
    })
  
  // 添加学生页面
  router.get('/students/new', function(req, res) {
   
  })
  
  // 提交学生信息表单
  router.post('/students/new', function(req, res) {
    
  })
  
  // 编辑页面
  router.get('/students/edit', function(req, res) {
    
  })
  
  // 提交编辑学生信息
  router.post('/students/edit', function(req, res) {
    
  })
  
  // 删除学生信息
  router.get('/students/delete', function(req, res) {
    
  })
  
  // 3.把router导出
  module.exports = router
  ```

  

- 由于接下来一系列的业务操作都需要处理数据，我们封装了student.js

- 先写好 students.js 文件结构

  + 查询所有学生列表的 API find
  + findById
  + save
  + update
  + delete

- 实现具体功能
  - 通过路由接收到请求
  - 接收请求中的数据
  - 调用数据操作 API 处理数据
  - 发送操作数据给客户端，发送响应
  
- 业务功能新顺序
  - 渲染列表
  - 添加学生
  - 编辑学生信息
  - 删除学生
  
- 新知识点
  - es6 新语法：`arr.find()` 返回符合条件的元素
  - es6 新语法：`arr.findIndex(function(item))... `  返回符合条件的下标值
  
- 回调函数

  注意：凡事需要得到一个函数内部异步操作（setTimeout,ajax,readfild）的结果，都需要使用回调函数

  ```javascript
  function add(x, y, callback) {
      setTimeout(function() {
          var ret = x + y
      	callback(ret)
      }, 1000)
  }
  //调用
  add(10,20,function(ret) {
      //我们拿到这个结果可以执行任何操作
      console.log(ret)
  })
  ```

  

## 4.3、起步
- 初始化
- 模板处理

## 4.4、路由设计

| 请求方法 | 请求路径 | 参数 | 备注 |
| ------- | ------- | :------ | ------- |
| get     | / |      | 渲染首页 |
| get | /students/new |    | 渲染添加学生 |
| post | /students | name, age, gender, hobbies | 处理添加学生信息 |
| get | /students/edit | id | 渲染编辑页面 |
| post | /students/edit | id, name, age, gender, hobbies | id, name, gender... |
| get | /students/delete | id | 处理删除学生信息 |

#### 配置路由
  - 创建一个route.js文件，在文件中:
    ```javascript
    const express = require('express')
    //创建路由容器
    const router = express.Router()

    //挂载路由
    router.get('/', function(req, res) {
      ...
    })

    //导出路由实例
    module.exports = router
    ```
  - 在 app.js 中
    ```javascript
    //导入路由实例router
    const router = require('./route.js')
    //使用
    app.use(router)
    ```