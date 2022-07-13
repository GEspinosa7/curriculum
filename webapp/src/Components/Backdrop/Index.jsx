import React from "react";

import useStyles from "./Style";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const CustomBackDrop = ({ open }) => {
	const classes = useStyles();
	return (
		<Backdrop className={classes.custom_backdrop} open={open}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default CustomBackDrop;
