export const InfoItem = ({
  label,
  value,
  icon,
  className = "",
}: {
  label: string;
  value?: string | null;
  icon?: React.ReactNode;
  className?: string;
}) => (
  <div className="flex items-start gap-2">
    {icon && <div className="text-blue-600">{icon}</div>}
    <div className={`space-y-1 ${className}`}>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-900">
      {value || "N/A"}
    </p>
  </div>
  </div>
  
);
