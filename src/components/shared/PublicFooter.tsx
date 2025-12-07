import Image from "next/image";
import Link from "next/link";

const PublicFooter = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" className="rounded-full" width={40} height={40} />

              <h3 className="font-bold text-lg sm:text-xl text-green-800">Trip Guide</h3>
            </div>
            <p className="text-sm text-muted-foreground">Your tour safety is our priority. We are here to provide the best medical services.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Services</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              123 Medical Lane<br />
              Health City, HC 12345<br />
              contact@phdoc.com
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PH Doc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;