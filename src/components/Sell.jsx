import React, { useState } from "react";
import axios from "axios";

const SellInventory = () => {
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [count, setCount] = useState("");
	const [rate, setRate] = useState("");
	const [sellOrderId, setSellOrderId] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:3000/sell", {
				id,
				name,
				count,
				rate,
				sellOrderId,
			});
			alert("Item sold successfully");
			// Reset form after submission
			setId("");
			setName("");
			setCount("");
			setRate("");
			setSellOrderId("");
		} catch (error) {
			console.error("Error selling item:", error);
			alert("Failed to sell item");
		}
	};

	return (
		<div>
			<h2>Sell Inventory Item</h2>
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
				<button type="submit">Sell Item</button>
			</form>
		</div>
	);
};

export default SellInventory;
