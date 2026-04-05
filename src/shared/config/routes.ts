export const ROUTES = {
  home: "/",
  scenarios: "/scenarios",
  scenarioEditor: (id: string) => `/scenarios/${id}/edit`,
} as const;
