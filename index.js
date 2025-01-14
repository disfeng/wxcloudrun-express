const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const PORT = process.env.PORT || 80
const HOST = '0.0.0.0'

// App
const app = express()

app.use(bodyParser.raw())
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: true }))

const client = axios.default

app.all('/api/wx_push', async (req, res) => {
    // const headers = req.headers
    // const weixinAPI = `http://api.weixin.qq.com/cgi-bin/message/custom/send`
    // const payload = {
    //     touser: headers['x-wx-openid'],
    //     msgtype: 'text',
    //     text: {
    //         content: `云托管接收消息推送成功，内容如下：\n${JSON.stringify(req.body, null, 2)}`
    //     }
    // }
    // // dispatch to wx server
    // const result = await client.post(weixinAPI, payload)
    // console.log('received request', req.body, result.data)
    res.send('success')
});

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)