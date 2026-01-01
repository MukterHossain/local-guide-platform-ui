import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { UserInfo } from "@/types/user.interface";
import { NavSection } from "@/types/dashboard.interface";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";

const DashboardSidebar =async () => {
      const userInfo = (await getUserInfo()) as UserInfo;
if (!userInfo) return null;
  const navItems: NavSection[] = getNavItemsByRole(userInfo?.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);

  console.log("dashaboard sidebar", userInfo)
    return (
        <>
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
    </>
    );
};

export default DashboardSidebar;