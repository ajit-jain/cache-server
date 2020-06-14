import express from 'express';
import {getStoreData, getValue, updateData,removeItem, emptyStore} from './../controller/store';
const storeRouter = express.Router();

storeRouter.get('/data',getStoreData);
storeRouter.get('/item',getValue);
storeRouter.put('/item',updateData);
storeRouter.delete('/item',removeItem);
storeRouter.delete('/data',emptyStore);

export default {
    prefix:'/store',
    router:storeRouter
}