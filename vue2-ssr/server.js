const express = require('express');
const app = express();

const App = require('./src/entry-server.js');

const path = require('path')
const vueServerRender = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync(path.join(__dirname, './index.html'), 'utf-8')
});

app.get("*", (request, response) => {
  let vm = vueApp({});

  response.status(200);
  response.setHeader("Content-type", "text/html;charset-utf-8");
  vueServerRender.renderToString(vm).then((html) => {
    response.end(html)
  })
})

app.listen(3001, () => {
  console.log('服务开启')
})