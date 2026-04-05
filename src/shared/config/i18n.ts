import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const LANGUAGE_STORAGE_KEY = "scenario-flow-builder:language";

export type AppLanguage = "en" | "ru";

const en = {
  scenarios: "Scenarios",
  create: "Create New",
  save: "Save",
  loading: "Loading...",
  error: "Something went wrong",

  appTitle: "Scenario Flow Builder",
  appSubtitle: "CRM automation",
  workspace: "Workspace",
  scenariosPageDescription:
    "Browse automation flows. Open a scenario to edit its graph, or create a new one.",
  loadingScenarios: "Loading scenarios",
  loadingScenario: "Loading scenario",
  retry: "Retry",
  noScenariosTitle: "No scenarios yet",
  noScenariosDescription:
    "Create your first scenario to start building flows with actions and conditions.",
  createScenario: "Create New Scenario",
  backToScenarios: "Back to scenarios",
  backToScenariosShort: "← Back to scenarios",
  editor: "Editor",
  scenarioNotFound: "Scenario not found.",
  scenarioTitle: "Scenario title",
  saveSuccess: "Scenario saved successfully.",
  deleteSelected: "Delete selected",
  addNode: "Add node",
  nodeAction: "Action",
  nodeCondition: "Condition",
  fieldLabel: "Label",
  fieldType: "Type",
  fieldExpression: "Expression",
  updatedAt: "Updated {{date}}",
  untitledScenario: "Untitled scenario",
  untitledAction: "Untitled action",
  untitledCondition: "Untitled condition",
  newAction: "New action",
  newCondition: "New condition",
  language: "Language",
  languageEn: "English",
  languageRu: "Russian",
} as const;

const ru: Record<keyof typeof en, string> = {
  scenarios: "Сценарии",
  create: "Создать",
  save: "Сохранить",
  loading: "Загрузка...",
  error: "Произошла ошибка",

  appTitle: "Конструктор сценариев",
  appSubtitle: "CRM-автоматизация",
  workspace: "Рабочая область",
  scenariosPageDescription:
    "Просматривайте сценарии автоматизации. Откройте сценарий для редактирования графа или создайте новый.",
  loadingScenarios: "Загрузка сценариев",
  loadingScenario: "Загрузка сценария",
  retry: "Повторить",
  noScenariosTitle: "Пока нет сценариев",
  noScenariosDescription:
    "Создайте первый сценарий, чтобы начать собирать цепочки из действий и условий.",
  createScenario: "Создать новый",
  backToScenarios: "К списку сценариев",
  backToScenariosShort: "← К списку сценариев",
  editor: "Редактор",
  scenarioNotFound: "Сценарий не найден.",
  scenarioTitle: "Название сценария",
  saveSuccess: "Сценарий успешно сохранён.",
  deleteSelected: "Удалить выбранное",
  addNode: "Добавить узел",
  nodeAction: "Действие",
  nodeCondition: "Условие",
  fieldLabel: "Подпись",
  fieldType: "Тип",
  fieldExpression: "Выражение",
  updatedAt: "Обновлено {{date}}",
  untitledScenario: "Сценарий без названия",
  untitledAction: "Действие без названия",
  untitledCondition: "Условие без названия",
  newAction: "Новое действие",
  newCondition: "Новое условие",
  language: "Язык",
  languageEn: "Английский",
  languageRu: "Русский",
};

export function getStoredLanguage(): AppLanguage {
  try {
    const raw = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (raw === "ru" || raw === "en") return raw;
  } catch {}
  return "en";
}

export function persistLanguage(lng: AppLanguage): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
  } catch {}
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: getStoredLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
