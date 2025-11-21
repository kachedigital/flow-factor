import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/40 dark:bg-muted/10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FlowFactor
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transforming workplaces through human-centered design and engineering solutions.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog/ai-collaboration"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  AI + Human Collaboration
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/neuroinclusive-design"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Neuroinclusive Design
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/telework-optimization"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Telework Optimization
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/industrial-ux"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Industrial UX
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest insights and updates.
            </p>
            <form className="flex space-x-2">
              <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">hello@flowfactor.com</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">© 2023 FlowFactor. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
