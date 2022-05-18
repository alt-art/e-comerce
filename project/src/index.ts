import 'dotenv/config';
import express, { Application } from 'express';
import helmet from 'helmet';
import console from 'console';
import router from './router';

const PORT: string = process.env.PORT || '3000';

const app: Application = express();

app.use(helmet());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
