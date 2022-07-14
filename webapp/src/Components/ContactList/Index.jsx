import React from "react";
import { useState, useEffect } from "react";

import "./Style.css";

import ContactListItem from "../ContactListItem/Index";
import CustomSnackBar from "../CustomSnackBar/Index";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import getFullUrl from "../../Utilities/getUrl";

const ContactList = () => {
	const [error, setError] = useState("");
	const [contact, setContact] = useState([]);

	const handleGetContactList = async () => {
		setError("");
		try {
			const resp = await fetch(getFullUrl("/contacts/1"), {
				method: "GET",
			});

			const data = await resp.json();

			setContact(data);
		} catch (error) {
			setError(error.message);
			return;
		}
	};

	useEffect(() => {
		handleGetContactList();
	}, []);

	const handleIcon = (title) => {
		if (title === "email") return MailOutlineIcon;
		if (title === "linkedin") return LinkedInIcon;
		if (title === "github") return GitHubIcon;
	};

	return (
		<div className="contact_list">
			{contact.map((c) =>
				c.title === "email" ? (
					<a href={`mailto:${c.link}`}>
						<ContactListItem Icon={handleIcon(c.title)} />
					</a>
				) : (
					<a href={c.link}>
						<ContactListItem Icon={handleIcon(c.title)} />
					</a>
				)
			)}

			{error && <CustomSnackBar error={error} />}
		</div>
	);
};

export default ContactList;
