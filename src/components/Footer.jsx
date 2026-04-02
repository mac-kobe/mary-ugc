import { ExternalLink } from 'lucide-react'

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-linen border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Left - Brand */}
          <div className="text-center md:text-left">
            <p className="font-playfair text-xl text-charcoal mb-1">
              Mary Ransom
            </p>
            <p className="font-inter text-sm text-charcoal/50">
              Content Creator &middot; UGC Specialist
            </p>
          </div>

          {/* Center - Quick Links */}
          <div className="flex gap-6">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-inter text-sm text-charcoal/60 link-hover"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.tiktok.com/@mary_arndt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-inter text-sm text-charcoal/60 link-hover min-w-[44px] min-h-[44px] justify-center"
              aria-label="TikTok"
            >
              {/* TikTok SVG icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.21 8.21 0 004.76 1.52V6.69h-1z" />
              </svg>
              <span className="hidden sm:inline">@mary_arndt</span>
            </a>

            <a
              href="https://linktr.ee/mearliz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-inter text-sm text-charcoal/60 link-hover min-w-[44px] min-h-[44px] justify-center"
              aria-label="Linktree"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">Linktree</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-charcoal/5 text-center">
          <p className="font-inter text-xs text-charcoal/40">
            &copy; 2026 Mary Ransom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
