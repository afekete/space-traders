import { baseUrl, getOptions } from "$lib/server/requests"
import type { Actions, PageServerLoad } from "./$types"

export const load = (async ({ fetch }) => {
  const fleetRes = await fetch(`${baseUrl}/my/ships`, getOptions)
  const { data } = await fleetRes.json()
  return { fleet: data }
}) satisfies PageServerLoad

export const actions = {
  findShipyard: async ({ request }) => {
    const data = await request.formData()
    const systemSymbol = data.get('systemSymbol')
    const res = await fetch(`${baseUrl}/systems/${systemSymbol}/waypoints`, getOptions)
    if (!res.ok) {
      throw new Error(`Error getting waypoints: ${await res.text()}`)
    }
    return res.json()
  },
  searchShips: async ({ request }) => {
    const data = await request.formData()
    const systemSymbol = data.get('systemSymbol')
    const waypointSymbol = data.get('waypointSymbol')
    const res = await fetch(`${baseUrl}/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`, getOptions)
    if (!res.ok) {
      throw new Error(`Error getting available ships: ${await res.text()}`)
    }
  }
} satisfies Actions;