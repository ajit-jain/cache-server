import mongoose, { Mongoose } from 'mongoose';
import random_string from './../utilities/random_strings';
import moment from 'moment';
const store = mongoose.model('store');
const cacheLimit = 10;
const defaultTTl = 10; // in  seconds 
const cache = {
    getCacheData,
    set,
    remove,
    flushAll,
    get,
    update
}
async function getCacheData(){
    try{
        let storeData = await store.find({},'key value');
        console.log(storeData);
        if(!storeData || !storeData.length){
            return {};
        }
        return storeData.reduce((data,d)=>{
            data[d['key']] = d['value'];
            return data;
        },{});
    }
    catch(e){
        console.log(e);
        throw error(e.code || 'CODE_ERROR');
    }

}
async function set(key,value,ttl){
    try{
        let storeDataCount = await store.find({}).count();
        if(storeDataCount >= cacheLimit){
            await popLeastUsedEntry();
        }
        let storeItem = new store({
            key,value,ttl
        });
        return await storeItem.save();
    }catch(e){
        console.log(e);
        throw error(e.code || 'CODE_ERROR');
    }
}

/**
 * popLeastUsedEntry: Removes the least used key from the DB. It search on the basis of updateAt timestamp.
 */
async function popLeastUsedEntry(){
    try{
        let least_used = await store.find({},'key').sort({updatedAt:1}).limit(1);
        return await remove(least_used[0].key);
    }catch(e){
        console.log(e);
        throw error(e.code || 'CODE_ERROR');
    }
}
async function get(key){
    try{
        let value = random_string();
        let storeItem =  await store.findOne({key});
        if(!storeItem){
            console.log('cache miss!!');
            return await set(key,value,defaultTTl);
        }
        console.log('cache hit!!');

        let date_diff = moment.duration(moment.utc(storeItem.updatedAt).add(storeItem.ttl,'seconds').diff(moment.utc()));
        
        if(date_diff < 0){
            return await update(key,value);
        } 
        return await update(key,storeItem.value);
    }catch(e){
        console.log(e);
        throw error(e.code || 'CODE_ERROR');
    }
}
async function remove(key){
    return store.remove({key});
}
async function flushAll(){
    return store.remove({}); 
}
async function update(key,value){
    console.log(key,value)
    return store.findOneAndUpdate({key},{$set:{
        value
    }},{new:true});
}
const code_message =  {
    'CACHE_NOT_FOUND':'Cache storage not found',
    'CODE_ERROR':'Something went wrong'
}
function error(code='CODE_ERROR'){
    let error = new Error();
    error.code = code;
    error.message = code_message[code];
}

export default cache;