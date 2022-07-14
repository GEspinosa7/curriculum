import React from "react";
import { useState, useEffect } from "react";

import Layout from "../../Components/Layout/Index";
import CustomBackDrop from "../../Components/Backdrop/Index";
import CustomSnackBar from "../../Components/CustomSnackBar/Index";
import getFullUrl from "../../Utilities/getUrl";
import { formatDate } from "../../Utilities/handleDates";

const Experience = () => {
	const [exp, setExp] = useState([]);
	const [openBackDrop, setOpenBackDrop] = useState(false);
	const [error, setError] = useState("");

	const handleGetExp = async () => {
		setError("");
		setOpenBackDrop(true);

		try {
			const resp = await fetch(getFullUrl("/experiences/1"), {
				method: "GET",
			});

			const data = await resp.json();
			setOpenBackDrop(false);

			setExp(data);
		} catch (error) {
			setOpenBackDrop(false);
			setError(error.message);
			return;
		}
	};

	useEffect(() => {
		handleGetExp();
	}, []);

	return (
		<Layout>
			<div className="ad_container">
				{exp.length > 0 ? (
					exp.map((e) => (
						<div className="ad_item">
							<div className="ad_details">
								<p>{e.title}</p>
								<p>
									<span>Company: </span> {e.company} - {e.company_city} -{" "}
									{e.company_country}
								</p>

								<p>
									{formatDate(e.ex_start_date)} - {formatDate(e.ex_end_date)}
								</p>
							</div>
							<p>{e.ex_description}</p>
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

export default Experience;
