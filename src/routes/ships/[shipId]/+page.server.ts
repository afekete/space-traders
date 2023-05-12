import { actionRequestinator, baseUrl, dataRequestinator, getOptions, postNoBodyOptions, postOptions } from "$lib/server/requests"
import type { Actions, PageServerLoad } from "./$types"

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
  shipActions: async ({ request }) => {
    const formData = await request.formData()
    const action = formData.get('shipAction') as string
    const shipSymbol = formData.get('shipSymbol') as string
    return actionRequestinator(
      `/my/ships/${shipSymbol}/${action}`,
      postNoBodyOptions,
      action,
      `Ship ${action}ed or ${action}ing`
    )
  },
  sellItem: async ({ request }) => {
    const formData = await request.formData()
    const shipSymbol = formData.get('shipSymbol') as string
    const itemSymbol = formData.get('itemSymbol') as string
    const itemAmount = formData.get('itemAmount') as string
    const options = postOptions({
      symbol: itemSymbol,
      units: itemAmount,
    })
    return dataRequestinator(
      `/my/ships/${shipSymbol}/sell`,
      options,
      'sellItem',
    )
  },
  deliverItem: async ({ request }) => {
    const formData = await request.formData()
    const shipSymbol = formData.get('shipSymbol') as string
    const itemSymbol = formData.get('itemSymbol') as string
    const itemAmount = formData.get('itemAmount') as string
    const contractId = formData.get('contractId') as string
    const options = postOptions({
      shipSymbol: shipSymbol,
      tradeSymbol: itemSymbol,
      units: itemAmount,
    })
    return dataRequestinator(
      `/my/contracts/${contractId}/deliver`,
      options,
      'deliverItem',
    )
  }
} satisfies Actions