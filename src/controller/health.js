export {
    heartbeat
}

async function heartbeat(req,res){
    res.status(200).send({"success":true,"message":"server up and running.."});
} 