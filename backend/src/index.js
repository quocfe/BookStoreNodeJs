import cookieParser from 'cookie-parser';
import express from 'express';
import routes from './routers/index.js';
import db from './config/connect.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// static file
app.use(express.static(path.join(__dirname, 'public')));
//

app.use(express.json());
app.use(cookieParser());

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
	db.connect();
	console.log('connected');
});
