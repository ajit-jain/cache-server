const {
    PORT = 8080,
    BODY_LIMIT = '5mb',
    ALLOW_CORS_ORIGIN = '*',
    ALLOW_CORS_METHODS = ''
} = process.env

export default {
    PORT,
    BODY_LIMIT,
    ALLOW_CORS_ORIGIN,
    ALLOW_CORS_METHODS
}