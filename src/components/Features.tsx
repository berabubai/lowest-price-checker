import { Search, TrendingDown, ExternalLink, Shield, Clock, Zap } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Enter any product name or paste a direct link. Our AI understands what you\'re looking for.',
  },
  {
    icon: TrendingDown,
    title: 'Best Price Guarantee',
    description: 'We compare prices across 50+ verified retailers to find you the absolute lowest price.',
  },
  {
    icon: ExternalLink,
    title: 'Direct Links',
    description: 'One click takes you directly to the product page. No middlemen, no hidden fees.',
  },
  {
    icon: Shield,
    title: 'Verified Retailers',
    description: 'We only search trusted, verified online stores to ensure safe shopping.',
  },
  {
    icon: Clock,
    title: 'Real-Time Prices',
    description: 'Prices are fetched in real-time so you never miss a flash sale or limited deal.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get comprehensive price comparisons in seconds, not minutes.',
  },
];

export const Features = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Why Use PriceHunt?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Save time and money with our powerful price comparison engine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
