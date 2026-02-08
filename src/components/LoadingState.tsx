import { Search, Store, TrendingDown } from 'lucide-react';

interface LoadingStateProps {
  query: string;
}

export const LoadingState = ({ query }: LoadingStateProps) => {
  const steps = [
    { icon: Search, label: 'Searching for products...', delay: '0s' },
    { icon: Store, label: 'Checking 50+ stores...', delay: '0.2s' },
    { icon: TrendingDown, label: 'Finding best prices...', delay: '0.4s' },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 bg-background">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl gradient-primary flex items-center justify-center shadow-glow animate-pulse">
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-1.5 sm:mb-2">
            Searching for "{query}"
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Please wait while we find the best deals...
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card border border-border animate-slide-up"
              style={{ animationDelay: step.delay }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs sm:text-sm font-medium text-foreground">{step.label}</p>
                <div className="mt-1.5 sm:mt-2 h-1 sm:h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-primary rounded-full animate-shimmer"
                    style={{ 
                      width: '100%',
                      backgroundSize: '200% 100%',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
