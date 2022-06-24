const bs = require('browser-sync').create();
const path = require('path');

bs.watch('./example/*').on('change', bs.reload);
bs.watch('./dist/*.js').on('change', bs.reload);

bs.init({
  server: path.resolve(__dirname, '../'),
  startPath: '/example/index.html',
  port: 80
});
