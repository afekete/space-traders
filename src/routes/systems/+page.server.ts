import { baseUrl, getOptions } from "$lib/server/requests"
import { getSystemFromWaypoint } from "$lib/server/utils"
import type { Actions, PageServerLoad } from "./$types"

export const load = (async ({ fetch }) => {
  const fleetRes = await fetch(`${baseUrl}/my/ships`, getOptions)
  const fleet = await fleetRes.json()
  const flagship = fleet.data.find((ship: any) => ship.registration.role === 'COMMAND')
  const flagshipSystem = flagship.nav.systemSymbol

  const systemRes = await fetch(`${baseUrl}/systems/${flagshipSystem}`)
  const system = await systemRes.json()
  return { system: system.data }
}) satisfies PageServerLoad

export const actions = {
  getMarketData: async ({ request }) => {
    const formData = await request.formData()
    const waypointSymbol = formData.get('waypointSymbol') as string
    const systemSymbol = getSystemFromWaypoint(waypointSymbol);
    try {
      const res = await fetch(`${baseUrl}/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`, getOptions)
      if (!res.ok) {
        const error = await res.json()
        throw new Error(`Error getting market data: ${error.error.message}`)
      }
      const marketData = await res.json()
      return { action: 'getMarketData', data: marketData.data }
    } catch (error: any) {
      return { action: 'getMarketData', message: error.message }
    }
  },
} satisfies Actions