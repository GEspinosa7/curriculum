import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    custom_backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#F82FA3",
    },
}));

export default useStyles;