import React from "react";

import { Link, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({ children, to, ...props }) => {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });

	const enableStyle = {
		backgroundColor: "#0B111D",
		fontWeight: 700,
		borderRadius: "50px 0px 0px 50px",
		width: "100%",
		marginLeft: "10px",
	};

	const disableStyle = {
		color: "#FFFFFF",
		backgroundColor: "transparent",
	};

	const style = match ? enableStyle : disableStyle;

	return (
		<div style={style}>
			<Link
				style={{ textDecoration: "none", color: "white" }}
				to={to}
				{...props}
			>
				{children}
			</Link>
		</div>
	);
};

export default CustomLink;
