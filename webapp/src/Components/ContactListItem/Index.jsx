import React from "react";

import { useState } from "react";

const ContactListItem = ({ Icon }) => {
	const [style, setStyle] = useState({
		color: "#FFFFFF",
		cursor: "default",
	});

	const handleMouseEvent = (e) => {
		if (e.type === "mouseenter") {
			setStyle({
				color: "#8e31ff",
				cursor: "pointer",
			});
		} else {
			setStyle({
				color: "#FFFFFF",
				cursor: "default",
			});
		}
	};

	return (
		<div
			style={style}
			onMouseEnter={(e) => handleMouseEvent(e)}
			onMouseLeave={(e) => handleMouseEvent(e)}
		>
			<Icon />
		</div>
	);
};

export default ContactListItem;
