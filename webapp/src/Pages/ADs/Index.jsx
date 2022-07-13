import React from "react";
import { useState, useEffect } from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";
import CustomBackDrop from "../../Components/Backdrop/Index";
import CustomSnackBar from "../../Components/CustomSnackBar/Index";

import { formatDate } from "../../Utilities/handleDates";

const AcademicDegrees = () => {
	const [ads, setAds] = useState([]);
	const [openBackDrop, setOpenBackDrop] = useState(false);
	const [error, setError] = useState("");

	const handleGetADs = async () => {
		setError("");
		setOpenBackDrop(true);

		try {
			const resp = await fetch(`http://localhost:8000/ad/1`, {
				method: "GET",
			});

			const data = await resp.json();
			setOpenBackDrop(false);

			setAds(data);
		} catch (error) {
			setOpenBackDrop(false);
			setError(error.message);
			return;
		}
	};

	useEffect(() => {
		handleGetADs();
	}, []);

	return (
		<Layout>
			<div className="ad_container">
				{ads.length > 0 ? (
					ads.map((ad) => (
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

export default AcademicDegrees;
