import { useState } from "react";

import "./Style.css";

const MenuItem = ({ Icon, title }) => {
	const [style, setStyle] = useState({ color: "#FFFFFF" });

	const handleMouseEvent = (e) => {
		e.preventDefault();

		if (e.type === "mouseenter") {
			setStyle({
				color: "#FFFFFF",
				backgroundColor: "#353253",
				fontWeight: 700,
				cursor: "pointer",
			});
		} else {
			setStyle({ color: "#FFFFFF" });
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
