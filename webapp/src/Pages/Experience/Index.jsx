import React from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";

const Experience = () => {
	const exp = [
		{
			id: 1,
			title: "experience",
			company: "fodase",
			company_city: "cidade",
			company_country: "país",
			is_current_job: true,
			ex_start_date: "20/05/2020",
			ex_end_date: "22/06/2022",
			ex_description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus conse",
			job_type: "integral",
		},
		{
			id: 2,
			title: "experience",
			company: "fodase",
			company_city: "cidade",
			company_country: "país",
			is_current_job: true,
			ex_start_date: "20/05/2020",
			ex_end_date: "22/06/2022",
			ex_description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus conse",
			job_type: "integral",
		},
	];

	return (
		<Layout>
			<div className="ad_container">
				{exp.map((e) => (
					<div className="ad_item">
						<div className="ad_details">
							<p>{e.title}</p>
							<p>
								<span>Company: </span> {e.company} - {e.company_city} -{" "}
								{e.company_country}
							</p>

							<p>
								{e.ex_start_date} - {e.ex_end_date}
							</p>
						</div>
						<p>{e.ex_description}</p>
					</div>
				))}
			</div>
		</Layout>
	);
};

export default Experience;
