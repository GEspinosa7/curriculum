import React from "react";
import { useState, useEffect } from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";

import { formatDate } from "../../Utilities/handleDates";

const AcademicDegrees = () => {
	const [ads, setAds] = useState([]);

	const handleGetADs = async () => {
		const resp = await fetch(`http://localhost:8000/ad/1`, {
			method: "GET",
		});

		const data = await resp.json();
		console.log(data);
		setAds(data);
	};

	useEffect(() => {
		handleGetADs();
	}, []);

	return (
		<Layout>
			<div className="ad_container">
				{ads.map((ad) => (
					<div className="ad_item">
						<div className="ad_details">
							<p>
								<span>Course:</span> {ad.title}
							</p>
							<p>
								<span>Institution: </span> {ad.institution_name}
							</p>
							<p>
								{formatDate(ad.ad_end_date)} - {formatDate(ad.ad_end_date)}
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
