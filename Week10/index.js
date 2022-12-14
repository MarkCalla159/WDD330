import { getLocalization } from './utilities.js';

export async function getCompleteUrl(baseUrl, maxRadius) {
    const result = await getLocalization(baseUrl, maxRadius);
    return result;
}