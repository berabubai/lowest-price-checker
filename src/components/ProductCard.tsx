import { ExternalLink, TrendingDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface ProductResult {
  id: string;
  store: string;
  storeLogo: string;
  productName: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating?: number;
  reviews?: number;
  inStock: boolean;
  url: string;
  isLowestPrice?: boolean;
  deliveryInfo?: string;
}

interface ProductCardProps {
  product: ProductResult;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: product.currency,
    }).format(price);
  };

  return (
    <div 
      className={`group relative gradient-card rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-slide-up ${
        product.isLowestPrice 
          ? 'border-savings ring-2 ring-savings/20 shadow-lg' 
          : 'border-border hover:border-primary/20'
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Lowest Price Badge */}
      {product.isLowestPrice && (
        <div className="absolute -top-3 left-4 z-10">
          <Badge className="bg-savings text-savings-foreground shadow-md px-3 py-1 gap-1.5">
            <TrendingDown className="w-3.5 h-3.5" />
            Best Price
          </Badge>
        </div>
      )}

      <div className="p-5">
        {/* Store Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
              <img 
                src={product.storeLogo} 
                alt={product.store}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${product.store}&background=random&size=40`;
                }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{product.store}</h3>
              {product.deliveryInfo && (
                <p className="text-xs text-muted-foreground">{product.deliveryInfo}</p>
              )}
            </div>
          </div>
          
          {product.inStock ? (
            <Badge variant="outline" className="bg-savings-bg text-savings border-savings/20">
              In Stock
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Product Name */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
          {product.productName}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
            </div>
            {product.reviews && (
              <span className="text-xs text-muted-foreground">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${product.isLowestPrice ? 'text-savings' : 'text-foreground'}`}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {discount > 0 && (
              <span className="text-sm font-medium text-savings">
                Save {discount}%
              </span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <Button
          variant={product.isLowestPrice ? "savings" : "default"}
          className="w-full gap-2"
          onClick={() => window.open(product.url, '_blank')}
          disabled={!product.inStock}
        >
          {product.inStock ? (
            <>
              Go to {product.store}
              <ExternalLink className="w-4 h-4" />
            </>
          ) : (
            'Out of Stock'
          )}
        </Button>
      </div>
    </div>
  );
};
