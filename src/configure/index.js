import configureRoutes from './routes';
import establishedDbConnection from './db';
import configureModels from './models';
export default async function(app){
    
    establishedDbConnection();
    await configureModels();

    await configureRoutes(app);
}