import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import connection from './config/connect.js';
import routes from './routers/index.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// static file
app.use(express.static(path.join(__dirname, 'public')));
//

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
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

// const file = fs.readFileSync('./swagger.yaml', 'utf8');
// const file = fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8');
// const swaggerDocument = YAML.parse(file);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(8080, () => {
	console.log('Nodejs app is running on the port 8080');
	connection.connect((err) => {
		if (err) {
			console.log('Database disconnect', err);
		} else {
			console.log('Database connected');
		}
	});
});
