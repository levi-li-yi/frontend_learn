const createApp = require('./app');

// 服务端控制页面路由
module.exports = (context) => {
  return new Promise(async(resolve, reject) => {
    let {url} = context;

    let {app, router} = createApp(context);
    router.push(url);

    router.onReady(() => {
      let matchedComponents = router.getMatchedComponents();
      if(!matchedComponents.length) {
        return reject();
      }
      resolve(app);
    }, reject)
  })
}