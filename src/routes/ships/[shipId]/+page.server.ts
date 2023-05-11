import { baseUrl, getOptions, postOptions } from "$lib/server/requests"
import type { PageServerLoad } from "./$types"

export const load = (async ({ fetch, params }) => {
  const shipId = params.shipId
  const shipRes = await fetch(`${baseUrl}/my/ships/${shipId}`, getOptions)
  const { data } = await shipRes.json()
  return { ship: data }
}) satisfies PageServerLoad

export const actions = {
  navigateShip: async ({ request }) => {
    const formData = await request.formData()
    const waypointSymbol = formData.get('waypointSymbol') as string
    const shipSymbol = formData.get('shipSymbol') as string
    const body = {
      waypointSymbol
    }
    try {
      const res = await fetch(`${baseUrl}/my/ships/${shipSymbol}/navigate`, postOptions(body))
      if (!res.ok) {
        const error = await res.json()
        throw new Error(`Error navigating: ${error.error.message}`)
      }
      return { action: 'navigateShip', message: `Ship ${shipSymbol} in transit to ${waypointSymbol}` }
    } catch (error: any) {
      return { action: 'navigateShip', message: error.message }
    }
  },
}