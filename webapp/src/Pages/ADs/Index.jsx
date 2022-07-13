import React from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";

const AcademicDegrees = () => {
	const ADs = [
		{
			id: 1,
			title: "Analista",
			institution_name: "UCAM",
			institution_web_site: "ucam.br",
			ad_start_date: "18/04/2020",
			ad_end_date: "18/04/2022",
			ad_description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.",
		},
		{
			id: 2,
			title: "Analista",
			institution_name: "UCAM",
			institution_web_site: "ucam.br",
			ad_start_date: "18/04/2020",
			ad_end_date: "18/04/2022",
			ad_description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.",
		},
		{
			id: 3,
			title: "Analista",
			institution_name: "UCAM",
			institution_web_site: "ucam.br",
			ad_start_date: "18/04/2020",
			ad_end_date: "18/04/2022",
			ad_description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.",
		},
		{
			id: 1,
			title: "Analista",
			institution_name: "UCAM",
			institution_web_site: "ucam.br",
			ad_start_date: "18/04/2020",
			ad_end_date: "18/04/2022",
			ad_description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet, augue nec laoreet efficitur, eros mi dignissim lacus, at pretium dui nunc ac justo. Duis molestie lacinia lacus vitae dignissim. Quisque diam tellus, finibus ac dolor id, dictum fringilla arcu. Praesent sed finibus justo, ut varius dolor. Cras scelerisque eros dui, cursus consequat urna mattis a. Suspendisse potenti. Curabitur porttitor ornare ante. Mauris ultrices nibh in convallis consectetur.",
		},
	];

	return (
		<Layout>
			<div className="ad_container">
				{ADs.map((ad) => (
					<div className="ad_item">
						<div className="ad_details">
							<p>
								<span>Course:</span> {ad.title}
							</p>
							<p>
								<span>Institution: </span> {ad.institution_name}
							</p>
							<p>
								{ad.ad_start_date} - {ad.ad_end_date}
							</p>
						</div>
						<div className="ad_desc">{ad.ad_description}</div>
					</div>
				))}
			</div>
		</Layout>
	);
};

export default AcademicDegrees;
