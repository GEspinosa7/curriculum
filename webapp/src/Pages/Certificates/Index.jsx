import React from "react";
import { useState, useEffect } from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";

const Certificates = () => {
	const [certificates, setCertificates] = useState([]);

	const handleGetADs = async () => {
		const resp = await fetch(`http://localhost:8000/certificates/1`, {
			method: "GET",
		});

		const data = await resp.json();
		setCertificates(data);
	};

	useEffect(() => {
		handleGetADs();
	}, []);

	return (
		<Layout>
			<div className="cer_container">
				{certificates.map((c) => (
					<div className="cer_item">
						<div className="cer_details">
							<p>{c.title}</p>
							<p>{c.institution}</p>
							<p>{c.issue_date}</p>
							<p>{c.expiration_date}</p>
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
				))}
			</div>
		</Layout>
	);
};

export default Certificates;
