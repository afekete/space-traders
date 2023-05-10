import type { Actions, PageServerLoad } from "./$types";
import { baseUrl, getOptions, postNoBodyOptions } from "../lib/server/requests";

export const load = (async ({ fetch }) => {
  const agentRes = await fetch(`${baseUrl}/my/agent`, getOptions)
  const agent = await agentRes.json()

  const contractsRes = await fetch('/api/contracts')
  const contracts = await contractsRes.json()

  const fleetRes = await fetch(`${baseUrl}/my/ships`, getOptions)
  const fleet = await fleetRes.json()

  return { agent, contracts, fleet }
}) satisfies PageServerLoad

export const actions = {
  acceptContract: async ({ request }) => {
    const data = await request.formData()
    const contractId = data.get('contractId')
    const res = await fetch(`${baseUrl}/my/contracts/${contractId}/accept`, postNoBodyOptions)
    if (!res.ok) {
      throw new Error(`Error accepting contract ${contractId}: ${await res.text()}`)
    }
  }
} satisfies Actions;