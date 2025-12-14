export const InfoItem = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value?: string | null;
  className?: string;
}) => (
  <div className={`space-y-1 ${className}`}>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-900">
      {value || "N/A"}
    </p>
  </div>
);
