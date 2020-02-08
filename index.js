const pmx = require('pmx');
const pm2 = require('pm2');
const config = require('./src/config');
const startHttpServer = require('./src/startHttpServer');

pmx.initModule({}, function(err, conf) {
    if (err) return console.error('PM2 connection error', err);

    pm2.connect(function(e) {
        if (e) return console.error('PM2 connection error', e);
        config.initConfig(conf);
        startHttpServer(config.serverPort);
    });
});
