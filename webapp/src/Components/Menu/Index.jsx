import React from "react";

import "./Style.css";

import CustomLink from "../CustomLink/Index";

import Avatar from "../Avatar/Index";
import MenuItem from "../MenuItem/Index";

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
				<CustomLink to="/">
					<MenuItem Icon={AttributionOutlinedIcon} title={"About"} path="/" />
				</CustomLink>

				<CustomLink to="/ads">
					<MenuItem Icon={MenuBookOutlinedIcon} title={"Academic Degrees"} />
				</CustomLink>

				<CustomLink to="/certificates">
					<MenuItem Icon={BadgeOutlinedIcon} title={"Certificates"} />
				</CustomLink>

				<CustomLink to="/skills">
					<MenuItem Icon={CodeOutlinedIcon} title={"Skills"} />
				</CustomLink>

				<CustomLink to="/experience">
					<MenuItem Icon={WorkOutlineOutlinedIcon} title={"Experience"} />
				</CustomLink>

				<CustomLink to="/projects">
					<MenuItem Icon={DoneAllOutlinedIcon} title={"Projects"} />
				</CustomLink>
			</div>
		</aside>
	);
};

export default Menu;
