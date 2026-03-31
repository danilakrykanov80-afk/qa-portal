import { ArtifactLink } from "@/data/portalTypes";

const statusLabel: Record<ArtifactLink["status"], string> = {
  ready: "Готово",
  shared: "Общая книга",
  planned: "В плане",
};

type ArtifactCardProps = {
  artifact: ArtifactLink;
};

export const ArtifactCard = ({ artifact }: ArtifactCardProps) => (
  <article className="artifact-card">
    <div className="artifact-card__topline">
      <span className={`status status--${artifact.status}`}>{statusLabel[artifact.status]}</span>
      <span className="artifact-card__kind">{artifact.kind}</span>
    </div>
    <h3>{artifact.label}</h3>
    <p>{artifact.description}</p>
    <a href={artifact.url} target="_blank" rel="noreferrer">
      Открыть источник
    </a>
  </article>
);
