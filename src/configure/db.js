
import mongoose from 'mongoose';
import {DB_CONFIG} from './../../config';

export default  function establishedDbConnection() {
        mongoose.set('useCreateIndex', true);
        console.log('connection string',`${DB_CONFIG.MONGO_URL}/${DB_CONFIG.MONGO_DB_NAME}`)
        mongoose.connect(`${DB_CONFIG.MONGO_URL}/${DB_CONFIG.MONGO_DB_NAME}`,{ useNewUrlParser: true });
        mongoose.connection.on('connected', dbConnected);
        mongoose.connection.on('open', dbConnectionOpen);
        mongoose.connection.on('error', dbConnectionError);
        mongoose.connection.on('disconnected', dbDisconnected);
        process.on('SIGINT', closeConnection);
}



function dbConnected(data) {
    console.log('DB successfully connected');
}

function dbConnectionOpen(data) {
    console.log('Now DB connection is open');
}

function dbConnectionError(data) {
    console.log(`DB connection error=> ${String(data)}`);
}

function dbDisconnected(data) {
    console.log(`DB is now disconnected`);
}

function closeConnection(data) {
    mongoose.connection.close(()=> {
        console.log('Connection is closed');
        process.exit(0);
    });
}