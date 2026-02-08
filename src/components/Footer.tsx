import { TrendingDown } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg gradient-primary flex items-center justify-center">
              <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-foreground" />
            </div>
            <span className="text-base sm:text-lg font-bold text-foreground">
              Price<span className="text-primary">Hunt</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground text-center order-last sm:order-none">
            © 2024 PriceHunt. Find the best deals across the web.
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-4">
            <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
