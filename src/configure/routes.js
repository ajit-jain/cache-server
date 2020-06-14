import path from 'path';
import fs from 'fs';
async function configureRoutes(app){
    const routeDirectoryPath = path.resolve(__dirname, './../routes');
    const routeFiles = await fs.readdirSync(routeDirectoryPath);
    for (let routeFile of routeFiles) {
        const fileData = require(`${routeDirectoryPath}/${routeFile}`);
        const prefix = fileData.default['prefix'];
        console.log(fileData.default);
        if (!prefix) throw new Error('Every route file must have an prefix!!');

        app.use(fileData.default.prefix,fileData.default.router);

    }
}
export default configureRoutes;