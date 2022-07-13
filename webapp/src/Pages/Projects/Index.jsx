import React from "react";
import { useState, useEffect } from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";

import ProjectItem from "../../Components/ProjectItem/Index";

const Projects = () => {
	const [projects, setProjects] = useState([]);

	const handleGetProjects = async () => {
		const resp = await fetch(`http://localhost:8000/projects/1`, {
			method: "GET",
		});

		const data = await resp.json();
		setProjects(data);
	};

	useEffect(() => {
		handleGetProjects();
	}, []);

	return (
		<Layout>
			<div className="projects_container">
				{projects.map((p) => (
					<ProjectItem
						id={p.id}
						title={p.title}
						description={p.p_description}
						activities={p.activities}
					/>
				))}
			</div>
		</Layout>
	);
};

export default Projects;
