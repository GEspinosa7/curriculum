import React from "react";
import { useState, useEffect } from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";
import ProjectItem from "../../Components/ProjectItem/Index";
import CustomBackDrop from "../../Components/Backdrop/Index";
import CustomSnackBar from "../../Components/CustomSnackBar/Index";

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [openBackDrop, setOpenBackDrop] = useState(false);
	const [error, setError] = useState("");

	const handleGetProjects = async () => {
		setError("");
		setOpenBackDrop(true);

		try {
			const resp = await fetch(`http://localhost:8000/projects/1`, {
				method: "GET",
			});

			const data = await resp.json();
			setOpenBackDrop(false);

			setProjects(data);
		} catch (error) {
			setOpenBackDrop(false);
			setError(error.message);
			return;
		}
	};

	useEffect(() => {
		handleGetProjects();
	}, []);

	return (
		<Layout>
			<div className="projects_container">
				{projects.length > 0 ? (
					projects.map((p) => (
						<ProjectItem
							id={p.id}
							title={p.title}
							description={p.p_description}
							activities={p.activities}
						/>
					))
				) : (
					<div className="no_content">...</div>
				)}
			</div>
			<CustomBackDrop open={openBackDrop} />
			{error && <CustomSnackBar error={error} />}
		</Layout>
	);
};

export default Projects;
