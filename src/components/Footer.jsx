import { ExternalLink } from 'lucide-react'

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#videos' },
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
              Mary Elizabeth
            </p>
            <p className="font-inter text-sm text-charcoal/50">
              Content Creator &middot; UGC Creator
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
              href="https://www.tiktok.com/@mary_elizabethugc"
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
              <span className="hidden sm:inline">@mary_elizabethugc</span>
            </a>

            <a
              href="https://www.instagram.com/mary_elizabethugc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-inter text-sm text-charcoal/60 link-hover min-w-[44px] min-h-[44px] justify-center"
              aria-label="Instagram"
            >
              {/* Instagram SVG icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 01-1.38-.9 3.72 3.72 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 00-1.38-2.13A5.9 5.9 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zM12 16a4 4 0 114-4 4 4 0 01-4 4zm6.41-10.85a1.44 1.44 0 101.44 1.44 1.44 1.44 0 00-1.44-1.44z" />
              </svg>
              <span className="hidden sm:inline">@mary_elizabethugc</span>
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
            &copy; 2026 Mary Elizabeth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
