import { notFound } from "next/navigation";
import { ArtifactCard } from "@/components/ArtifactCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  getNetworkBySlug,
  getSectionBySlug,
  getSectionSlugs,
  getServiceBySlug,
  getServiceSlugs,
  getTestTypeBySlug,
  getTestTypeSlugs,
  getNetworkSlugs,
} from "@/data/portalCatalog";

type TestTypePageProps = {
  params: Promise<{
    serviceSlug: string;
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

    return getNetworkSlugs(service).flatMap((networkSlug) =>
      getSectionSlugs(service).flatMap((sectionSlug) => {
        const section = getSectionBySlug(service, sectionSlug);

        if (!section) {
          return [];
        }

        return getTestTypeSlugs(section).map((testTypeSlug) => ({
          serviceSlug,
          networkSlug,
          sectionSlug,
          testTypeSlug,
        }));
      }),
    );
  });

export default async function TestTypePage({ params }: TestTypePageProps) {
  const { serviceSlug, networkSlug, sectionSlug, testTypeSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const network = getNetworkBySlug(service, networkSlug);

  if (!network) {
    notFound();
  }

  const section = getSectionBySlug(service, sectionSlug);

  if (!section) {
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
          { label: network.label, href: `/services/${service.slug}/networks/${network.slug}` },
          {
            label: section.label,
            href: `/services/${service.slug}/networks/${network.slug}/sections/${section.slug}`,
          },
          { label: testType.label },
        ]}
      />

      <section className="hero-panel hero-panel--compact">
        <p className="eyebrow">{section.label}</p>
        <h1>{testType.label}</h1>
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
