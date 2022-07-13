import moment from "moment";

const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const formatDate = (d) => {
    return d.slice(0, d.indexOf("T"));
}

export { calculateAge, formatDate };