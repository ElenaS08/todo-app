const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');

const port = 8080;
const app = express();

// Express customizations
app.use(cors()); // enable cors
app.use(bodyParser.json()); // make sure the body of the request coming from the express server is transformed to JSON (for sequelize to understand)

// Create sequelize instance with configuration
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'sample.db',
	define: {
		timestamps: false,
	},
});

// Define a TODO sequelize entity
const Todo = sequelize.define('todo', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4, // custom ID automatically added to the database
		primaryKey: true,
		allowNull: false,
	},
	description: {
		type: Sequelize.TEXT,
		validate: {
			notEmpty: true, // validation that prevents empty descriptions to be saved to the database
		},
		allowNull: false,
	},
	completed: {
		type: Sequelize.BOOLEAN,
		defaultValue: false, // each TODO will be open/not complete by default
		allowNull: false,
	},
});

/* Express routes */

// simple get route to check the connection works (not used in the frontend app)
app.get('/status', async (req, res) => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}

	res.status(200).send('connection ok');
});

// get route to fetch all todos
app.get('/todos', async (req, res) => {
	try {
		const todos = await Todo.findAll();

		res.status(200).json(todos);
	} catch (error) {
		console.warn(error);
		res.status(500).json({ message: 'server error' });
	}
});

// post route to add a new todo
app.post('/create-todo', async (req, res) => {
	try {
		await Todo.create(req.body);

		res.status(201).json({ message: 'new todo created' });
	} catch (error) {
		console.warn(error);
		res.status(500).json({ message: 'cannot create the todo' });
	}
});

// post route to update the todo with a given ID
app.put('/todo/:id', async (req, res) => {
	try {
		// first try to get the specified todo
		const todo = await Todo.findByPk(req.params.id);

		if (todo) {
			try {
				await todo.update(req.body, { fields: ['completed'] }); // only the completed field can be updated
				res.status(202).json({ message: 'accepted' });
			} catch (error) {
				res.status(500).json({ message: 'todo could not be updated' });
			}
		} else {
			res.status(404).json({ message: 'todo not found' });
		}
	} catch (error) {
		console.warn(error);
		res.status(500).json({ message: 'server error' });
	}
});

// delete route to delete the todo with a given ID
app.delete('/todo/:id', async (req, res) => {
	try {
		// first try to get the specified todo
		const todo = await Todo.findByPk(req.params.id);

		if (todo) {
			await todo.destroy();
			res.status(202).json({ message: 'accepted' });
		} else {
			res.status(404).json({ message: 'not found' });
		}
	} catch (error) {
		console.warn(error);
		res.status(500).json({ message: 'server error' });
	}
});

// deploy the server and start sequelize's sync process (create the database and the TODO table)
app.listen(port, async () => {
	try {
		await sequelize.sync({ alter: true });
	} catch (error) {
		console.warn('Failed to sync database.');
	}

	console.log(`Listening on port ${port}...`);
});
