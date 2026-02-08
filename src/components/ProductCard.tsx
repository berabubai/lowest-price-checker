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

  const handleClick = () => {
    // Open affiliate link in new tab
    window.open(product.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className={`group relative gradient-card rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-slide-up ${
        product.isLowestPrice 
          ? 'border-savings ring-2 ring-savings/20 shadow-lg' 
          : 'border-border hover:border-primary/20'
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Lowest Price Badge */}
      {product.isLowestPrice && (
        <div className="absolute -top-2.5 sm:-top-3 left-3 sm:left-4 z-10">
          <Badge className="bg-savings text-savings-foreground shadow-md px-2 sm:px-3 py-0.5 sm:py-1 gap-1 sm:gap-1.5 text-xs">
            <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Best Price
          </Badge>
        </div>
      )}

      <div className="p-4 sm:p-5">
        {/* Store Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-secondary flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src={product.storeLogo} 
                alt={product.store}
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${product.store}&background=random&size=40`;
                }}
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{product.store}</h3>
              {product.deliveryInfo && (
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{product.deliveryInfo}</p>
              )}
            </div>
          </div>
          
          {product.inStock ? (
            <Badge variant="outline" className="bg-savings-bg text-savings border-savings/20 text-[10px] sm:text-xs shrink-0">
              In Stock
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] sm:text-xs shrink-0">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Product Name */}
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 sm:mb-4 min-h-[2rem] sm:min-h-[2.5rem]">
          {product.productName}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-warning text-warning" />
              <span className="text-xs sm:text-sm font-medium">{product.rating.toFixed(1)}</span>
            </div>
            {product.reviews && (
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                ({product.reviews.toLocaleString()})
              </span>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-end justify-between mb-3 sm:mb-4">
          <div>
            <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
              <span className={`text-xl sm:text-2xl font-bold ${product.isLowestPrice ? 'text-savings' : 'text-foreground'}`}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs sm:text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {discount > 0 && (
              <span className="text-xs sm:text-sm font-medium text-savings">
                Save {discount}%
              </span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <Button
          variant={product.isLowestPrice ? "savings" : "default"}
          className="w-full gap-1.5 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10"
          onClick={handleClick}
          disabled={!product.inStock}
        >
          {product.inStock ? (
            <>
              Go to {product.store}
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </>
          ) : (
            'Out of Stock'
          )}
        </Button>
      </div>
    </div>
  );
};
