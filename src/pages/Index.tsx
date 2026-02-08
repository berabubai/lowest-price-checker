import { useState } from 'react';
import { Header } from '@/components/Header';
import { SearchHero } from '@/components/SearchHero';
import { ResultsSection } from '@/components/ResultsSection';
import { LoadingState } from '@/components/LoadingState';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { ProductResult } from '@/components/ProductCard';
import { generateMockResults } from '@/data/mockResults';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<ProductResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    setHasSearched(true);
    setResults([]);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock results
    const mockResults = generateMockResults(query);
    setResults(mockResults);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <SearchHero onSearch={handleSearch} isLoading={isLoading} />
        
        {isLoading && <LoadingState query={searchQuery} />}
        
        {!isLoading && results.length > 0 && (
          <ResultsSection results={results} searchQuery={searchQuery} />
        )}
        
        {!hasSearched && <Features />}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
