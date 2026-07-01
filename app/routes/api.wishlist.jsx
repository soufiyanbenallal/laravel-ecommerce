import {data} from 'react-router';

export async function action({request, context}) {
  const {storefront} = context;
  
  try {
    const {ids} = await request.json();
    
    if (!ids || !ids.length) {
      return data([]);
    }

    const {nodes} = await storefront.query(WISHLIST_PRODUCTS_QUERY, {
      variables: {ids},
    });

    // Map raw Shopify nodes to clean ProductModelType structures
    const mapped = (nodes || []).filter(Boolean).map((node) => ({
      id: node.id,
      name: node.title,
      slug: node.handle,
      price: parseFloat(node.priceRange?.minVariantPrice?.amount || '0'),
      currency: node.priceRange?.minVariantPrice?.currencyCode || 'USD',
      image: node.featuredImage?.url || '',
      rating: 4.8,
      reviews_count: 24,
      stock_status: 'in_stock',
      colors: [],
      sizes: [],
      materials: [],
      gender: 'unisex',
    }));

    return data(mapped);
  } catch (error) {
    console.error('Error fetching wishlist products:', error);
    return data([], {status: 500});
  }
}

const WISHLIST_PRODUCTS_QUERY = `#graphql
  query WishlistProducts($ids: [ID!]!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
`;
