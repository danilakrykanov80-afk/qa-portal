import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getServiceBySlug, getServiceSlugs } from "@/data/portalCatalog";

type ServicePageProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

export const generateStaticParams = () =>
  getServiceSlugs().map((serviceSlug) => ({ serviceSlug }));

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  return (
    <main className="page-shell">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: service.label }]} />

      <section className="hero-panel hero-panel--compact">
        <p className="eyebrow">Окружения</p>
        <h1>{service.label}</h1>
      </section>

      <section className="content-section">
        <div className="card-grid">
          {service.environments.map((environment) => (
            <article key={environment.slug} className="service-card">
              <div className="service-card__header">
                <span className="pill">Окружение</span>
              </div>
              <h3>{environment.label}</h3>
              <div className="service-card__footer">
                <Link
                  href={`/services/${service.slug}/environments/${environment.slug}`}
                  className="primary-link"
                >
                  Открыть тесты
                </Link>
                <a href={environment.productUrl} target="_blank" rel="noreferrer" className="secondary-link">
                  Открыть портал
                </a>
                {environment.cookieUrl ? (
                  <a href={environment.cookieUrl} target="_blank" rel="noreferrer" className="secondary-link">
                    Cookie
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
