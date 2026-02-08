import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchHeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchHero = ({ onSearch, isLoading }: SearchHeroProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center px-4 py-10 sm:py-16 gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary mb-4 sm:mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium">Compare prices across 50+ stores</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 sm:mb-4 animate-slide-up px-2">
          Find the <span className="text-primary">Best Price</span>
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>for Any Product
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto animate-slide-up px-4" style={{ animationDelay: '0.1s' }}>
          Enter a product name or paste a link. We'll find the best deals across all major retailers.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="animate-slide-up px-2" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter product name or paste a link..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 sm:h-14 pl-10 sm:pl-12 pr-4 text-sm sm:text-base rounded-xl border-2 border-border focus-visible:ring-primary focus-visible:border-primary shadow-lg"
              />
            </div>
            <Button 
              type="submit" 
              variant="hero" 
              size="lg"
              disabled={isLoading || !query.trim()}
              className="w-full sm:h-14 sm:text-base"
            >
              {isLoading ? (
                <>
                  <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 sm:w-5 h-4 sm:h-5" />
                  Compare Prices
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Popular searches */}
        <div className="mt-6 sm:mt-8 animate-fade-in px-2" style={{ animationDelay: '0.4s' }}>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['iPhone 15 Pro', 'Sony WH-1000XM5', 'MacBook Air M3', 'PlayStation 5'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setQuery(item);
                  onSearch(item);
                }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card border border-border text-xs sm:text-sm font-medium hover:bg-secondary hover:border-primary/20 transition-all duration-200 active:scale-95"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
