import swaggerJsDoc from 'swagger-jsdoc';
import tagsAuth from './tags/auth';
import tagsTest from './tags/content';

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    openapi: '3.1.0',
    info: {
      title: 'Quiz',
      version: '1.0.0',
      description: 'API documentation for quiz',
      contact: {
        email: 'jeka.priadko@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '',
      },
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Operations about user auth',
      },
      {
        name: 'Content',
        description: 'Test routes for content and role',
      },
    ],
    paths: {
      ...tagsAuth,
      ...tagsTest,
    },
    components: {
      responses: {
        error: {
          properties: {
            message: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
          },
        },
        validationError: {
          properties: {
            message: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            payload: {
              type: 'object',
              properties: {
                violations: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      instancePath: 'string',
                      schemaPath: 'string',
                      keyword: 'string',
                      message: 'format',
                      params: {
                        type: 'object',
                        default: {
                          format: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(options);

export default swaggerDocs;
