const User = require('./../schemas/user.schema');

module.exports = class UserRepository {
    static async addUser(data) {
        const newUser = new User(data);
        await newUser.save();
    }

    static async getUsers() {
        return await User.find().exec();
    }

    static async getKeys() {
        return await User.schema.paths;
    }
}