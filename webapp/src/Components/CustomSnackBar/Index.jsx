import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionDown = (props) => {
	return <Slide {...props} direction="up" />;
};

const CustomSnackBar = ({ error }) => {
	return (
		<Snackbar
			severity="error"
			open={error ? true : false}
			TransitionComponent={TransitionDown}
		>
			<Alert severity="error" sx={{ width: "100%" }}>
				{error}
			</Alert>
		</Snackbar>
	);
};

export default CustomSnackBar;
