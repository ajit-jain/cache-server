import cache from './../helpers/cache';
export {
   getStoreData,
   getValue,
   updateData,
   removeItem,
   emptyStore
}

async function getStoreData(req,res){
    try{
        res.status(200).send({data:await cache.getCacheData()})
    }catch(e){
        console.log(e);
        res.status(500).send({
            message:e.message,data:null
        })
    }
} 

async function getValue(req,res){
    try{
        let {key} = req.query;
        if(!key){
            throw new Error('please pass key as params');
        }
        res.status(200).send({data:await cache.get(key)});
    }catch(e){
        console.log(e);
        res.status(500).send({
            message:e.message,data:null
        })
    }
} 

async function updateData(req,res){
    try{
        let {key,value} = req.body;
        if(!key){
            throw new Error('please pass key');
        }
        if(!value){
            throw new Error('please pass value to with update');
        }
        res.status(200).send({data:await cache.update(key,value)});
    }catch(e){
        console.log(e);
        res.status(500).send({
            message:e.message,data:null
        })
    }
} 

async function removeItem(req,res){
    try{
        let {key} = req.body;
        if(!key){
            throw new Error('please pass key');
        }
        await cache.remove(key);
        res.status(200).send({message:'removed successfully!!!'});
    }catch(e){
        console.log(e);
        res.status(500).send({
            message:e.message
        })
    }
} 

async function emptyStore(req,res){
    try{
        await cache.flushAll();
        res.status(200).send({message:'removed successfully!!!'});
    }catch(e){
        console.log(e);
        res.status(500).send({
            message:e.message
        })
    }
} 