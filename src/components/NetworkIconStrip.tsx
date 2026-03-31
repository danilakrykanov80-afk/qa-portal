import Image from "next/image";

const networkIconMap = {
  max: { src: "/network-icons/max.svg", alt: "MAX" },
  ok: { src: "/network-icons/ok.svg", alt: "OK" },
  tg: { src: "/network-icons/tg.svg", alt: "Telegram" },
  vk: { src: "/network-icons/vk.svg", alt: "VK" },
} as const;

type NetworkIconStripProps = {
  networks: Array<{
    slug: string;
    label: string;
  }>;
};

export function NetworkIconStrip({ networks }: NetworkIconStripProps) {
  return (
    <div className="network-icon-strip" aria-label="Доступные соцсети">
      {networks.map((network) => {
        const icon = networkIconMap[network.slug as keyof typeof networkIconMap];

        if (!icon) {
          return null;
        }

        return (
          <div key={network.slug} className="network-icon-chip" title={network.label} aria-label={network.label}>
            <Image src={icon.src} alt={icon.alt} width={32} height={32} />
          </div>
        );
      })}
    </div>
  );
}
