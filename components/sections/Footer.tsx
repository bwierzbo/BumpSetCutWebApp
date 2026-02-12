import Link from "next/link";
import { Instagram } from "lucide-react";
import Container from "@/components/ui/Container";
import { footerLinks, siteConfig } from "@/lib/content";

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.16 8.16 0 0 0 4.76 1.52V6.79a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1A2332] text-white/80">
      <Container>
        <div className="py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-white/50 mb-4">{siteConfig.tagline}</p>
            <div className="flex gap-4">
              <a
                href={`https://instagram.com/${siteConfig.social.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`https://x.com/${siteConfig.social.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-white transition-colors"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href={`https://tiktok.com/${siteConfig.social.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:text-white transition-colors"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>&copy; 2024 {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">
              Terms of Service
            </Link>
            <Link href="/community-guidelines" className="hover:text-white/70 transition-colors">
              Community Guidelines
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
