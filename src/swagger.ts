const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'TimeBank API',
        description: 'API documentation for TimeBank application',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Users',
            description: 'Users endpoint'
        }
    ],
    definitions: {
        // Add your model definitions here
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/server.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc); 