import mongoose, { mongo } from 'mongoose';

const storeSchema = new mongoose.Schema({
    cache:{}
},{
    timestamps:true,
    versionKey:false
});

export default mongoose.model('store',storeSchema,'store');