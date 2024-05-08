import React, { useState, useEffect } from "react";
import "./styles.css";

const Inventory = () => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/items")
			.then((response) => response.json())
			.then((data) => setItems(data))
			.catch((error) => console.error("Error fetching items:", error));
	}, []);

	return (
		<div>
			<br /> <br /><br /><br /><br /> <br /> <br />
			<h1>Inventory</h1>
			<br /> <br />
			<table>
				<thead>
					<tr>
						<th>Item ID</th>
						<th>Item Name</th>
						<th>Stock</th>
						<th>Rate</th>
						<th>Purchase Order ID</th>
						<th>Sales Order ID</th>
						<th>Total Purchase Value</th>
						<th>Total Sales Value</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.id}>
							<td>{item.id}</td>
							<td>{item.name}</td>
							<td>{item.stock}</td>
							<td>{item.rate}</td>
							<td>{item.purchase_order_id}</td>
							<td>{item.sales_order_id}</td>
							<td>{item.total_purchase_value}</td>
							<td>{item.total_sales_value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Inventory;
