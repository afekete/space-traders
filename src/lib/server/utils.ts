export function getSystemFromWaypoint(waypointSymbol: string) {
  return waypointSymbol?.substring(0, 7)
}