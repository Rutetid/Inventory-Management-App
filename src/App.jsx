import React from "react";
import Navbar from "./components/Navbar";
import Inventory from "./components/Inventory";
import AddInventory from "./components/Add";
import SellInventory from "./components/Sell";
import UpdateInventory from "./components/Update";



const App = () => {
	return (
		<div>
			<Navbar />
			<Inventory />
			<AddInventory />
			<SellInventory />
			<UpdateInventory />
		</div>
	);
};

export default App;
