import { baseUrl, getOptions, postOptions } from "$lib/server/requests"
import { getSystemFromWaypoint } from "$lib/server/utils"
import type { Actions, PageServerLoad } from "./$types"

export const load = (async ({ fetch }) => {
  const fleetRes = await fetch(`${baseUrl}/my/ships`, getOptions)
  const { data } = await fleetRes.json()
  return { fleet: data }
}) satisfies PageServerLoad

export const actions = {
  findShipyard: async ({ request }) => {
    const formData = await request.formData()
    const systemSymbol = formData.get('systemSymbol')
    const res = await fetch(`${baseUrl}/systems/${systemSymbol}/waypoints`, getOptions)
    if (!res.ok) {
      throw new Error(`Error getting waypoints: ${await res.text()}`)
    }
    const { data } = await res.json()
    return { shipyards: data }
  },
  searchShips: async ({ request }) => {
    const formData = await request.formData()
    const waypointSymbol = formData.get('waypointSymbol') as string
    const systemSymbol = getSystemFromWaypoint(waypointSymbol)
    const res = await fetch(`${baseUrl}/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`, getOptions)
    if (!res.ok) {
      throw new Error(`Error getting available ships: ${await res.text()}`)
    }
    const { data } = await res.json()
    return { ships: data }
  },
  buyShip: async ({ request }) => {
    const data = await request.formData()
    const shipType = data.get('shipType') as string
    const waypointSymbol = data.get('waypointSymbol') as string
    const reqBody = {
      "shipType": shipType,
      "waypointSymbol": waypointSymbol,
    }
    try {
      const res = await fetch(`${baseUrl}/my/ships`, postOptions(reqBody))
      if (!res.ok) {
        throw new Error(`Error buying ship: ${await res.text()}`)
      }
      return { message: `Purchased ship ${shipType} from waypoint ${waypointSymbol}`}
    } catch (error: any) {
      return { message: error.message }
    }
  }
} satisfies Actions;