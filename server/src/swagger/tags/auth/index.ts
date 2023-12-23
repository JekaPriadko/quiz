export default {
  '/api/v1/auth/signup': {
    post: {
      tags: ['Auth'],
      description: 'Create new user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  example: 'string',
                },
                email: {
                  example: 'string',
                },
                password: {
                  example: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  user: {
                    type: 'object',
                  },
                  accessToken: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/responses/validationError',
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/auth/signin': {
    post: {
      tags: ['Auth'],
      description: 'Sign in user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  example: 'string',
                },
                password: {
                  example: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  user: {
                    type: 'object',
                  },
                  accessToken: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/responses/validationError',
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/auth/refresh': {
    get: {
      tags: ['Auth'],
      description: '',
      responses: {
        '201': {
          description: 'Created',
          content: {
            'application/json': {
              schema: {
                properties: {
                  accessToken: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthenticated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/responses/error',
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/auth/logout': {
    get: {
      tags: ['Auth'],
      description: '',
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  success: {
                    type: 'boolean',
                    examples: ['true'],
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthenticated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/responses/error',
              },
            },
          },
        },
        '404': {
          description: 'Not Found User',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/responses/error',
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: true,
        },
      ],
    },
  },
};
