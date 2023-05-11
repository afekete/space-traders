import { baseUrl, getOptions } from "$lib/server/requests"
import type { PageServerLoad } from "./$types"

export const load = (async ({ fetch }) => {
  const fleetRes = await fetch(`${baseUrl}/my/ships`, getOptions)
  const fleet = await fleetRes.json()
  const flagship = fleet.data.find((ship: any) => ship.registration.role === 'COMMAND')
  const flagshipSystem = flagship.nav.systemSymbol

  const systemRes = await fetch(`${baseUrl}/systems/${flagshipSystem}`)
  const system = await systemRes.json()
  return { system: system.data }
}) satisfies PageServerLoad