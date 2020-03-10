const mongoose = require('mongoose');
const config = require('./../../config.json')

module.exports = class DatabaseHelper {
    static async connect() {
        await mongoose.connect(config.connectionUrl, (err, db) => {
            if (err) {
                return;
            }
        })
    }
}
