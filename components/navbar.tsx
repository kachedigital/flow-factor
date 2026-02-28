"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Menu, X, User, LogOut, LogIn } from "lucide-react"
import { supabase } from "@/lib/supabase"
import LoginForm from "@/components/auth/login-form"
import SignupForm from "@/components/auth/signup-form"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    checkUser()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      if (event === "SIGNED_IN") {
        setAuthDialogOpen(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      if (!supabase) {
        setUser(null)
        return
      }
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error && error.message !== "Auth session missing!") {
        console.error("Error getting user:", error)
      }
      setUser(user || null)
    } catch (error) {
      if (error instanceof Error && !error.message.includes("Auth session missing")) {
        console.error("Error checking user:", error)
      }
      setUser(null)
    }
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Error signing out:", error)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Tools", href: "/tools" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-200 bg-background ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/kachedigital-logo.png"
                alt="KacheDigital logo"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="text-xl font-heading font-bold">
                <span className="text-kd-cyan">Kache</span>
                <span className="text-kd-magenta">Digital</span>
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-kd-cyan ${
                  pathname === link.href
                    ? "text-kd-cyan font-semibold"
                    : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="max-w-[100px] truncate">{user?.email || "User"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled>
                      <User className="mr-2 h-4 w-4" />
                      {user?.email || "User"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-heading">
                        Welcome to <span className="text-kd-cyan">Kache</span>
                        <span className="text-kd-magenta">Digital</span>
                      </DialogTitle>
                      <DialogDescription>
                        Sign in to your account or create a new one to access all features.
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="signin" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                      </TabsList>
                      <TabsContent value="signin" className="mt-4">
                        <LoginForm onSuccess={checkUser} />
                      </TabsContent>
                      <TabsContent value="signup" className="mt-4">
                        <SignupForm onSuccess={checkUser} />
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )}
              <ModeToggle />
            </div>

            <button className="lg:hidden" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium py-1 transition-colors hover:text-kd-cyan ${
                    pathname === link.href
                      ? "text-kd-cyan font-semibold"
                      : "text-foreground/80"
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t">
                {user ? (
                  <>
                    <div className="text-sm text-muted-foreground">Signed in as {user.email}</div>
                    <Button variant="ghost" size="sm" onClick={handleSignOut} className="justify-start">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="justify-start">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-heading">
                          Welcome to <span className="text-kd-cyan">Kache</span>
                          <span className="text-kd-magenta">Digital</span>
                        </DialogTitle>
                        <DialogDescription>
                          Sign in to your account or create a new one to access all features.
                        </DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="signin" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="signin">Sign In</TabsTrigger>
                          <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="signin" className="mt-4">
                          <LoginForm onSuccess={checkUser} />
                        </TabsContent>
                        <TabsContent value="signup" className="mt-4">
                          <SignupForm onSuccess={checkUser} />
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                )}
                <ModeToggle />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
