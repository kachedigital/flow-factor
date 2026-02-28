import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, Linkedin, Instagram, Youtube, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/40 dark:bg-muted/10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/kachedigital-logo.png"
                alt="KacheDigital logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-heading font-bold text-xl">
                <span className="text-kd-cyan">Kache</span>
                <span className="text-kd-magenta">Digital</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building digital fortresses through human-centered strategy, inclusive design, and responsible AI.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-kd-cyan transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-kd-cyan transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-kd-cyan transition-colors" />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-muted-foreground hover:text-kd-cyan transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Tools", href: "/tools" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-kd-cyan transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Services</h3>
            <ul className="space-y-2">
              {[
                { name: "AI + Human Collaboration", href: "/services/ai-collaboration" },
                { name: "AI Governance & Risk", href: "/services/ai-governance" },
                { name: "Neuroinclusive Design", href: "/services/neuroinclusive-design" },
                { name: "Web Accessibility", href: "/services/web-accessibility" },
                { name: "Change Management", href: "/services/change-management" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-kd-cyan transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe for the latest insights on inclusive design, AI strategy, and digital transformation.
            </p>
            <form className="flex gap-2">
              <Input
                className="max-w-lg flex-1"
                placeholder="Enter your email"
                type="email"
              />
              <Button
                type="submit"
                className="bg-kd-cyan text-foreground hover:bg-kd-cyan/90 font-medium"
              >
                Subscribe
              </Button>
            </form>
            <div className="pt-2 space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">hello@kachedigital.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} KacheDigital. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-kd-cyan transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-kd-cyan transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-xs text-muted-foreground hover:text-kd-cyan transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
