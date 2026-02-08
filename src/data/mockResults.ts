import { ProductResult } from '@/components/ProductCard';

export const generateMockResults = (query: string): ProductResult[] => {
  const stores = [
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', delivery: 'Free Prime delivery' },
    { name: 'Best Buy', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg', delivery: 'Free shipping over $35' },
    { name: 'Walmart', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg', delivery: 'Free 2-day shipping' },
    { name: 'Target', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg', delivery: 'Same day delivery available' },
    { name: 'Newegg', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Newegg_Logo.svg', delivery: 'Free 3-5 day shipping' },
    { name: 'B&H Photo', logo: 'https://www.bhphotovideo.com/images/fb-logo-300.png', delivery: 'Free expedited shipping' },
    { name: 'Costco', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Costco_Wholesale_logo_2010-10-26.svg', delivery: 'Members only' },
    { name: 'eBay', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg', delivery: 'Varies by seller' },
  ];

  // Generate base price based on query
  const getBasePrice = (q: string): number => {
    if (q.toLowerCase().includes('iphone')) return 999;
    if (q.toLowerCase().includes('macbook')) return 1199;
    if (q.toLowerCase().includes('playstation') || q.toLowerCase().includes('ps5')) return 499;
    if (q.toLowerCase().includes('sony') || q.toLowerCase().includes('headphone')) return 349;
    if (q.toLowerCase().includes('airpods')) return 249;
    if (q.toLowerCase().includes('ipad')) return 799;
    return 299; // default
  };

  const basePrice = getBasePrice(query);
  
  return stores.map((store, index) => {
    // Vary prices by store
    const priceVariation = (Math.random() - 0.3) * (basePrice * 0.15);
    const price = Math.round((basePrice + priceVariation) * 100) / 100;
    const hasDiscount = Math.random() > 0.5;
    const originalPrice = hasDiscount ? Math.round(price * (1.1 + Math.random() * 0.2) * 100) / 100 : undefined;
    
    return {
      id: `${store.name.toLowerCase()}-${index}`,
      store: store.name,
      storeLogo: store.logo,
      productName: `${query} - ${store.name === 'eBay' ? 'Like New' : 'Brand New'} ${Math.random() > 0.5 ? '(Official)' : ''}`.trim(),
      price,
      originalPrice,
      currency: 'USD',
      rating: 3.5 + Math.random() * 1.5,
      reviews: Math.floor(100 + Math.random() * 5000),
      inStock: Math.random() > 0.15,
      url: `https://${store.name.toLowerCase().replace(/[^a-z]/g, '')}.com/search?q=${encodeURIComponent(query)}`,
      deliveryInfo: store.delivery,
    };
  }).sort((a, b) => a.price - b.price);
};
