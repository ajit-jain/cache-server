import path from 'path';
import fs from 'fs';
import util from 'util';
const lstat = util.promisify(require('fs').lstat);
async function configureModels(app){
    const modelDirectoryPath = './../models';
    const models = await initializeDirectoryModels(modelDirectoryPath);
    console.log('Models:: ', models);
    return models;
}
async function initializeDirectoryModels(modelDirectoryPath){
    let modelsList = await fs.readdirSync(path.resolve(__dirname, modelDirectoryPath));
    console.log('models are: ', modelsList);
    let models = [];
    for(let model of modelsList) {
        let modelPath = `${modelDirectoryPath}/${model}`;
        console.log(path.resolve(__dirname, modelPath));
        if((await lstat(path.resolve(__dirname, modelPath))).isDirectory()){
            models.push(...(await initializeDirectoryModels(modelPath)));
        }else 
            models.push(require(modelPath));
    }
    return models;
}
export default configureModels;