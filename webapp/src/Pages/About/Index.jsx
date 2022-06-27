import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import Layout from "../../Components/Layout/Index";
import ContactListItem from "../../Components/ContactListItem/Index";

import "./Style.css";

const lorem =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const About = () => {
	return (
		<Layout>
			<div className="about_picture">
				<img
					className="img"
					src="https://th.bing.com/th/id/R.96f4799e78bbc5d3c2c54fad0bab73ce?rik=bYl2hAJtayyQ1A&pid=ImgRaw&r=0"
					alt="react"
				/>
			</div>
			<div className="about_content">
				<p className="ac_title">
					<span>Full Name</span> - Age
				</p>
				<span className="ac_job">Job</span>
				<p className="ac_location">City - Country</p>
				<p className="ac_descrition">{lorem}</p>
			</div>
			<div className="about_contact_list">
				<ContactListItem Icon={MailOutlineIcon} />
				<ContactListItem Icon={LinkedInIcon} />
				<ContactListItem Icon={GitHubIcon} />
			</div>
		</Layout>
	);
};

export default About;
