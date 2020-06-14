import mongoose, { mongo } from 'mongoose';

const storeSchema = new mongoose.Schema({
    key:{ 
        type:String,
        unique:true,
        required:true
    },
    value:{
        type:String,
        required:true
    },
    ttl:Number
},{
    timestamps:true,
    versionKey:false
});

export default mongoose.model('store',storeSchema,'store');