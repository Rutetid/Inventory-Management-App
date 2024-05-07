const express = require("express");
const db = require("./db.js");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// Get all items
app.get("/items", (req, res) => {
	db.query("SELECT * FROM Items", (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error" });
		}
		res.json(results);
	});
});

// Create a new item
app.post("/items", (req, res) => {
	const { name, stock_count } = req.body;
	if (!name || !stock_count) {
		return res
			.status(400)
			.json({ message: "Name and stock_count are required" });
	}
	db.query(
		"INSERT INTO Items (name, stock_count) VALUES (?, ?)",
		[name, stock_count],
		(err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: "Internal server error" });
			}
			res.json({ message: "Item created successfully", id: result.insertId });
		},
	);
});

// Update an item
app.put("/items/:id", (req, res) => {
	const { id } = req.params;
	const { name, stock_count } = req.body;
	if (!name || !stock_count) {
		return res
			.status(400)
			.json({ message: "Name and stock_count are required" });
	}
	db.query(
		"UPDATE Items SET name = ?, stock_count = ? WHERE id = ?",
		[name, stock_count, id],
		(err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: "Internal server error" });
			}
			if (result.affectedRows === 0) {
				return res.status(404).json({ message: "Item not found" });
			}
			res.json({ message: "Item updated successfully" });
		},
	);
});

// Delete an item
app.delete("/items/:id", (req, res) => {
	const { id } = req.params;
	db.query("DELETE FROM Items WHERE id = ?", [id], (err, result) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error" });
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Item not found" });
		}
		res.json({ message: "Item deleted successfully" });
	});
});

// PurchaseOrders endpoints

// Get all purchase orders
app.get("/purchase-orders", (req, res) => {
	db.query("SELECT * FROM PurchaseOrders", (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error" });
		}
		res.json(results);
	});
});

// Create a new purchase order
app.post("/purchase-orders", (req, res) => {
	const { item_id, quantity, unit_price } = req.body;
	if (!item_id || !quantity || !unit_price) {
		return res
			.status(400)
			.json({ message: "Item ID, quantity, and unit_price are required" });
	}
	db.query(
		"INSERT INTO PurchaseOrders (item_id, quantity, unit_price) VALUES (?, ?, ?)",
		[item_id, quantity, unit_price],
		(err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: "Internal server error" });
			}
			res.json({
				message: "Purchase order created successfully",
				id: result.insertId,
			});
		},
	);
});

// Update a purchase order
app.put("/purchase-orders/:id", (req, res) => {
	const { id } = req.params;
	const { item_id, quantity, unit_price } = req.body;
	if (!item_id || !quantity || !unit_price) {
		return res
			.status(400)
			.json({ message: "Item ID, quantity, and unit_price are required" });
	}
	db.query(
		"UPDATE PurchaseOrders SET item_id = ?, quantity = ?, unit_price = ? WHERE id = ?",
		[item_id, quantity, unit_price, id],
		(err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: "Internal server error" });
			}
			if (result.affectedRows === 0) {
				return res.status(404).json({ message: "Purchase order not found" });
			}
			res.json({ message: "Purchase order updated successfully" });
		},
	);
});

// Delete a purchase order
app.delete("/purchase-orders/:id", (req, res) => {
	const { id } = req.params;
	db.query("DELETE FROM PurchaseOrders WHERE id = ?", [id], (err, result) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error" });
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Purchase order not found" });
		}
		res.json({ message: "Purchase order deleted successfully" });
	});
});

// SalesOrders endpoints
// Implement similar CRUD operations for SalesOrders
// Get all sales orders
app.get("/sales-orders", (req, res) => {
	db.query("SELECT * FROM SalesOrders", (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error" });
		}
		res.json(results);
	});
});

// Create a new sales order
app.post("/sales-orders", (req, res) => {
	const { item_id, quantity, unit_price } = req.body;
	if (!item_id || !quantity || !unit_price) {
		return res
			.status(400)
			.json({ message: "Item ID, quantity, and unit_price are required" });
	}
	db.query(
		"INSERT INTO SalesOrders (item_id, quantity, unit_price) VALUES (?, ?, ?)",
		[item_id, quantity, unit_price],
		(err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: "Internal server error" });
			}
			res.json({
				message: "Sales order created successfully",
				id: result.insertId,
			});
		},
	);
});

// Update a sales order
app.put("/sales-orders/:id", (req, res) => {
	const { id } = req.params;
	const { item_id, quantity, unit_price } = req.body;
	if (!item_id || !quantity || !unit_price) {
		return res
			.status(400)
			.json({ message: "Item ID, quantity, and unit_price are required" });
	}
	db.query(
		"UPDATE SalesOrders SET item_id = ?, quantity = ?, unit_price = ? WHERE id = ?",
		[item_id, quantity, unit_price, id],
		(err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: "Internal server error" });
			}
			if (result.affectedRows === 0) {
				return res.status(404).json({ message: "Sales order not found" });
			}
			res.json({ message: "Sales order updated successfully" });
		},
	);
});

// Delete a sales order
app.delete("/sales-orders/:id", (req, res) => {
	const { id } = req.params;
	db.query("DELETE FROM SalesOrders WHERE id = ?", [id], (err, result) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error" });
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Sales order not found" });
		}
		res.json({ message: "Sales order deleted successfully" });
	});
});
