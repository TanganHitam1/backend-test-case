import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
import { Application } from 'express';

export const setupSwagger = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('Swagger Docs available at http://localhost:3000/api-docs');
};
