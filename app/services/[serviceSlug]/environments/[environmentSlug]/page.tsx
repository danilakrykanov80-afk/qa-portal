import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MetricChip } from "@/components/MetricChip";
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
        <p className="hero-copy">{environment.summary}</p>
        <div className="hero-grid">
          <MetricChip label="Соцсетей" value={service.networks.length} />
          <MetricChip label="Разделов" value={service.metrics.sections} />
          <MetricChip label="Тест-кейсов" value={service.metrics.testCases} />
          <MetricChip label="Чек-листов" value={service.metrics.checklists} />
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Следующий шаг</p>
            <h2>Выберите соцсеть</h2>
          </div>
          <a href={environment.productUrl} target="_blank" rel="noreferrer" className="secondary-link">
            Открыть {environment.label}
          </a>
        </div>

        <div className="card-grid">
          {service.networks.map((network) => (
            <article key={network.slug} className="service-card">
              <div className="service-card__header">
                <span className="pill">Соцсеть</span>
              </div>
              <h3>{network.label}</h3>
              <p className="muted-copy">
                Все сценарии внутри этой ветки будут относиться к окружению {environment.label}.
              </p>
              <div className="service-card__footer">
                <Link
                  href={`/services/${service.slug}/environments/${environment.slug}/networks/${network.slug}`}
                  className="primary-link"
                >
                  Открыть
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
