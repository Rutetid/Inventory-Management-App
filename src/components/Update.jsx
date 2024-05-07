import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateInventory = () => {
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [count, setCount] = useState("");
	const [rate, setRate] = useState("");
	const [sellOrderId, setSellOrderId] = useState("");
	const [items, setItems] = useState([]);

	useEffect(() => {
		// Fetch all items for dropdown
		axios
			.get("http://localhost:3000/items")
			.then((response) => {
				setItems(response.data);
			})
			.catch((error) => {
				console.error("Error fetching items:", error);
			});
	}, []);

	const handleItemChange = (itemId) => {
		// Fetch item details based on selected ID
		axios
			.get(`http://localhost:3000/${itemId}`)
			.then((response) => {
				const item = response.data;
				setId(item.id);
				setName(item.name);
				setCount(item.count);
				setRate(item.rate);
				setSellOrderId(item.sellOrderId);
			})
			.catch((error) => {
				console.error("Error fetching item:", error);
			});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`http://localhost:3000/update/${id}`, {
				name,
				count,
				rate,
				sellOrderId,
			});
			alert("Item updated successfully");
		} catch (error) {
			console.error("Error updating item:", error);
			alert("Failed to update item");
		}
	};

	return (
		<div>
			<h2>Update Inventory Item</h2>
			<label>
				Select Item:
				<select onChange={(e) => handleItemChange(e.target.value)}>
					<option value="">Select an item</option>
					{items.map((item) => (
						<option key={item.id} value={item.id}>
							{item.name}
						</option>
					))}
				</select>
			</label>
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
					Sell Order ID:
					<input
						type="text"
						value={sellOrderId}
						onChange={(e) => setSellOrderId(e.target.value)}
					/>
				</label>
				<button type="submit">Update Item</button>
			</form>
		</div>
	);
};

export default UpdateInventory;
