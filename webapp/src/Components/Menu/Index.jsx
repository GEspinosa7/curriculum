import Avatar from "../Avatar/Index";
import MenuItem from "../MenuItem/Index";

import "./Style.css";

import AttributionOutlinedIcon from "@mui/icons-material/AttributionOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

const Menu = () => {
	return (
		<aside className="menu">
			<Avatar></Avatar>

			<div className="menu_items">
				<MenuItem Icon={AttributionOutlinedIcon} title={"About"} />
				<MenuItem Icon={ChatOutlinedIcon} title={"Languages"} />
				<MenuItem Icon={MenuBookOutlinedIcon} title={"Academic Degrees"} />
				<MenuItem Icon={BadgeOutlinedIcon} title={"Certificates"} />
				<MenuItem Icon={CodeOutlinedIcon} title={"Skills"} />
				<MenuItem Icon={WorkOutlineOutlinedIcon} title={"Experience"} />
				<MenuItem Icon={DoneAllOutlinedIcon} title={"Projects"} />
			</div>
		</aside>
	);
};

export default Menu;
