const express = require('express')
const router = require('./route')
var bodyParser = require('body-parser')

const app = express()

// 配置body-parser 
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

//配置express模板引擎
app.engine('html', require('express-art-template'))

// 开放静态资源
app.use('/public/', express.static('./public'))
app.use('/node_modules/', express.static('./node_modules'))

// 把路由挂载到app服务中
app.use(router)

app.listen(3000, function() {
  console.log('running...');
  
})