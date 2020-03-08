const csv = require('csvtojson');
const userRepository = require('./../repositories/user.repository');
const { Parser  } = require('json2csv');
const fs = require('fs');

module.exports = class UserService {
    static async parseFile(file) {
        const list = await csv().fromString(file.data.toString());
        list.forEach(async (value, item) => {
            const keys = Object.keys(value)[0].split(';');
            const values = Object.values(value)[0].split(';');
            const data = {};
            for (let i = 0; i < keys.length; i++) {
                data[keys[i]] = values[i]
            }
            await userRepository.addUser(data);
        })
    }

    static async getUsers() {
        return await userRepository.getUsers();
    }

    static async download() {
        const users = await userRepository.getUsers();
        const fields = Object.keys(await userRepository.getKeys());
        const parser = new Parser({ fields: fields });
        const csv = await parser.parse(users);
        return csv
    }
}