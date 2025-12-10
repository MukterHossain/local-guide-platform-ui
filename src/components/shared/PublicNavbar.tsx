
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import { getCookie } from "@/services/auth/tokenHandlers";
import LogoutButton from "./LogoutButton";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";



const PublicNavbar = async () => {
  const accessToken = await getCookie("accessToken");
const userInfo = (await getUserInfo()) as UserInfo;
const role = userInfo?.role || {};
  // console.log("user", userInfo)
  // console.log("role", role)
const baseItems = [
  { href: "/explore-tours", label: "Explore Tours" },
  { href: "/become-guide", label: "Become a Guide" },
];

let navItems: { href: string; label: string }[] = [];


if (!accessToken) {
  navItems = [...baseItems];
}else{
  if (role === "TOURIST") {
  navItems =[
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/profile", label: "Profile" }
  ]
}

if (role === "GUIDE") {
  navItems= [
    { href: "/explore-tours", label: "Explore Tours" },
     { href: "/guide/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" }
  ];
}

if (role === "ADMIN") {
  navItems = [
    { href: "/admin/dashboard", label: "Admin Dashboard" },
    { href: "/admin/users", label: "Manage Users" },
    { href: "/admin/listings", label: "Manage Listings" },
    { href: "/profile", label: "Profile" },
  ];
}
}


  
  return (
    <header className="sticky top-0 z-50 h-16 w-full  flex items-center justify-around bg-background/95 px-4 shadow-md gap-x-4 text-primary">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" className="rounded-full border-2 border-gray-800/40" width={40} height={40} />

            <h3 className="font-bold text-lg sm:text-2xl text-green-800">Trip Guide</h3>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-2">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
          
          
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline"> <Menu /> </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t pt-4 flex flex-col space-y-4">
                <div className="flex justify-center"></div>
                {accessToken ? (
                  <LogoutButton />
                ) : (
                  <Link href="/login">
                    <Button>Login</Button>
                  </Link>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default PublicNavbar;