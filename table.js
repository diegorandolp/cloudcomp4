const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database('./quotes.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
	if (err) return console.error(err);
});

const sql = `CREATE TABLE IF NOT EXISTS quotes(ID INTEGER PRIMARY KEY, movie TEXT, quote TEXT, character TEXT)`;
db.run(sql, [], function (err) {
	if (err) {
		return console.error("Error creating table:", err.message);
	}
	console.log("Table 'quotes' created successfully.");
});
