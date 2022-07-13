import React from "react";

import { useState } from "react";

import "./Style.css";

const MenuItem = ({ Icon, title }) => {
	const [style, setStyle] = useState({});

	const handleMouseEvent = (e) => {
		e.preventDefault();

		if (e.type === "mouseenter") {
			setStyle({
				backgroundColor: "#0B111D",
				fontWeight: 700,
				cursor: "pointer",
				color: "#F82FA3",
			});
		} else {
			setStyle({});
		}
	};

	return (
		<div
			className="item"
			style={style}
			onMouseEnter={(e) => handleMouseEvent(e)}
			onMouseLeave={(e) => handleMouseEvent(e)}
		>
			<Icon /> <p>{title}</p>
		</div>
	);
};

export default MenuItem;
