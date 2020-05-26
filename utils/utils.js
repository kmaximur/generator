module.exports.makeId = function (length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports.getRandomFloat = function (min, max) {
    return (Math.random() * (max - min) + min).toFixed(4);
}

module.exports.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}