import swaggerJsdoc from 'swagger-jsdoc';

const getServers = () => {
  const servers: Array<{ url: string; description: string }> = [];

  if (process.env.NODE_ENV === 'production') {
    servers.push({
      url: process.env.API_URL || 'https://jivara-production.up.railway.app',
      description: 'Production server',
    });
  } else {
    servers.push({
      url: `http://localhost:${process.env.PORT || 3001}`,
      description: 'Development server',
    });
  }

  return servers;
};

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jivara API',
      version: '1.0.0',
      description: 'RESTful API Jivara',
      contact: {
        name: 'Jivara',
      },
    },
    servers: getServers(),
  },
  apis: ['./src/app.ts', './src/routes/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
