import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";


export const getIconComponent = (iconName: string): LucideIcon => {

    const IconComponent = Icons[iconName as keyof typeof Icons]

    if (!IconComponent) {
        return Icons.HelpCircle
    }

    return IconComponent as LucideIcon;
}

// import type { LucideIcon } from "lucide-react";
// import {
//   LayoutDashboard,
//   Users,
//   BarChart3,
//   UserCheck,
//   HelpCircle,
// } from "lucide-react";

// const ICON_MAP: Record<string, LucideIcon> = {
//   dashboard: LayoutDashboard,
//   users: Users,
//   analytics: BarChart3,
//   verification: UserCheck,
// };

// export const getIconComponent = (iconName: string): LucideIcon => {
//   return ICON_MAP[iconName] ?? HelpCircle;
// };