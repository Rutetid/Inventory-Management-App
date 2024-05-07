import React, { useState } from "react";
import axios from "axios";

const AddInventory = () => {
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [count, setCount] = useState("");
	const [rate, setRate] = useState("");
	const [purchaseOrderId, setPurchaseOrderId] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:3000/add", {
				id,
				name,
				count,
				rate,
				purchaseOrderId,
			});
			alert("Item added successfully");
			// Reset form after submission
			setId("");
			setName("");
			setCount("");
			setRate("");
			setPurchaseOrderId("");
		} catch (error) {
			console.error("Error adding item:", error);
			alert("Failed to add item");
		}
	};

	return (
		<div>
			<h2>Add Inventory Item</h2>
			<form onSubmit={handleSubmit}>
				<label>
					ID:
					<input
						type="text"
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
				</label>
				<label>
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label>
					Count:
					<input
						type="number"
						value={count}
						onChange={(e) => setCount(e.target.value)}
					/>
				</label>
				<label>
					Rate:
					<input
						type="number"
						value={rate}
						onChange={(e) => setRate(e.target.value)}
					/>
				</label>
				<label>
					Purchase Order ID:
					<input
						type="text"
						value={purchaseOrderId}
						onChange={(e) => setPurchaseOrderId(e.target.value)}
					/>
				</label>
				<button type="submit">Add Item</button>
			</form>
		</div>
	);
};

export default AddInventory;
