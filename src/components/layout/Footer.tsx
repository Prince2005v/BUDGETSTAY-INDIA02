import { Link } from "react-router-dom";
import { Hotel, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Hotel className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">BudgetStay</span>
            </Link>
            <p className="text-sm text-background/70">
              Your trusted partner for budget-friendly stays across India's Tier-2 and Tier-3 cities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/hotels" className="hover:text-background transition-colors">Find Hotels</Link></li>
              <li><Link to="/partner/dashboard" className="hover:text-background transition-colors">List Your Property</Link></li>
              <li><Link to="#" className="hover:text-background transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-background transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-background transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="#" className="hover:text-background transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-background transition-colors">Cancellation Policy</Link></li>
              <li><Link to="#" className="hover:text-background transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-background transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-background transition-colors">Trust & Safety</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Business Hub, MG Road, Bangalore - 560001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>1800-123-4567 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>support@budgetstay.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 text-center text-sm text-background/50">
          <p>© 2024 BudgetStay. All rights reserved. Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}
