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
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Compare prices across 50+ stores</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 animate-slide-up">
          Find the <span className="text-primary">Best Price</span>
          <br />for Any Product
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Enter a product name or paste a link. We'll search all major retailers and show you where to get the best deal.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter product name or paste a link..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 pl-12 pr-4 text-base rounded-xl border-2 border-border focus-visible:ring-primary focus-visible:border-primary shadow-lg"
              />
            </div>
            <Button 
              type="submit" 
              variant="hero" 
              size="xl"
              disabled={isLoading || !query.trim()}
              className="sm:w-auto w-full"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Compare Prices
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Popular searches */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['iPhone 15 Pro', 'Sony WH-1000XM5', 'MacBook Air M3', 'PlayStation 5'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setQuery(item);
                  onSearch(item);
                }}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium hover:bg-secondary hover:border-primary/20 transition-all duration-200"
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
