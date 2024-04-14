const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./quotes.db", sqlite.OPEN_READWRITE, (err) => {
	if (err) return console.error(err);
});

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));

app.use(bodyParser.json());

// post request
app.post("/quote", (req, res) => {
	try {
		const { movie, quote, character } = req.body;
		const sql = `INSERT INTO quotes(movie, quote, character) VALUES (?,?,?)`; // Changed table name to quotes
		db.run(sql, [movie, quote, character], (err) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ status: 500, success: false, error: "Internal Server Error" });
			}
			console.log("Success");
			return res.json({
				status: 200,
				success: true,
			});
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({ status: 400, success: false, error: "Bad Request" });
	}
});

app.get("/quote", (req, res) => {
	sql = `SELECT * FROM quotes`;
	try{
		db.all(sql, (err, data) => {
			if (err) return console.error(err);
			return res.json({
				status: 200,
				success: true,
				data: data
			});
		})
	} catch (error){
		console.error(error);
		return res.status(400).json({ status: 400, success: false, error: "Bad Request" });
	}
})