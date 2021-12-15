const getUrl = (url) => {
	return url.replace(/%HOST%/g, window.location.hostname);
};

export const publicUrl = getUrl(process.env.REACT_APP_PUBLIC_URL);
export const apiUrl = getUrl(process.env.REACT_APP_API_URL);
export const wsUrl = getUrl(process.env.REACT_APP_WS_URL);
