import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes';

dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client`));

app.use('/api', routes);
app.use('/*', (req, res) => res.status(200).json({ message: 'Route not available' }));

app.listen(PORT);

export default app;
