import React from "react";
import { useState, useEffect } from "react";

import Layout from "../../Components/Layout/Index";
import ContactList from "../../Components/ContactList/Index";
import CustomBackDrop from "../../Components/Backdrop/Index";
import CustomSnackBar from "../../Components/CustomSnackBar/Index";

import "./Style.css";

import { calculateAge } from "../../Utilities/handleDates";
import getFullUrl from "../../Utilities/getUrl";

const About = () => {
	const [persona, setPersona] = useState({});
	const [openBackDrop, setOpenBackDrop] = useState(false);
	const [error, setError] = useState("");

	const handleGetPersonaInfo = async () => {
		setError("");
		setOpenBackDrop(true);

		try {
			const resp = await fetch(getFullUrl("/persona/1"), {
				method: "GET",
			});

			const data = await resp.json();

			setOpenBackDrop(false);
			setPersona(data);
		} catch (error) {
			setOpenBackDrop(false);
			setError(error.message);
			return;
		}
	};

	useEffect(() => {
		handleGetPersonaInfo();
	}, []);

	return (
		<Layout>
			{persona.p_name ? (
				<div className="flex about_container">
					<div className="about_picture">
						<img
							className="img"
							src="https://th.bing.com/th/id/R.96f4799e78bbc5d3c2c54fad0bab73ce?rik=bYl2hAJtayyQ1A&pid=ImgRaw&r=0"
							alt="react"
						/>
					</div>
					<div className="about_content">
						<>
							<div className="flex about_details">
								<h3 className="ac_title">
									<span>{persona.p_name}</span> -{" "}
									{calculateAge(persona.birthday)} anos
								</h3>
								<span className="ac_job">{persona.job}</span>
								<p className="ac_location">
									{persona.city} - {persona.country}
								</p>
							</div>
							<div className="ac_description">{persona.about}</div>
						</>
					</div>

					<ContactList />
				</div>
			) : (
				<div className="no_content">...</div>
			)}

			<CustomBackDrop open={openBackDrop} />
			{error && <CustomSnackBar error={error} />}
		</Layout>
	);
};

export default About;
