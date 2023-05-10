import { API_KEY } from "$env/static/private"
export const baseUrl = "https://api.spacetraders.io/v2"
export const getOptions = {
    method: 'GET',
    headers: {Authorization: `Bearer ${API_KEY}`},
}
export const postNoBodyOptions = {
    method: 'POST',
    headers: {Authorization: `Bearer ${API_KEY}`},
}