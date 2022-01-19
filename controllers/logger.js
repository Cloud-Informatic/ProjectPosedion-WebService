// Sistemin log kayıtlarının oluşturulduğu sistem dosya.
const {createLogger,transports,format} = require('winston');

// Sistemin aktifliğinin takip edildiği log fonksiyonu
const portLogger_Active = createLogger({
    transports:[
        new transports.File({
            filename:'./Logs/PortListen.log',
            level:'info',
            format:format.combine(format.timestamp(),format.json())
        })
    ]
});
// Sistemin de-aktifliğinin takip edildiği log fonksiyonu
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