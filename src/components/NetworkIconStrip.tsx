const networkIconMap = {
  max: { src: "/network-icons/max.png", alt: "MAX" },
  ok: { src: "/network-icons/ok.png", alt: "OK" },
  tg: { src: "/network-icons/tg.png", alt: "Telegram" },
  vk: { src: "/network-icons/vk.png", alt: "VK" },
} as const;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type NetworkIconStripProps = {
  networks: Array<{
    slug: string;
    label: string;
  }>;
};

export function NetworkIconStrip({ networks }: NetworkIconStripProps) {
  return (
    <div className="network-icon-strip" aria-label="Available networks">
      {networks.map((network) => {
        const icon = networkIconMap[network.slug as keyof typeof networkIconMap];

        if (!icon) {
          return null;
        }

        return (
          <div key={network.slug} className="network-icon-chip" title={network.label} aria-label={network.label}>
            <img src={`${basePath}${icon.src}`} alt={icon.alt} width={32} height={32} loading="lazy" />
          </div>
        );
      })}
    </div>
  );
}
