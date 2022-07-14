import { format } from 'date-fns'

const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const formatDate = (d) => {
    const date = new Date(d);

    return format(date, "MMM / yyyy");
}

export { calculateAge, formatDate };