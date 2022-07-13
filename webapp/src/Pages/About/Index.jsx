import React from "react";
import { useState, useEffect } from "react";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import Layout from "../../Components/Layout/Index";
import ContactListItem from "../../Components/ContactListItem/Index";

import "./Style.css";

import { calculateAge } from "../../Utilities/handleDates";

const About = () => {
	const [persona, setPersona] = useState({});

	const handleGetPersonaInfo = async () => {
		const resp = await fetch(`http://localhost:8000/persona/1`, {
			method: "GET",
		});

		const data = await resp.json();
		setPersona(data);
	};

	useEffect(() => {
		handleGetPersonaInfo();
	}, []);

	return (
		<Layout>
			<div className="flex about_container">
				<div className="about_picture">
					<img
						className="img"
						src="https://th.bing.com/th/id/R.96f4799e78bbc5d3c2c54fad0bab73ce?rik=bYl2hAJtayyQ1A&pid=ImgRaw&r=0"
						alt="react"
					/>
				</div>
				<div className="about_content">
					<div className="flex about_details">
						<h3 className="ac_title">
							<span>{persona.p_name}</span> - {calculateAge(persona.birthday)}{" "}
							anos
						</h3>
						<span className="ac_job">{persona.job}</span>
						<p className="ac_location">
							{persona.city} - {persona.country}
						</p>
					</div>
					<div className="ac_description">{persona.about}</div>
				</div>
				<div className="about_contact_list">
					<ContactListItem Icon={MailOutlineIcon} />
					<ContactListItem Icon={LinkedInIcon} />
					<ContactListItem Icon={GitHubIcon} />
				</div>
			</div>
		</Layout>
	);
};

export default About;
