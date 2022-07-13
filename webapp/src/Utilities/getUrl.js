const getFullUrl = (url) => {
    return process.env.REACT_APP_baseAPIUrl + url;
}

export default getFullUrl;