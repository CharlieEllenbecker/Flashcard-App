const winston = require('winston');

module.exports = function() {
    process.on('uncaughtException', (error) => {
        winston.error(error.message, error);
        process.exit(1);
    });
    
    process.on('unhandledRejection', (error) => {
        winston.error(error.message, error);
        process.exit(1);
    });
    
    winston.add(winston.createLogger({  // look for a better way of handling this
        format: winston.format.combine( // look into how to log to mongobd using transports
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            // new winston.transports.Console({ colorize: true, prettyPrint: true }),
            new winston.transports.File({ filename: 'logfile.log' })
        ]
    }));
}