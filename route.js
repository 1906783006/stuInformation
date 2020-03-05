var fs = require('fs')

var express = require('express')
var Students = require('./students')

// 1. 创建一个路由容器
var router = express.Router()

// 2.把路由都挂载到router路由容器中
// student首页
router.get('/students', function(req, res) {

  Students.find(function(err, ret) {
    if(err) return res.status(500).send('Server error');

    res.render('index.html', {
      title: ["西瓜", "banana", "apple", "liulian"],
      students: ret
    })
  })

  })

// 添加学生页面
router.get('/students/new', function(req, res) {
  res.render('new.html')
})

// 提交学生信息表单
router.post('/students/new', function(req, res) {

  var stu = new Students(req.body)

  stu.save(function(err, ret) {
    if(err) {
      console.log('存储失败');
      return res.status(500).send('err server')
    } else {
      console.log(ret);
      res.redirect('/students')
    }
  })
})

// 编辑页面
router.get('/students/edit', function(req, res) {
  // 1.在客户端处理列表页中处理链接问题（需要有id参数）
  // 2.获取学生的id
  
  Students.findById(req.query.id, function(err, data) {
    if(err) return res.status(500).send('Server error') 

    // 3.渲染编辑页面
    res.render('edit.html', {
      student: data
    })
  })
  // 根据id把学生信息查出来
  // 使用模板引擎渲染页面
})

// 提交编辑学生信息
router.post('/students/edit', function(req, res) {
  // 1.获取表单数据
  //   req.body 
  // 2.更新数据
  Students.findByIdAndUpdate(req.body.id,req.body, function(err) {
    if(err) return res.status(500).send('Server error')
    console.log('编辑成功');
    res.redirect('/students')
  })
  // 3.发送响应重定向
})

// 删除学生信息
router.get('/students/delete', function(req, res) {
  // 1.获取删除数据的id, req.query.id
  // 2.根据id删除数据
  Students.findByIdAndRemove(req.query.id, function(err) {
    if(err) return res.status(500).send('Server error')
    console.log('删除成功');
    res.redirect('/students')
    
  })
  // 3.重新发送数据渲染页面
})

// 3.把router导出
module.exports = router