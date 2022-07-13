import React from "react";

import "./Style.css";

import Layout from "../../Components/Layout/Index";

const Skills = () => {
	const skills = [
		{
			id: 1,
			title: "Skill",
			img:
				"https://th.bing.com/th/id/OIP.xQJlilCdJ7U2ebPvc8DYLwHaIJ?pid=ImgDet&rs=1",
		},
		{
			id: 2,
			title: "Skill2",
			img:
				"https://th.bing.com/th/id/OIP.xQJlilCdJ7U2ebPvc8DYLwHaIJ?pid=ImgDet&rs=1",
		},
		{
			id: 3,
			title: "Skill3",
			img:
				"https://th.bing.com/th/id/OIP.xQJlilCdJ7U2ebPvc8DYLwHaIJ?pid=ImgDet&rs=1",
		},
		{
			id: 3,
			title: "Skill3",
			img:
				"https://th.bing.com/th/id/OIP.xQJlilCdJ7U2ebPvc8DYLwHaIJ?pid=ImgDet&rs=1",
		},
		{
			id: 3,
			title: "Skill3",
			img:
				"https://th.bing.com/th/id/OIP.xQJlilCdJ7U2ebPvc8DYLwHaIJ?pid=ImgDet&rs=1",
		},
		{
			id: 3,
			title: "Skill3",
			img:
				"https://th.bing.com/th/id/OIP.xQJlilCdJ7U2ebPvc8DYLwHaIJ?pid=ImgDet&rs=1",
		},
		{
			id: 3,
			title: "Skill3",
			img:
				"https://th.bing.com/th/id/OIP.xQJlilCdJ7U2ebPvc8DYLwHaIJ?pid=ImgDet&rs=1",
		},
	];

	const languages = [
		{
			id: 1,
			title: "Language",
			fluency: "native",
		},
		{
			id: 2,
			title: "Language",
			fluency: "native",
		},
	];

	return (
		<Layout>
			<div className="skills_container flex">
				<div className="skills">
					{skills.map((s) => (
						<div className="skill flex" key={s.id}>
							<img src={s.img} alt={s.title} />
							<p>{s.title}</p>
						</div>
					))}
				</div>
				<div className="languages flex">
					{languages.map((l) => (
						<div className="language flex" key={l.id}>
							<p>{l.title}</p>
							<p>{l.fluency}</p>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Skills;
