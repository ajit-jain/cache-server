# CORS OPTIONS
export ALLOW_CORS_ORIGIN=*
export ALLOW_CORS_METHODS=OPTIONS,GET,POST,PUT,PATCH,DELETE

#SERVER PORT 
export PORT=3000

#Mongo config
export MONGO_URL=mongodb://localhost:27017
export MONGO_DB_NAME=cacheStore


#start server
nodemon server.js