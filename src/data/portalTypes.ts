export type ArtifactKind =
  | "general-docs"
  | "test-cases"
  | "checklists"
  | "bug-reports"
  | "api-docs";

export type CoverageStatus = "ready" | "shared" | "planned";

export type ArtifactLink = {
  kind: ArtifactKind;
  label: string;
  url: string;
  description: string;
  status: CoverageStatus;
};

export type TestType = {
  slug: string;
  label: string;
  status: CoverageStatus;
  summary: string;
  outcome: string;
  artifactLinks: ArtifactLink[];
};

export type Section = {
  docId: string;
  slug: string;
  label: string;
  group: string;
  route: string;
  pagePurpose: string;
  qaFocus: string;
  testCasesCount: number;
  checklistsCount: number;
  bugReportsCount: number;
  testTypes: TestType[];
};

export type SocialNetwork = {
  slug: string;
  label: string;
};

export type Service = {
  slug: string;
  label: string;
  summary: string;
  audience: string;
  status: string;
  productUrl: string;
  spreadsheetUrl: string;
  apiDocsUrl: string;
  workbookId: string;
  metrics: {
    sections: number;
    testCases: number;
    checklists: number;
    bugTemplates: number;
  };
  highlights: string[];
  sheets: {
    generalDocs: string;
    testCases: string;
    checklists: string;
    bugReports: string;
  };
  networks: SocialNetwork[];
  sections: Section[];
};
