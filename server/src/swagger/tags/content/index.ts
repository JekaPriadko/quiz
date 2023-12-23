export default {
  '/api/v1/content/all': {
    get: {
      tags: ['Content'],
      description: '',
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  payload: {
                    type: 'string',
                    examples: ['Public Content.'],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/content/user': {
    get: {
      tags: ['Content'],
      description: '',
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  payload: {
                    type: 'string',
                    examples: ['User Content.'],
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
      security: [
        {
          bearerAuth: true,
        },
      ],
    },
  },
  '/api/v1/content/admin': {
    get: {
      tags: ['Content'],
      description: '',
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  payload: {
                    type: 'string',
                    examples: ['Admin Content.'],
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
        '403': {
          description: 'Permission',
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
          bearerAuth: [],
        },
      ],
    },
  },
};
