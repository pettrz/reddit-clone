import qs from 'query-string';

export const getParamsFromUrl = (urlString: string) => {
    const uriParams = qs.parse(urlString);
    return uriParams;
};