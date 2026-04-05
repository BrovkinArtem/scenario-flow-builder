import type { Scenario, ScenarioSummary } from "@/entities/scenario/model/types";
import { randomDelay } from "@/shared/lib/delay";

const STORAGE_KEY = "scenario-flow-builder:scenarios";

const defaultScenarios: Scenario[] = [
  {
    id: "scn_welcome",
    title: "Welcome & onboarding",
    updatedAt: new Date("2026-03-28T10:00:00.000Z").toISOString(),
    nodes: [
      {
        id: "n1",
        type: "action",
        position: { x: 80, y: 120 },
        data: { label: "Send welcome email", actionType: "email" },
      },
      {
        id: "n2",
        type: "condition",
        position: { x: 380, y: 100 },
        data: { label: "Has phone?", expression: "contact.phone != null" },
      },
      {
        id: "n3",
        type: "action",
        position: { x: 680, y: 40 },
        data: { label: "Schedule SMS", actionType: "sms" },
      },
      {
        id: "n4",
        type: "action",
        position: { x: 680, y: 200 },
        data: { label: "Assign to nurture", actionType: "assignment" },
      },
    ],
    edges: [
      { id: "e1", source: "n1", target: "n2" },
      { id: "e2", source: "n2", target: "n3" },
      { id: "e3", source: "n2", target: "n4" },
    ],
  },
  {
    id: "scn_lead",
    title: "Lead qualification",
    updatedAt: new Date("2026-04-01T14:30:00.000Z").toISOString(),
    nodes: [
      {
        id: "l1",
        type: "action",
        position: { x: 100, y: 80 },
        data: { label: "Capture form submit", actionType: "webhook" },
      },
      {
        id: "l2",
        type: "condition",
        position: { x: 400, y: 60 },
        data: { label: "Score > 70", expression: "lead.score > 70" },
      },
    ],
    edges: [{ id: "le1", source: "l1", target: "l2" }],
  },
  {
    id: "scn_empty",
    title: "Empty template",
    updatedAt: new Date("2026-04-02T09:15:00.000Z").toISOString(),
    nodes: [],
    edges: [],
  },
];

function readStore(): Scenario[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      persist(defaultScenarios);
      return [...defaultScenarios];
    }
    const parsed = JSON.parse(raw) as Scenario[];
    if (!Array.isArray(parsed)) {
      persist(defaultScenarios);
      return [...defaultScenarios];
    }
    return parsed;
  } catch {
    persist(defaultScenarios);
    return [...defaultScenarios];
  }
}

function persist(scenarios: Scenario[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
}

function toSummary(s: Scenario): ScenarioSummary {
  return { id: s.id, title: s.title, updatedAt: s.updatedAt };
}

export async function getScenarios(): Promise<ScenarioSummary[]> {
  await randomDelay(300, 500);
  return readStore().map(toSummary);
}

export async function getScenarioById(id: string): Promise<Scenario | null> {
  await randomDelay(300, 500);
  const found = readStore().find((s) => s.id === id);
  return found ?? null;
}

export async function saveScenario(scenario: Scenario): Promise<void> {
  await randomDelay(300, 500);
  if (import.meta.env.VITE_SIMULATE_SAVE_ERROR === "true") {
    throw new Error("Simulated save failure (set VITE_SIMULATE_SAVE_ERROR=true)");
  }
  const scenarios = readStore();
  const idx = scenarios.findIndex((s) => s.id === scenario.id);
  const next: Scenario = {
    ...scenario,
    updatedAt: new Date().toISOString(),
  };
  if (idx === -1) {
    scenarios.push(next);
  } else {
    scenarios[idx] = next;
  }
  persist(scenarios);
}
