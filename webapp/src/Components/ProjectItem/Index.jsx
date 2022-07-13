import React from "react";

import "./Style.css";

export const ProjectItem = ({ id, title, description, activities }) => {
	return (
		<div key={id} className="project_link">
			<div className="container_project_link">
				<div className="project_link_shadow">
					<div className="title_container">{title}</div>
					<div className="desc_container">{description}</div>
				</div>
			</div>
			<div className="activities">
				<div className="act_project_title">{title}</div>
				<div className="act_activities_desc"> {activities}</div>
			</div>
		</div>
	);
};

export default ProjectItem;
