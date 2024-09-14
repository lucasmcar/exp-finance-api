
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sua API',
      version: '1.0.0',
      description: 'Documentação da API Exp Finance',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Servidor local',
        version: "1.0.0"
      },
    ],
  },
  apis: ['./src/routes/v1/*.ts'], // Caminho para os arquivos de rotas onde as anotações Swagger serão feitas
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express, port: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs disponíveis em http://localhost:${port}/api-docs`);
};