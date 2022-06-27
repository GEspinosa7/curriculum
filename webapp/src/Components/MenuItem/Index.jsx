import { useState } from "react";

import "./Style.css";

const MenuItem = ({ Icon, title }) => {
	const [style, setStyle] = useState({
		color: "#FFFFFF",
		backgroundColor: "",
		fontWeight: 400,
		cursor: "default",
	});

	const handleMouseEvent = (e) => {
		if (e.type === "mouseenter") {
			setStyle({
				color: "#199BD3",
				backgroundColor: "#FFFFFF",
				fontWeight: 700,
				cursor: "pointer",
			});
		} else {
			setStyle({
				color: "#FFFFFF",
				backgroundColor: "",
				fontWeight: 400,
				cursor: "default",
			});
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
