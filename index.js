const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, Counter } = require("./db");

const logger = morgan("tiny");

const bodyParser = require('body-parser')
const axios = require('axios')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

const client = axios.default

//微信小程序消息推送
app.post("/api/wx_push", async (req, res) => {
  const headers = req.headers
    const weixinAPI = `http://api.weixin.qq.com/cgi-bin/message/custom/send`;
    const payload = {
      touser: headers['x-wx-openid'],
      msgtype: 'text',
      text: {
          content: `云托管接收消息推送成功，内容如下：\n${JSON.stringify(req.body, null, 2)}`
      }
  }
  // dispatch to wx server update
  const result = await client.post(weixinAPI, payload)
  console.log('received request', req.body, result.data)
  res.send('success')
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
