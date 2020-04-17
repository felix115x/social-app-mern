const mongoose = require('mongoose');
const config = require('config');

const database = config.get('mongoDev');

const connectDB = async () => {
    try {
        await mongoose.connect(database, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Database connect');
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}

module.exports = connectDB;
