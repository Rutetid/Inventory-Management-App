import React, { useState } from "react";
import axios from "axios";
import "./add.css";

const AddInventory = () => {
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [count, setCount] = useState("");
	const [rate, setRate] = useState("");
	const [purchaseOrderId, setPurchaseOrderId] = useState("");
	const [error, setError] = useState("");

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
		<div className="page-content">
			<div className="form-v10-content">
				<form className="form-detail" onSubmit={handleSubmit}>
					<div className="form-right">
						<h2>Add Inventory Item</h2>
						<div className="form-row">
							<input
								type="text"
								name="street"
								className="street"
								placeholder="Item ID"
								value={id}
								onChange={(e) => setId(e.target.value)}
								required
							/>
						</div>
						<div className="form-row">
							<input
								type="text"
								name="additional"
								className="additional"
								placeholder="Item Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
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
						<div className="form-group">
							<div className="form-row form-row-1">
								<input
									type="text"
									name="code"
									className="code"
									placeholder="Rate"
									value={rate}
									onChange={(e) => setRate(e.target.value)}
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
								value="Add Item"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddInventory;
