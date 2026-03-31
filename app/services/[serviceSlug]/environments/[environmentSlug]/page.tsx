import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MetricChip } from "@/components/MetricChip";
import { NetworkIconStrip } from "@/components/NetworkIconStrip";
import {
  getEnvironmentBySlug,
  getEnvironmentSlugs,
  getServiceBySlug,
  getServiceSlugs,
} from "@/data/portalCatalog";

type EnvironmentPageProps = {
  params: Promise<{
    serviceSlug: string;
    environmentSlug: string;
  }>;
};

export const generateStaticParams = () =>
  getServiceSlugs().flatMap((serviceSlug) => {
    const service = getServiceBySlug(serviceSlug);

    if (!service) {
      return [];
    }

    return getEnvironmentSlugs(service).map((environmentSlug) => ({
      serviceSlug,
      environmentSlug,
    }));
  });

export default async function EnvironmentPage({ params }: EnvironmentPageProps) {
  const { serviceSlug, environmentSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const environment = getEnvironmentBySlug(service, environmentSlug);

  if (!environment) {
    notFound();
  }

  const groupedSections = service.sections.reduce<Record<string, typeof service.sections>>((groups, section) => {
    groups[section.group] ??= [];
    groups[section.group].push(section);
    return groups;
  }, {});

  return (
    <main className="page-shell">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: service.label, href: `/services/${service.slug}` },
          { label: environment.label },
        ]}
      />

      <section className="hero-panel hero-panel--compact">
        <p className="eyebrow">Контур тестирования</p>
        <h1>{environment.label}</h1>
        <div className="hero-grid">
          <MetricChip label="Соцсетей" value={service.networks.length} />
          <MetricChip label="Разделов" value={service.metrics.sections} />
          <MetricChip label="Тест-кейсов" value={service.metrics.testCases} />
          <MetricChip label="Чек-листов" value={service.metrics.checklists} />
        </div>
      </section>

      {Object.entries(groupedSections).map(([group, sections]) => (
        <section key={group} className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Группа</p>
              <h2>{group}</h2>
            </div>
            <a href={environment.productUrl} target="_blank" rel="noreferrer" className="secondary-link">
              Открыть {environment.label}
            </a>
          </div>

          <div className="card-grid">
            {sections.map((section) => (
              <article key={section.slug} className="section-card section-card--with-icons">
                <div className="section-card__topline">
                  <div className="section-card__meta">
                    <span className="pill">{section.docId}</span>
                  </div>
                  <NetworkIconStrip networks={service.networks} />
                </div>
                <h3>{section.label}</h3>
                <ul className="flat-list">
                  <li>Тест-кейсы: {section.testCasesCount}</li>
                  <li>Чек-листы: {section.checklistsCount}</li>
                  <li>Баг-артефакты: {section.bugReportsCount}</li>
                </ul>
                <Link
                  href={`/services/${service.slug}/environments/${environment.slug}/sections/${section.slug}`}
                  className="primary-link"
                >
                  Открыть раздел
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
