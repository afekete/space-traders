import { json } from "@sveltejs/kit";
import { baseUrl, getOptions } from "../../../lib/server/requests";
import type { RequestHandler } from "./$types";

export const GET = (async () => {
  const res = await fetch(`${baseUrl}/my/contracts`, getOptions)
  const contracts = await res.json()
  return json(contracts)
}) satisfies RequestHandler