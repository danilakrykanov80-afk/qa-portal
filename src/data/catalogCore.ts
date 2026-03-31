import { ArtifactKind, CoverageStatus, Section, TestType } from "@/data/portalTypes";

export const workbookId = "019d3563-84d9-7028-93be-156835e76fd2";

export const sheets = {
  generalDocs: "29d6d2f1-fe59-439c-b3ad-8ff8435db616",
  testCases: "0b073ad0-6c88-4f97-bb77-bea3e9e5438a",
  checklists: "33695fe5-59db-4e47-b9b0-822c25015143",
  bugReports: "14c558f6-ea3a-4643-bc44-41eaca460709",
} as const;

const spreadsheetBaseUrl = `https://docs.targethunter.ru/spreadsheet/${workbookId}`;
export const spreadsheetUrl = `${spreadsheetBaseUrl}?sheet=${sheets.generalDocs}`;
export const apiDocsUrl = "https://docs.targethunter.ru/api/docs";

const buildSheetUrl = (sheetId: string) => `${spreadsheetBaseUrl}?sheet=${sheetId}`;

const kindToLabel: Record<ArtifactKind, string> = {
  "general-docs": "Общая документация",
  "test-cases": "Тест-кейсы",
  checklists: "Чек-листы",
  "bug-reports": "Баг-репорты",
  "api-docs": "API docs",
};

const artifactUrlByKind: Record<ArtifactKind, string> = {
  "general-docs": buildSheetUrl(sheets.generalDocs),
  "test-cases": buildSheetUrl(sheets.testCases),
  checklists: buildSheetUrl(sheets.checklists),
  "bug-reports": buildSheetUrl(sheets.bugReports),
  "api-docs": apiDocsUrl,
};

const artifactDescriptionByKind = (
  kind: ArtifactKind,
  sectionLabel: string,
  docId: string,
) => {
  if (kind === "api-docs") {
    return "Документация API таблиц для автоматизации ссылок, загрузок и будущих интеграций.";
  }

  const base = {
    "general-docs": "Контекст раздела, риски, маршрут и QA-фокус.",
    "test-cases": "Пошаговые сценарии выполнения и проверки.",
    checklists: "Быстрые smoke/regression-пункты перед релизом.",
    "bug-reports": "Шаблоны и живые дефекты по разделу.",
  }[kind];

  return `${base} Для поиска в общей книге используйте ${docId} и раздел «${sectionLabel}».`;
};

const createArtifact = (
  kind: ArtifactKind,
  sectionLabel: string,
  docId: string,
  status: CoverageStatus,
) => ({
  kind,
  label: kindToLabel[kind],
  url: artifactUrlByKind[kind],
  description: artifactDescriptionByKind(kind, sectionLabel, docId),
  status,
});

type TestTypeTemplate = {
  label: string;
  defaultStatus: CoverageStatus;
  outcome: string;
  artifactKinds: ArtifactKind[];
  summary: (sectionLabel: string) => string;
};

const testTypeTemplates: Record<string, TestTypeTemplate> = {
  functional: {
    label: "Функциональное тестирование",
    defaultStatus: "ready",
    outcome: "Подтверждает, что бизнес-сценарий раздела работает от начала до результата.",
    artifactKinds: ["general-docs", "test-cases", "checklists", "bug-reports"],
    summary: (sectionLabel) =>
      `Проверяет, что раздел «${sectionLabel}» выполняет свои основные пользовательские задачи без функциональных ошибок.`,
  },
  ui: {
    label: "UI тестирование",
    defaultStatus: "shared",
    outcome: "Контролирует состояние интерфейса, элементы управления и визуальную стабильность.",
    artifactKinds: ["general-docs", "checklists", "bug-reports"],
    summary: (sectionLabel) =>
      `Проверяет внешний вид, состояния контролов и читаемость интерфейса в разделе «${sectionLabel}».`,
  },
  ux: {
    label: "UX тестирование",
    defaultStatus: "planned",
    outcome: "Показывает, где сценарий нужно доработать для снижения трения и ошибок пользователя.",
    artifactKinds: ["general-docs", "bug-reports"],
    summary: (sectionLabel) =>
      `Оценивает понятность сценария, навигации и обратной связи для конечного пользователя в разделе «${sectionLabel}».`,
  },
  smoke: {
    label: "Smoke тестирование",
    defaultStatus: "ready",
    outcome: "Дает быстрый релизный ответ: раздел жив, доступен и не сломан на критическом пути.",
    artifactKinds: ["general-docs", "test-cases", "checklists"],
    summary: (sectionLabel) =>
      `Быстрый контроль жизнеспособности раздела «${sectionLabel}» после релиза или перед выкладкой.`,
  },
  regression: {
    label: "Regression тестирование",
    defaultStatus: "ready",
    outcome: "Защищает уже работающие сценарии от повторных поломок.",
    artifactKinds: ["general-docs", "test-cases", "checklists", "bug-reports"],
    summary: (sectionLabel) =>
      `Проверяет, что доработки не сломали текущую логику раздела «${sectionLabel}».`,
  },
  integration: {
    label: "Интеграционное тестирование",
    defaultStatus: "ready",
    outcome: "Подтверждает связи раздела с соседними модулями и внешними сервисами.",
    artifactKinds: ["general-docs", "test-cases", "bug-reports", "api-docs"],
    summary: (sectionLabel) =>
      `Проверяет обмен данными и переходы между разделом «${sectionLabel}» и другими частями системы.`,
  },
  security: {
    label: "Security тестирование",
    defaultStatus: "ready",
    outcome: "Помогает поймать опасный рендер ввода, права доступа и рискованные состояния.",
    artifactKinds: ["general-docs", "test-cases", "checklists", "bug-reports", "api-docs"],
    summary: (sectionLabel) =>
      `Проверяет безопасную обработку пользовательского ввода и чувствительных действий в разделе «${sectionLabel}».`,
  },
  analytics: {
    label: "Аналитическое тестирование",
    defaultStatus: "ready",
    outcome: "Показывает, что фильтры, срезы и метрики дают корректную выборку.",
    artifactKinds: ["general-docs", "test-cases", "checklists", "bug-reports"],
    summary: (sectionLabel) =>
      `Проверяет статистику, фильтры и корректность аналитических данных в разделе «${sectionLabel}».`,
  },
  api: {
    label: "API тестирование",
    defaultStatus: "shared",
    outcome: "Создает основу для автоматизации и интеграции с таблицами и служебными интерфейсами.",
    artifactKinds: ["api-docs", "general-docs", "bug-reports"],
    summary: (sectionLabel) =>
      `Нужно для автоматизации сценариев вокруг раздела «${sectionLabel}» и интеграции с таблицами docs.targethunter.ru.`,
  },
  load: {
    label: "Нагрузочное тестирование",
    defaultStatus: "planned",
    outcome: "Помогает понять, как раздел ведет себя при росте объема данных, задач и пользователей.",
    artifactKinds: ["general-docs", "api-docs", "bug-reports"],
    summary: (sectionLabel) =>
      `Используется для оценки масштабируемости и предсказуемости раздела «${sectionLabel}» под нагрузкой.`,
  },
};

export type SectionSeed = Omit<Section, "testTypes"> & {
  testTypeSlugs: string[];
  statusOverrides?: Partial<Record<string, CoverageStatus>>;
};

const createTestType = (
  sectionLabel: string,
  docId: string,
  slug: string,
  statusOverride?: CoverageStatus,
): TestType => {
  const template = testTypeTemplates[slug];
  const status = statusOverride ?? template.defaultStatus;

  return {
    slug,
    label: template.label,
    status,
    summary: template.summary(sectionLabel),
    outcome: template.outcome,
    artifactLinks: template.artifactKinds.map((kind) =>
      createArtifact(kind, sectionLabel, docId, status),
    ),
  };
};

export const createSection = (seed: SectionSeed): Section => ({
  ...seed,
  testTypes: seed.testTypeSlugs.map((slug) =>
    createTestType(seed.label, seed.docId, slug, seed.statusOverrides?.[slug]),
  ),
});
