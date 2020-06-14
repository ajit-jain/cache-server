import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {SERVER_CONFIG} from './config';
import configureSource from './src';
const app = express();
app.use(cors({
    origin:SERVER_CONFIG.ALLOW_CORS_ORIGIN,
    methods:SERVER_CONFIG.ALLOW_CORS_METHODS
}));

app.use(bodyParser.json({ limit: SERVER_CONFIG.BODY_LIMIT }))
app.use(bodyParser.urlencoded({ limit: SERVER_CONFIG.BODY_LIMIT, extended: true }));

configureSource(app).then(_=>{
    console.log(SERVER_CONFIG.PORT);
    app.listen(SERVER_CONFIG.PORT,function(){
        console.log('Server started');
    })
}).catch(err=>{
    console.log('something went wrong',err);
});

