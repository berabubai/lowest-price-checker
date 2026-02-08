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
    <section className="py-8 sm:py-12 px-3 sm:px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Results Header */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Results for "{searchQuery}"
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Found {results.length} offers from different stores
            </p>
          </div>

          {/* Savings Banner */}
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-savings-bg border border-savings/20 w-fit">
            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-savings shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-savings">
                Save up to ${potentialSavings.toFixed(2)}
              </p>
              <p className="text-[10px] sm:text-xs text-savings/70">
                by choosing the best deal
              </p>
            </div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-border overflow-x-auto">
          <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 sm:gap-2 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Sort by:</span>
          </span>
          <div className="flex gap-1.5 sm:gap-2">
            {[
              { value: 'price-asc', label: 'Price ↑', fullLabel: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price ↓', fullLabel: 'Price: High to Low' },
              { value: 'rating', label: 'Rating', fullLabel: 'Best Rated' },
            ].map((option) => (
              <Button
                key={option.value}
                variant={sortBy === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy(option.value as SortOption)}
                className="text-[10px] sm:text-xs h-8 px-2.5 sm:px-3 whitespace-nowrap"
              >
                <span className="sm:hidden">{option.label}</span>
                <span className="hidden sm:inline">{option.fullLabel}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {resultsWithLowestPrice.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
