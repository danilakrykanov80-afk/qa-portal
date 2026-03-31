import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MetricChip } from "@/components/MetricChip";
import {
  getEnvironmentBySlug,
  getEnvironmentSlugs,
  getSectionBySlug,
  getSectionSlugs,
  getServiceBySlug,
  getServiceSlugs,
} from "@/data/portalCatalog";

const statusLabel = {
  ready: "Готово",
  shared: "Общая книга",
  planned: "В плане",
} as const;

type SectionPageProps = {
  params: Promise<{
    serviceSlug: string;
    environmentSlug: string;
    sectionSlug: string;
  }>;
};

export const generateStaticParams = () =>
  getServiceSlugs().flatMap((serviceSlug) => {
    const service = getServiceBySlug(serviceSlug);

    if (!service) {
      return [];
    }

    return getEnvironmentSlugs(service).flatMap((environmentSlug) =>
      getSectionSlugs(service).map((sectionSlug) => ({
        serviceSlug,
        environmentSlug,
        sectionSlug,
      })),
    );
  });

export default async function SectionPage({ params }: SectionPageProps) {
  const { serviceSlug, environmentSlug, sectionSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const environment = getEnvironmentBySlug(service, environmentSlug);
  const section = getSectionBySlug(service, sectionSlug);

  if (!environment || !section) {
    notFound();
  }

  return (
    <main className="page-shell">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: service.label, href: `/services/${service.slug}` },
          {
            label: environment.label,
            href: `/services/${service.slug}/environments/${environment.slug}`,
          },
          { label: section.label },
        ]}
      />

      <section className="hero-panel hero-panel--compact">
        <p className="eyebrow">{section.group}</p>
        <h1>{section.label}</h1>
        <p className="hero-copy">
          Ветка тестирования: <span>{environment.label}</span>.
        </p>
        <div className="hero-grid">
          <MetricChip label="doc_id" value={section.docId} />
          <MetricChip label="Тест-кейсы" value={section.testCasesCount} />
          <MetricChip label="Чек-листы" value={section.checklistsCount} />
          <MetricChip label="Баг-артефакты" value={section.bugReportsCount} />
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Типы тестирования</p>
            <h2>{section.label}</h2>
          </div>
        </div>
        <div className="card-grid">
          {section.testTypes.map((testType) => (
            <article key={testType.slug} className="test-type-card">
              <div className="test-type-card__meta">
                <span className={`status status--${testType.status}`}>{statusLabel[testType.status]}</span>
                <span className="pill">{testType.slug}</span>
              </div>
              <h3>{testType.label}</h3>
              <Link
                href={`/services/${service.slug}/environments/${environment.slug}/sections/${section.slug}/test-types/${testType.slug}`}
                className="primary-link"
              >
                Открыть
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
