import cookieParser from 'cookie-parser';
import express from 'express';
import routes from './routers/index.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import cors from 'cors';
import morgan from 'morgan';
import connection from './config/connect.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// static file
app.use(express.static(path.join(__dirname, 'public')));
//

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// template engine
app.engine(
	'hbs',
	engine({
		extname: '.hbs',
	})
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// routes
routes(app);
//

app.listen(3000, () => {
	console.log('App listen port 3000');
	connection.connect((err) => {
		if (err) {
			console.log('Database disconnect', err);
		} else {
			console.log('Database connected');
		}
	});
});
