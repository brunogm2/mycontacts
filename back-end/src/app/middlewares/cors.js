module.exports = (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3006');
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Max-Age', '10');

    next();
}