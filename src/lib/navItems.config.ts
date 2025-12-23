import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["TOURIST", "GUIDE", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["TOURIST", "GUIDE", "ADMIN"],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["TOURIST" , "GUIDE", "ADMIN"],
                },
            ],
        },
    ]
}

export const guideNavItems: NavSection[] = [
    {
        title: "Tour Management",
        items: [
            {
                title: "Tour List",
                href: "/guide/dashboard/listings",
                icon: "List",
                roles: ["GUIDE"],
            },
            {
                title: "Explore Tours",
                href: "/explore-tours",
                icon: "Plane",
                roles: ["GUIDE"],
            },
            {
                title: "Availability",
                href: "/guide/dashboard/availability",
                icon: "Calendar",
                badge: "2",
                roles: ["GUIDE"],
            },
            {
                title: "Guide Locations",
                href: "/guide/dashboard/guide-locations",
                icon: "MapPin",
                roles: ["GUIDE"],
            },
            
        ],
    }
]

export const touristNavItems: NavSection[] = [
     
    {
        title: "Tour Management",
        items: [
            {
                title: "My Bookings",
                href: "/dashboard/my-bookings",
                icon: "Calendar",
                roles: ["TOURIST"],
            },
            {
                title: "my Reports",
                href: "/dashboard/my-reports",
                icon: "File", // ✅ String
                roles: ["TOURIST"],
            },
            {
                title: "Explore Tours",
                href: "/explore-tours",
                icon:  "Plane", 
                roles: ["TOURIST"],
            },
        ],
    },
]

export const adminNavItems: NavSection[] = [
    
    {
        title: "User Management",
        items: [
            {
                title: "Guides",
                href: "/admin/dashboard/guides-management",
                icon: "Users",
                roles: ["ADMIN"],
            },
            {
                title: "Tourists",
                href: "/admin/dashboard/tourists-management",
                icon: "Users",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Booking Management",
        items: [
            {
                title: "Bookings",
                href: "/admin/dashboard/bookings",
                icon: "Calendar",
                roles: ["ADMIN"],
            },
            {
                title: "Categories",
                href: "/admin/dashboard/categories",
                icon: "Tag",
                roles: ["ADMIN"],
            },
            {
                title: "Tour Categories",
                href: "/admin/dashboard/tour-category",
                icon: "Tag",
                roles: ["ADMIN"],
            },
            {
                title: "Locations",
                href: "/admin/dashboard/locations",
                icon: "MapPin",
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "GUIDE":
            return [...commonNavItems, ...guideNavItems];
        case "TOURIST":
            return [...commonNavItems, ...touristNavItems];
        default:
            return [];
    }
}