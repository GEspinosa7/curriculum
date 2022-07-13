import React from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";

const Certificates = () => {
	const certificates = [
		{
			id: 1,
			title: "teste",
			institution: "alura",
			issue_date: "05-08-2020",
			expiration_date: null,
			credential_key: "asfsdgsegsdfg",
			credential_url: "link.com/asfsdgsegsdfg",
		},
		{
			id: 2,
			title: "teste",
			institution: "alura",
			issue_date: "05-08-2020",
			expiration_date: null,
			credential_key: "asfsdgsegsdfg",
			credential_url: "link.com/asfsdgsegsdfg",
		},
		{
			id: 3,
			title: "teste",
			institution: "alura",
			issue_date: "05-08-2020",
			expiration_date: null,
			credential_key: "asfsdgsegsdfg",
			credential_url: "link.com/asfsdgsegsdfg",
		},
		{
			id: 4,
			title: "teste",
			institution: "alura",
			issue_date: "05-08-2020",
			expiration_date: null,
			credential_key: "asfsdgsegsdfg",
			credential_url: "link.com/asfsdgsegsdfg",
		},
		{
			id: 5,
			title: "teste",
			institution: "alura",
			issue_date: "05-08-2020",
			expiration_date: null,
			credential_key: "asfsdgsegsdfg",
			credential_url: "link.com/asfsdgsegsdfg",
		},
		{
			id: 6,
			title: "teste",
			institution: "alura",
			issue_date: "05-08-2020",
			expiration_date: null,
			credential_key: "asfsdgsegsdfg",
			credential_url: "link.com/asfsdgsegsdfg",
		},
	];
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
