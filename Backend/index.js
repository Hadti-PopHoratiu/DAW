const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json());

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog'
});

connection.connect();

app.get('/api/article', function(req, res) {
	let query = 'SELECT * FROM articles';
	if (typeof req.query.category_id !== 'undefined') {
		query += ` WHERE category_id = ${req.query.category_id}`;	
	}
	connection.query(query, function (err, rows, fields) {
		if (err) 
			throw err
		return res.send(rows);
	});	
});

app.get('/api/article/:id', function(req, res) {
	let query = `SELECT * FROM articles WHERE id = ${req.params.id}`;
	connection.query(query, function (err, rows, fields) {
		if (err) 
			throw err
		return res.send(rows);
	});
});

app.get('/api/category', function(req, res) {
	let query = 'SELECT * FROM categories';
	connection.query(query, function (err, rows, fields) {
		if (err) 
			throw err
		return res.send(rows);
	});	
});

app.delete('/api/article/:id', function(req, res) {
	let query = `DELETE FROM articles WHERE id = ${req.params.id}`;
	connection.query(query, function (err, result) {
		if (err) throw err;
	});
	return res.send('deleted');
});

app.post('/api/article', function(req, res) {
	let query = `insert into articles (title , author, insert_date, category_id, image, description) values ('${req.body.title}', '${req.body.author}', '${req.body.insert_date}', '${req.body.category_id}', '${req.body.image}', '${req.body.description}')`;
	connection.query(query, function (err, result) {
		if (err) throw err;
	});
	return res.send('inserted');
});

app.put('/api/article/:id', function(req, res) {
	let query = `UPDATE articles SET title = '${req.body.title}', author = '${req.body.author}', insert_date = '${req.body.insert_date}', category_id = '${req.body.category_id}', image = '${req.body.image}', description = '${req.body.description}' WHERE id = '${req.params.id}'`;
	connection.query(query, function (err, result) {
		if (err) throw err;
	});
	return res.send('updated');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

