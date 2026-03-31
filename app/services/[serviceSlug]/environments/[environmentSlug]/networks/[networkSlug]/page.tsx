import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MetricChip } from "@/components/MetricChip";
import {
  getEnvironmentBySlug,
  getEnvironmentSlugs,
  getNetworkBySlug,
  getNetworkSlugs,
  getServiceBySlug,
  getServiceSlugs,
} from "@/data/portalCatalog";

type NetworkPageProps = {
  params: Promise<{
    serviceSlug: string;
    environmentSlug: string;
    networkSlug: string;
  }>;
};

export const generateStaticParams = () =>
  getServiceSlugs().flatMap((serviceSlug) => {
    const service = getServiceBySlug(serviceSlug);

    if (!service) {
      return [];
    }

    return getEnvironmentSlugs(service).flatMap((environmentSlug) =>
      getNetworkSlugs(service).map((networkSlug) => ({
        serviceSlug,
        environmentSlug,
        networkSlug,
      })),
    );
  });

export default async function NetworkPage({ params }: NetworkPageProps) {
  const { serviceSlug, environmentSlug, networkSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const environment = getEnvironmentBySlug(service, environmentSlug);
  const network = getNetworkBySlug(service, networkSlug);

  if (!environment || !network) {
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
          {
            label: environment.label,
            href: `/services/${service.slug}/environments/${environment.slug}`,
          },
          { label: network.label },
        ]}
      />

      <section className="hero-panel hero-panel--compact">
        <p className="eyebrow">Соцсеть</p>
        <h1>{network.label}</h1>
        <p className="hero-copy">
          Вы находитесь в ветке <span>{environment.label}</span>. Все разделы ниже относятся к этому контуру.
        </p>
        <div className="hero-grid">
          <MetricChip label="Окружение" value={environment.label} />
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
          </div>
          <div className="card-grid">
            {sections.map((section) => (
              <article key={section.slug} className="section-card">
                <div className="section-card__meta">
                  <span className="pill">{section.docId}</span>
                </div>
                <h3>{section.label}</h3>
                <ul className="flat-list">
                  <li>Тест-кейсы: {section.testCasesCount}</li>
                  <li>Чек-листы: {section.checklistsCount}</li>
                  <li>Баг-артефакты: {section.bugReportsCount}</li>
                </ul>
                <Link
                  href={`/services/${service.slug}/environments/${environment.slug}/networks/${network.slug}/sections/${section.slug}`}
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
