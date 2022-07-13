import React from "react";
import { useState, useEffect } from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";
import CustomBackDrop from "../../Components/Backdrop/Index";
import CustomSnackBar from "../../Components/CustomSnackBar/Index";

const Skills = () => {
	const [skills, setSkills] = useState([]);
	const [languages, setLanguages] = useState([]);
	const [openBackDrop, setOpenBackDrop] = useState(false);
	const [error, setError] = useState("");

	const handleGetSkills = async () => {
		setError("");
		setOpenBackDrop(true);

		try {
			const skills = await fetch(`http://localhost:8000/skills/1`, {
				method: "GET",
			});

			const skillsData = await skills.json();
			setSkills(skillsData);
		} catch (error) {
			setOpenBackDrop(false);
			setError(error.message);
			return;
		}

		try {
			const languages = await fetch(`http://localhost:8000/languages/1`, {
				method: "GET",
			});

			const languagesData = await languages.json();
			setLanguages(languagesData);
		} catch (error) {
			setOpenBackDrop(false);
			setError(error.message);
			return;
		}

		setOpenBackDrop(false);
	};

	useEffect(() => {
		handleGetSkills();
	}, []);

	return (
		<Layout>
			<div className="skills_container flex">
				<div className="skills">
					{skills.length > 0 ? (
						skills.map((s) => (
							<div className="skill flex" key={s.id}>
								{/* <img src={s.img} alt={s.title} /> */}
								<p>{s.title}</p>
							</div>
						))
					) : (
						<div className="no_content">...</div>
					)}
				</div>
				<div className="languages flex">
					{languages.length > 0 ? (
						languages.map((l) => (
							<div className="language flex" key={l.id}>
								<p>{l.title}</p>
								<p>{l.fluency}</p>
							</div>
						))
					) : (
						<div className="no_content">...</div>
					)}
				</div>
			</div>
			<CustomBackDrop open={openBackDrop} />
			{error && <CustomSnackBar error={error} />}
		</Layout>
	);
};

export default Skills;
