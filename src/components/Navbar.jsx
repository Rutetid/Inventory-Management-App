import React from "react";
import "./Navbar.css";

const Navbar = () => {
	return (
		<nav>
			<ul className="navbar">
				<li>
					<button>Inventory</button>
				</li>
				<li>
					<button>Add</button>
				</li>
				<li>
					<button>Sell</button>
				</li>
				<li>
					<button>Update</button>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
