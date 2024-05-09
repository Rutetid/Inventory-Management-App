const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT ;
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

db.connect((err) => {
	if (err) {
		console.error("Error connecting to database:", err);
		return;
	}
	console.log("Connected to database");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.get("/items", (req, res) => {
	db.query("SELECT * FROM items", (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error" });
		}
		res.json(results);
	});
});

app.post("/add", (req, res) => {
	const { id, name, count, rate, purchaseOrderId } = req.body;
	const purchaseOrderValue = count * rate;

	db.query(
		"INSERT INTO items (id, name, stock, rate, purchase_order_id, total_purchase_value) VALUES (?, ?, ?, ?, ?, ?)",
		[id, name, count, rate, purchaseOrderId, purchaseOrderValue],
		(err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: "Internal server error" });
			}
			res.json({ message: "Item added successfully", id: result.insertId });
		},
	);
});

app.post("/sell", (req, res) => {
	const { id, name, count, rate, sellOrderId } = req.body;

	db.query("SELECT stock FROM items WHERE id = ?", [id], (err, result) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error" });
		}

		const currentStock = result[0].stock;

		if (currentStock < count) {
			return res.status(400).json({ message: "Not enough stock to sell" });
		}

		const totalSalesValue = count * rate;

		db.query(
			"UPDATE items SET stock = stock - ?, total_sales_value = total_sales_value + ?, sales_order_id = ? WHERE id = ?",
			[count, totalSalesValue, sellOrderId, id],
			(err, result) => {
				if (err) {
					console.error(err);
					return res.status(500).json({ message: "Internal server error" });
				}
				res.json({ message: "Item sold successfully", id: result.insertId });
			},
		);
	});
});

app.post("/purchase", (req, res) => {
	const { id, count, purchaseOrderId } = req.body;

	db.query("SELECT * FROM items WHERE id = ?", [id], (err, result) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error" });
		}

		if (result.length === 0) {
			return res.status(404).json({ message: "Item not found" });
		}

		const item = result[0];
		const newStock = item.stock + parseInt(count, 10); 
		const totalPurchaseValue = item.rate * parseInt(count, 10); 

		db.query(
			"UPDATE items SET stock = ?, total_purchase_value = total_purchase_value + ?, purchase_order_id = ? WHERE id = ?",
			[newStock, totalPurchaseValue, purchaseOrderId, id],
			(err, result) => {
				if (err) {
					console.error(err);
					return res.status(500).json({ message: "Internal server error" });
				}
				res.json({
					message: "Item purchased successfully",
					id: result.insertId,
				});
			},
		);
	});
});


