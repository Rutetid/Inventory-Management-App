import React from "react";
import Navbar from "./components/Navbar";
import Inventory from "./components/Inventory";
import AddInventory from "./components/Add";
import SellInventory from "./components/Sell";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PurchaseInventory from "./components/Purchase";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Navbar />
				<Inventory />
			</>
		),
	},

	{
		path: "/add",
		element: (
			<>
				<Navbar />
				<AddInventory />
			</>
		),
	},

	{
		path: "/sell",
		element: (
			<>
				<Navbar />
				<SellInventory />
			</>
		),
	},

	{
		path: "/purchase",
		element: (
			<>
				<Navbar />
				<PurchaseInventory />
			</>
		),
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
