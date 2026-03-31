type MetricChipProps = {
  label: string;
  value: string | number;
};

export const MetricChip = ({ label, value }: MetricChipProps) => (
  <div className="metric-chip">
    <span className="metric-chip__value">{value}</span>
    <span className="metric-chip__label">{label}</span>
  </div>
);
