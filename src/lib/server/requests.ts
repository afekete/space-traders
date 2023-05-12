import { API_KEY } from "$env/static/private"
export const baseUrl = "https://api.spacetraders.io/v2"
export const getOptions = {
  method: 'GET',
  headers: { Authorization: `Bearer ${API_KEY}` },
}
export const postNoBodyOptions = {
  method: 'POST',
  headers: { Authorization: `Bearer ${API_KEY}` },
}
export function postOptions(body: Object) {
  return {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
}

export async function dataRequestinator(url: string, requestOptions: Object, actionName: string) {
  try {
    const res = await fetch(`${baseUrl}${url}`, requestOptions)
    if (!res.ok) {
      const error = await res.json()
      console.log(JSON.stringify(error, null, 2))
      // throw new Error(`Error performing action {${actionName}}: ${error.error.message}`)
      return { action: actionName, success: false, error }
    }
    const { data } = await res.json()
    return { action: actionName, success: true, data }
  } catch (error: any) {
    console.log(error)
    return { action: actionName, success: false, message: error.message }
  }
}

export async function actionRequestinator(url: string, requestOptions: Object, actionName: string, successMessage: string) {
  try {
    const res = await fetch(`${baseUrl}${url}`, requestOptions)
    if (!res.ok) {
      const error = await res.json()
      console.log(JSON.stringify(error, null, 2))
      // throw new Error(`Error performing action '${actionName}': ${error.error.message}`)
      return { action: actionName, success: false, error }
    }
    return { action: actionName, success: true, message: successMessage }
  } catch (error: any) {
    console.log(error)
    return { action: actionName, success: false, message: error.message }
  }
}