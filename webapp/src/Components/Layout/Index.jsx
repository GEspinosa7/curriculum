import "./Style.css";

import Menu from "../Menu/Index";

const Layout = ({ children }) => {
	return (
		<div className="layout">
			<Menu />
			<div className="content">{children}</div>
		</div>
	);
};

export default Layout;
