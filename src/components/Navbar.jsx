import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {


	return (
		<nav >
			<div className="nav-content">
				
				<div className="logo">
					<Link to="/">InventoryXpert</Link>
				</div>
				<ul className="nav-links">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/add">Add</Link>
					</li>
					<li>
						<Link to="/sell">Sell</Link>
					</li>
					<li>
						<Link to="/update">Update</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
