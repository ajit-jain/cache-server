import configure from './configure';
export default async function(app){
    await configure(app);
    console.log('app configured');
}