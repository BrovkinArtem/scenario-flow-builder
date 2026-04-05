export function generateNodeId(): string {
  return `node_${crypto.randomUUID().replaceAll("-", "").slice(0, 10)}`;
}

export function generateScenarioId(): string {
  return `scn_${crypto.randomUUID().replaceAll("-", "").slice(0, 12)}`;
}
