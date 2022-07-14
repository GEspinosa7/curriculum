import React from "react";
import { useState, useEffect } from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";
import CustomBackDrop from "../../Components/Backdrop/Index";
import CustomSnackBar from "../../Components/CustomSnackBar/Index";

import getFullUrl from "../../Utilities/getUrl";
import { formatDate } from "../../Utilities/handleDates";

const Certificates = () => {
	const [certificates, setCertificates] = useState([]);
	const [openBackDrop, setOpenBackDrop] = useState(false);
	const [error, setError] = useState("");

	const handleGetCertificates = async () => {
		setError("");
		setOpenBackDrop(true);

		try {
			const resp = await fetch(getFullUrl("/certificates/1"), {
				method: "GET",
			});

			const data = await resp.json();
			setOpenBackDrop(false);

			setCertificates(data);
		} catch (error) {
			setOpenBackDrop(false);
			setError(error.message);
			return;
		}
	};

	useEffect(() => {
		handleGetCertificates();
	}, []);

	return (
		<Layout>
			<div className="cer_container">
				{certificates.length > 0 ? (
					certificates.map((c) => (
						<div className="cer_item">
							<div className="cer_details">
								<p>{c.title}</p>
								<p>{c.institution}</p>
								<p>{formatDate(c.issue_date)}</p>
								<p>{formatDate(c.expiration_date)}</p>
								<p>
									{" "}
									<span>Credential Key: </span>
									{c.credential_key}
								</p>
							</div>
							<a href={c.credential_url} target={"_blank"} className="button">
								Check Credential
							</a>
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

export default Certificates;
