import configureRoutes from './routes';

export default async function(app){
    await configureRoutes(app);
}