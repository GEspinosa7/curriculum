import React from "react";
import { useState, useEffect } from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";

const Experience = () => {
	const [exp, setExp] = useState([]);

	const handleGetADs = async () => {
		const resp = await fetch(`http://localhost:8000/experiences/1`, {
			method: "GET",
		});

		const data = await resp.json();
		setExp(data);
	};

	useEffect(() => {
		handleGetADs();
	}, []);

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
