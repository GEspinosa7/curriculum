import React from "react";
import { useState, useEffect } from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";

const Skills = () => {
	const [skills, setSkills] = useState([]);
	const [languages, setLanguages] = useState([]);

	const handleGetSkills = async () => {
		const resp = await fetch(`http://localhost:8000/skills/1`, {
			method: "GET",
		});

		const data = await resp.json();
		setSkills(data);
	};

	const handleGetLanguages = async () => {
		const resp = await fetch(`http://localhost:8000/languages/1`, {
			method: "GET",
		});

		const data = await resp.json();
		setLanguages(data);
	};

	useEffect(() => {
		handleGetSkills();
		handleGetLanguages();
	}, []);

	return (
		<Layout>
			<div className="skills_container flex">
				<div className="skills">
					{skills.map((s) => (
						<div className="skill flex" key={s.id}>
							{/* <img src={s.img} alt={s.title} /> */}
							<p>{s.title}</p>
						</div>
					))}
				</div>
				<div className="languages flex">
					{languages.map((l) => (
						<div className="language flex" key={l.id}>
							<p>{l.title}</p>
							<p>{l.fluency}</p>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Skills;
