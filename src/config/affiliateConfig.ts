// Affiliate configuration - Add your affiliate IDs here
// Each store has a different affiliate link format

export interface AffiliateConfig {
  storeId: string;
  storeName: string;
  affiliateId: string;
  buildUrl: (productQuery: string, affiliateId: string) => string;
}

export const affiliateConfig: AffiliateConfig[] = [
  {
    storeId: 'amazon',
    storeName: 'Amazon',
    affiliateId: 'YOUR_AMAZON_ASSOCIATE_ID', // Replace with your Amazon Associates ID (e.g., "mystore-20")
    buildUrl: (query, affiliateId) => 
      `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${affiliateId}`,
  },
  {
    storeId: 'bestbuy',
    storeName: 'Best Buy',
    affiliateId: 'YOUR_BESTBUY_AFFILIATE_ID', // Replace with your Best Buy affiliate ID
    buildUrl: (query, affiliateId) => 
      `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(query)}&irclickid=${affiliateId}`,
  },
  {
    storeId: 'walmart',
    storeName: 'Walmart',
    affiliateId: 'YOUR_WALMART_AFFILIATE_ID', // Replace with your Walmart affiliate ID
    buildUrl: (query, affiliateId) => 
      `https://www.walmart.com/search?q=${encodeURIComponent(query)}&affiliates_ad_id=${affiliateId}`,
  },
  {
    storeId: 'target',
    storeName: 'Target',
    affiliateId: 'YOUR_TARGET_AFFILIATE_ID', // Replace with your Target affiliate ID
    buildUrl: (query, affiliateId) => 
      `https://www.target.com/s?searchTerm=${encodeURIComponent(query)}&afid=${affiliateId}`,
  },
  {
    storeId: 'newegg',
    storeName: 'Newegg',
    affiliateId: 'YOUR_NEWEGG_AFFILIATE_ID', // Replace with your Newegg affiliate ID
    buildUrl: (query, affiliateId) => 
      `https://www.newegg.com/p/pl?d=${encodeURIComponent(query)}&nm_mc=AFC-${affiliateId}`,
  },
  {
    storeId: 'bhphoto',
    storeName: 'B&H Photo',
    affiliateId: 'YOUR_BH_AFFILIATE_ID', // Replace with your B&H Photo affiliate ID
    buildUrl: (query, affiliateId) => 
      `https://www.bhphotovideo.com/c/search?q=${encodeURIComponent(query)}&BI=${affiliateId}`,
  },
  {
    storeId: 'costco',
    storeName: 'Costco',
    affiliateId: 'YOUR_COSTCO_AFFILIATE_ID', // Replace with your Costco affiliate ID
    buildUrl: (query, affiliateId) => 
      `https://www.costco.com/CatalogSearch?keyword=${encodeURIComponent(query)}&refid=${affiliateId}`,
  },
  {
    storeId: 'ebay',
    storeName: 'eBay',
    affiliateId: 'YOUR_EBAY_PARTNER_ID', // Replace with your eBay Partner Network ID
    buildUrl: (query, affiliateId) => 
      `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}&campid=${affiliateId}`,
  },
];

// Helper function to get affiliate URL for a store
export const getAffiliateUrl = (storeId: string, productQuery: string): string => {
  const config = affiliateConfig.find(
    c => c.storeId === storeId.toLowerCase().replace(/[^a-z]/g, '')
  );
  
  if (config) {
    return config.buildUrl(productQuery, config.affiliateId);
  }
  
  // Fallback to generic search
  return `https://www.google.com/search?q=${encodeURIComponent(productQuery + ' ' + storeId)}`;
};
