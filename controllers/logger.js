const {createLogger,transports,format} = require('winston');

const portLogger_Active = createLogger({
    transports:[
        new transports.File({
            filename:'./Logs/PortListen.log',
            level:'info',
            format:format.combine(format.timestamp(),format.json())
        })
    ]
});

const portLogger_NonActive = createLogger({
    transports:[
        new transports.File({
            filename:'./Logs/PortListen-error.log',
            level:'error',
            format:format.combine(format.timestamp(),format.json())
        })
    ]
});





module.exports = {portLogger_Active,portLogger_NonActive}