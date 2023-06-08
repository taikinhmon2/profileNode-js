const mongoose = require('mongoose')
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/f8-dev');
        console.log('connect successfully')
    } catch (error) {
        console.log('connect faile')
    }
}
module.exports = {connect}