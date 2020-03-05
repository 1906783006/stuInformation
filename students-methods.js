/* students.js 
数据操作模块
职责：操作文件中的数据，只关心数据，不关心业务 */

// 如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取
/* function fn(callback) {
  setTimeout(function() {
    var data = 'hello'
    callback(data)
  }, 1000)
}

fn(function(data) {
  console.log(data);
  
}) */
const fs = require('fs')

var stuPath = './students.json'

// 获取学生列表
exports.find = function(callback) {
  fs.readFile(stuPath, function(err, data) {
    if(err) return callback(err)
    callback(null, JSON.parse(data))
  })
}

// 添加保存学生
exports.save = function(stu, callback) {
  fs.readFile(stuPath,'utf8', function(err, data) {
    if(err) return callback(err)

    var students = JSON.parse(data).students

    stu.id = students[students.length - 1].id + 1

    students.push(stu)

    var str = JSON.stringify({
      students: students
    })

    fs.writeFile(stuPath, str, function(err) {
      if(err) return callback(err)

      callback(null)
    })
  })
}


// 更新学生数据
exports.update = function(stu, callback) {

  fs.readFile(stuPath,'utf8', function(err, data) {
    if(err) return callback(err)

    var students = JSON.parse(data).students

    stu.id = parseInt(stu.id)

    var student = students.find(function(item) {
      return item.id === stu.id
    })

    for(var key in stu) {
      student[key] = stu[key]
    }

    var str = JSON.stringify({
      students: students
    })

    fs.writeFile(stuPath, str, function(err) {
      if(err) return callback(err)

      callback(null)
    })
    
  })
}

// 根据id获取学生对象
exports.findById = function(id, callback) {
  fs.readFile(stuPath,'utf8', function(err, data) {
    if(err) return callback(err)

    var students = JSON.parse(data).students

    var student = students.find(function(item) {
      return item.id === parseInt(id)
    })

    callback(null, student)
  })
}

// 删除学生
exports.delete = function(id, callback) {
  fs.readFile(stuPath,'utf8', function(err, data) {
    if(err) return callback(err)

    var students = JSON.parse(data).students

    // findIndex是es6的方法，返回符合条件的下标
    var index = students.findIndex(function(item) {
      return item.id === parseInt(id)
    })

    students.splice(index, 1);

    var str = JSON.stringify({
      students: students
    })

    fs.writeFile(stuPath, str, function(err) {
      if(err) return callback(err)

      callback(null)
    })

  })
}