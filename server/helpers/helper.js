class Helper {
    constructor() {
        
    }
    randomString(len = 15) {
        let charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$&*';
        let result = '';
        for (let i = 0; i < len; i++) {
            result += charSet[Math.floor(Math.random() * charSet.length)];
        }
        return result;
    }
}
module.exports = new Helper();