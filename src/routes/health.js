import express from 'express';
import {heartbeat} from './../controller/health';
const healthRouter = express.Router();

healthRouter.get('',heartbeat);
export default {
    prefix:'/health',
    router:healthRouter
}