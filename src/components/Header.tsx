import { TrendingDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform">
            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-foreground">
            Price<span className="text-primary">Hunt</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Popular Deals
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            <a 
              href="#" 
              className="block py-2.5 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              How it Works
            </a>
            <a 
              href="#" 
              className="block py-2.5 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Popular Deals
            </a>
            <a 
              href="#" 
              className="block py-2.5 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              About
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
