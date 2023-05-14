import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import PostRouter from './routes/posts.js';
import UserRouter from './routes/users.js';
dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(morgan('dev'));
app.use(cors());

mongoose
	.connect(process.env.URL_DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connect database successfully!!'))
	.catch((err) => console.error('Connect database failed ', err));

app.use('/posts', PostRouter);
app.use('/user', UserRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
