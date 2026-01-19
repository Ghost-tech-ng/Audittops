import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";

interface PublicLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export default function PublicLayout({ children, showNav = true }: PublicLayoutProps) {
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showNav && (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-3">
                <img
                  src={theme === "dark" ? logoDark : logoLight}
                  alt="MiAuditOps"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="/#features"
                  className="text-sm transition-colors"
                  style={{ color: location === '/#features' ? '#FFFFFF' : 'rgba(255,255,255,0.75)' }}
                  data-testid="nav-features"
                >
                  Features
                </Link>
                <Link
                  href="/#pricing"
                  className="text-sm transition-colors"
                  style={{ color: location === '/#pricing' ? '#FFFFFF' : 'rgba(255,255,255,0.75)' }}
                  data-testid="nav-pricing"
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="text-sm transition-colors"
                  style={{ color: location === '/about' ? '#FFFFFF' : 'rgba(255,255,255,0.75)' }}
                  data-testid="nav-about"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-sm transition-colors"
                  style={{ color: location === '/contact' ? '#FFFFFF' : 'rgba(255,255,255,0.75)' }}
                  data-testid="nav-contact"
                >
                  Contact
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="border-2"
                    >
                      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Switch to {theme === "dark" ? "light" : "dark"} mode</p>
                  </TooltipContent>
                </Tooltip>
                <Button
                  variant="ghost"
                  onClick={() => setLocation("/login")}
                  data-testid="nav-signin"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => setLocation("/signup")}
                  className="bg-primary text-primary-foreground font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  data-testid="nav-get-started"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>
      )}
      {children}
    </div>
  );
}


