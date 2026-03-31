import Link from "next/link";
import { getServices } from "@/data/portalCatalog";

export function HomePage() {
  const services = getServices();

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <p className="eyebrow">QA Portal</p>
        <h1>Сервисы</h1>
      </section>

      <section className="content-section">
        <div className="card-grid">
          {services.map((service) => (
            <article key={service.slug} className="service-card">
              <div className="service-card__header">
                <span className="pill">Сервис</span>
                <span className="service-card__status">{service.status}</span>
              </div>
              <h3>{service.label}</h3>
              <div className="service-card__footer">
                <Link href={`/services/${service.slug}`} className="primary-link">
                  Открыть сервис
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
