import { notFound } from "next/navigation";
import { ArtifactCard } from "@/components/ArtifactCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  getEnvironmentBySlug,
  getEnvironmentSlugs,
  getNetworkBySlug,
  getNetworkSlugs,
  getSectionBySlug,
  getSectionSlugs,
  getServiceBySlug,
  getServiceSlugs,
  getTestTypeBySlug,
  getTestTypeSlugs,
} from "@/data/portalCatalog";

type TestTypePageProps = {
  params: Promise<{
    serviceSlug: string;
    environmentSlug: string;
    networkSlug: string;
    sectionSlug: string;
    testTypeSlug: string;
  }>;
};

export const generateStaticParams = () =>
  getServiceSlugs().flatMap((serviceSlug) => {
    const service = getServiceBySlug(serviceSlug);

    if (!service) {
      return [];
    }

    return getEnvironmentSlugs(service).flatMap((environmentSlug) =>
      getNetworkSlugs(service).flatMap((networkSlug) =>
        getSectionSlugs(service).flatMap((sectionSlug) => {
          const section = getSectionBySlug(service, sectionSlug);

          if (!section) {
            return [];
          }

          return getTestTypeSlugs(section).map((testTypeSlug) => ({
            serviceSlug,
            environmentSlug,
            networkSlug,
            sectionSlug,
            testTypeSlug,
          }));
        }),
      ),
    );
  });

export default async function TestTypePage({ params }: TestTypePageProps) {
  const { serviceSlug, environmentSlug, networkSlug, sectionSlug, testTypeSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const environment = getEnvironmentBySlug(service, environmentSlug);
  const network = getNetworkBySlug(service, networkSlug);
  const section = getSectionBySlug(service, sectionSlug);

  if (!environment || !network || !section) {
    notFound();
  }

  const testType = getTestTypeBySlug(section, testTypeSlug);

  if (!testType) {
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
          {
            label: network.label,
            href: `/services/${service.slug}/environments/${environment.slug}/networks/${network.slug}`,
          },
          {
            label: section.label,
            href: `/services/${service.slug}/environments/${environment.slug}/networks/${network.slug}/sections/${section.slug}`,
          },
          { label: testType.label },
        ]}
      />

      <section className="hero-panel hero-panel--compact">
        <p className="eyebrow">{section.label}</p>
        <h1>{testType.label}</h1>
        <p className="hero-copy">
          Артефакты открыты в ветке <span>{environment.label}</span> для соцсети <span>{network.label}</span>.
        </p>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Артефакты</p>
            <h2>{testType.label}</h2>
          </div>
        </div>
        <div className="card-grid">
          {testType.artifactLinks.map((artifact) => (
            <ArtifactCard key={`${testType.slug}-${artifact.kind}`} artifact={artifact} />
          ))}
        </div>
      </section>
    </main>
  );
}
