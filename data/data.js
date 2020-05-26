const {makeId, getRandomFloat, getRandomInt} = require('../utils/utils')
let data = []

let io = null
module.exports.sockets = function (rootIo) {
    io = rootIo
    io.sockets.on('connection', function (socket) {
        console.log('A client is connected!');
        console.log('Total connected users: ' + Object.keys(io.engine.clients).length)
        if (data)
            socket.emit('firstData', data);
    });
}

// create entities
for (let i = 0; i < 20; i++) {
    data.push({
        id: makeId(20)
    })
    for (let j = 1; j <= 20; j++) {
        data[i][`param${j}`] = getRandomFloat(-1, 1)
    }
}

// update entities
setInterval(() => {
    const idx = getRandomInt(0, 19)
    const numParams = getRandomInt(1, 20)
    data[idx][`param${numParams}`] = getRandomFloat(-1, 1)
}, 50)

let needSendData = true
let sendNewDataInterval = null
setInterval(() => {
    if (needSendData) {
        sendNewDataInterval = setInterval(() => {
            const dataForSend = []
            const ids = {}
            while (dataForSend.length < 10) {
                const idx = getRandomInt(0, 19)
                if (ids[data[idx].id]) continue;
                ids[data[idx].id] = true;
                dataForSend.push(data[idx]);
            }
            sendUpdates(dataForSend)
        }, 1000)
    } else {
        clearInterval(sendNewDataInterval)
        sendNewDataInterval = null
    }
    needSendData = !needSendData
}, 5000)

function sendUpdates(data) {
    if (io && io.sockets.clients()) {
        io.emit('newData', data);
    }
}

