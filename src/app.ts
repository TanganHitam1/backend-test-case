import express, { Application, NextFunction, Request, Response } from 'express';
import bookRoutes from './application/book/book.routes';
import memberRoutes from './application/member/member.routes';
import borrowRoutes from './application/borrow/borrow.routes';
import { setupSwagger } from './utils/swagger';
import bodyParser from 'body-parser';

const PORT = 3000


export class App{
    public app:Application;
    private server: any;


    constructor() {
      this.app = express();
      this.middleware();
      this.routes();
      this.setupSwagger();
    }

    protected plugins(): void{
      this.app.use(bodyParser.json());
    }

    protected routes(): void{
      this.app.route('/').get((req: Request, res: Response) => {
        res.send('Hello World');
      });

      this.app.use('/books', bookRoutes)
      this.app.use('/members', memberRoutes)
      this.app.use('/borrow', borrowRoutes)
    }

    protected setupSwagger(): void{
      setupSwagger(this.app);
    }

    protected middleware(): void {
      this.app.use(bodyParser.json());
      this.app.use(express.json());
      this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).json({ message: "Internal Server Error" });
        });
    }

    public listen(port: number): void {
      this.server = this.app.listen(port, () => {
          console.log(`Server is running on http://localhost:${port}`);
          console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
      });
  }
    public close() {
      this.server.close();
  }
}

if (require.main === module) {
  const app = new App();
  app.listen(PORT);
}