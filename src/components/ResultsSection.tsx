import { ArrowUpDown, TrendingDown } from 'lucide-react';
import { ProductCard, ProductResult } from './ProductCard';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ResultsSectionProps {
  results: ProductResult[];
  searchQuery: string;
}

type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'relevance';

export const ResultsSection = ({ results, searchQuery }: ResultsSectionProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // Mark lowest price
  const lowestPrice = Math.min(...results.map(r => r.price));
  const resultsWithLowestPrice = sortedResults.map(r => ({
    ...r,
    isLowestPrice: r.price === lowestPrice,
  }));

  // Calculate potential savings
  const highestPrice = Math.max(...results.map(r => r.price));
  const potentialSavings = highestPrice - lowestPrice;

  return (
    <section className="py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Results for "{searchQuery}"
            </h2>
            <p className="text-muted-foreground mt-1">
              Found {results.length} offers from different stores
            </p>
          </div>

          {/* Savings Banner */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-savings-bg border border-savings/20">
            <TrendingDown className="w-5 h-5 text-savings" />
            <div>
              <p className="text-sm font-medium text-savings">
                Save up to ${potentialSavings.toFixed(2)}
              </p>
              <p className="text-xs text-savings/70">
                by choosing the best deal
              </p>
            </div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            Sort by:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'price-asc', label: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price: High to Low' },
              { value: 'rating', label: 'Best Rated' },
            ].map((option) => (
              <Button
                key={option.value}
                variant={sortBy === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy(option.value as SortOption)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {resultsWithLowestPrice.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
