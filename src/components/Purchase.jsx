import React, { useState, useEffect } from "react";
import axios from "axios";
import "./add.css";

const PurchaseInventory = () => {
	const [items, setItems] = useState([]);
	const [selectedItemId, setSelectedItemId] = useState("");
	const [selectedItemName, setSelectedItemName] = useState("");
	const [count, setCount] = useState("");
	const [purchaseOrderId, setPurchaseOrderId] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:3000/items")
			.then((response) => {
				setItems(response.data);
			})
			.catch((error) => {
				console.error("Error fetching items:", error);
			});
	}, []);

	const handleItemChange = (e) => {
		const selectedItem = items.find(
			(item) => item.id.toString() === e.target.value,
		);
		if (selectedItem) {
			setSelectedItemId(selectedItem.id);
			setSelectedItemName(`${selectedItem.id} - ${selectedItem.name}`);
		} else {
			setSelectedItemId("");
			setSelectedItemName("");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:3000/purchase", {
				id: selectedItemId,
				name: selectedItemName,
				count,
				purchaseOrderId,
			});
			alert("Item purchased successfully");
			setSelectedItemId("");
			setSelectedItemName("");
			setCount("");
			setPurchaseOrderId("");
		} catch (error) {
			console.error("Error purchasing item:", error);
			alert("Failed to purchase item");
		}
	};

	return (
		<div className="page-content">
			<div className="form-v10-content">
				<form className="form-detail" onSubmit={handleSubmit}>
					<div className="form-right">
						<h2>Purchase Inventory Item</h2>
						<div className="form-row">
							<select
								name="itemId"
								className="item-dropdown"
								value={selectedItemId}
								onChange={handleItemChange}
								required
							>
								<option value="">Select Item</option>
								{items.map((item) => (
									<option
										key={item.id}
										value={item.id}
									>{`${item.id} - ${item.name}`}</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<div className="form-row form-row-1">
								<input
									type="text"
									name="zip"
									className="zip"
									placeholder="Count"
									value={count}
									onChange={(e) => setCount(e.target.value)}
									required
								/>
							</div>
						</div>
						<div className="form-row">
							<input
								type="text"
								name="your_email"
								id="your_email"
								className="input-text"
								placeholder="Purchase Order ID"
								value={purchaseOrderId}
								onChange={(e) => setPurchaseOrderId(e.target.value)}
							/>
						</div>
						<div className="form-row-last">
							<input
								type="submit"
								name="register"
								className="register"
								value="Purchase Item"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PurchaseInventory;
