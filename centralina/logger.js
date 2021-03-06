var winston = require('winston');

var genericLogger = null,
    dbLogger = null,
    viewLogger = null,
    networkLogger = null,
    checkinlLogger = null;

function initLogger() {
    console.log('logger.js > initLogger');
    
    genericLogger = new (winston.Logger)({
        transports: [
          new (winston.transports.Console)(),
          new (winston.transports.File)({ filename: __dirname+'/log/error.log' })
        ]
    });

    dbLogger = new (winston.Logger)({
        transports: [
          //new (winston.transports.Console)(),
          new (winston.transports.File)({ filename: __dirname+'/log/db.log' })
        ]
    });

    viewLogger = new (winston.Logger)({
        transports: [
          //new (winston.transports.Console)(),
          new (winston.transports.File)({ filename: __dirname+'/log/view.log' })
        ]
    });

    networkLogger = new (winston.Logger)({
        transports: [
          new (winston.transports.Console)(),
          new (winston.transports.File)({ filename: __dirname+'/log/network.log' })
        ]
    });

    loginLogger = new (winston.Logger)({
        transports: [
          new (winston.transports.Console)(),
          new (winston.transports.File)({ filename: __dirname+'/log/login.log' })
        ]
    });

    externalLogger = new (winston.Logger)({
        transports: [
          new (winston.transports.Console)(),
          new (winston.transports.File)({ filename: __dirname+'/log/external.log' })
        ]
    });

    checkinlLogger = new (winston.Logger)({
        transports: [
          new (winston.transports.Console)(),
          new (winston.transports.File)({ filename: __dirname+'/log/checkin.log' })
        ]
    });
}

initLogger();
var Logger = {}; 

Logger.error = function(n) {
  genericLogger.log('error', n);
};

Logger.info = function(n) {
  genericLogger.log('info', n);
};

Logger.db = function(t, n) {
    if(n) {
        dbLogger.log(t, n);
    } else {
        dbLogger.info(t);
    }
};

Logger.view = function(t, n) {
    if(n) {
        viewLogger.log(t, n);
    } else {
        viewLogger.info(t);
    }
};

Logger.network = function(t, n) {
    if(n) {
        networkLogger.log(t, n);
    } else {
        networkLogger.info(t);
    }
};

Logger.login = function(t, n) {
    if(n) {
        loginLogger.log(t, n);
    } else {
        loginLogger.info(t);
    }
};

Logger.external = function(t) {
    loginLogger.info(t);
}

Logger.checkin = function(t) {
    checkinlLogger.info(t);
}

module.exports = Logger;