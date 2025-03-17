import { query } from "express";
import { SwaggerOptions } from "swagger-ui-express";

const swaggerDefinition: SwaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TimeBank API',
            version: '1.0.0',
            description: 'API documentation for TimeBank application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local Development Server',
            },
        ],
        tags: [
            {
                name: 'Authentication',
                description: 'Authentication endpoints',
            },
            {
                name: 'Services',
                description: 'Services endpoints',
            },
        ],
        paths: {
            '/signup': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Signup a new user',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object', 
                                    properties: {
                                        username: { 
                                            type: 'string',
                                            example: 'Gabs'
                                            },
                                        email: { 
                                            type: 'string', 
                                            example: 'gabs@gmail.com'
                                        },
                                        password: { 
                                            type: 'string',
                                            example: '12345678'
                                         },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'User created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'User registered successfully'
                                            },
                                            token: {
                                                type: 'string',
                                                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsImlhdCI6MTY3MzE5MzYwMCwiZXhwIjoxNjczMTk3MjAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Bad Request',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Email already in use'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '422': {
                            description: 'Validation error',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'An unexpected error ocurred'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: 'Internal Server error',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Internal server error'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/login': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Login a user',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: {
                                            type: 'string',
                                            example: 'gabs@gmail.com'
                                        },
                                        password: {
                                            type: 'string',
                                            example: '12345678'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'User logged in successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'User logged in successfully'
                                            },
                                            token: {
                                                type: 'string',
                                                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsImlhdCI6MTY3MzE5MzYwMCwiZXhwIjoxNjczMTk3MjAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Invalid credentials'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'User not found',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'User not found'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '422': {
                            description: 'Validation error',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'An unexpected error ocurred'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: 'Internal Server error',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Internal server error'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/search-services': {
                get: {
                    tags: ['Services'],
                    summary: 'Search for services',
                    parameters: [
                        {
                            name: 'query',
                            in: 'query',
                            required: true,
                            description: 'Search term for filtering services',
                            schema: {
                                type: 'string',
                                example: 'design'
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Services found',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            results: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        serviceName: {
                                                            type: 'string',
                                                            example: 'Design'
                                                        },
                                                        imageUrl: {
                                                            type: 'string',
                                                            format: 'uri',
                                                            example: 'https://s3.amazonaws.com/meu-bucket/images/design-grafico.jpg'
                                                        },
                                                        price_hour: {
                                                            type: 'integer',
                                                            example: 5
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'No services found',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'No services found'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: 'Internal Server error',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Internal server error'
                                            }
                                        }
                                    }
                                }
                            }
                        }   
                    }
                }
            }
        }
    },   
};

const swaggerOptions: SwaggerOptions = {
    definition: swaggerDefinition.definition,
    apis: ['./routes/*.ts'],
};

export default swaggerOptions;
