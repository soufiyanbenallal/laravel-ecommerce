import {Await, useLoaderData} from 'react-router';
import {Suspense} from 'react';
import Home from '~/pages/home/home.index';

export const meta = () => {
  return [
    {title: 'KENZ Maison — The Art of Dressing Well'},
    {
      name: 'description',
      content: 'Premium clothing sourced from artisan workshops across Europe and North Africa — designed to last decades, not seasons.',
    },
  ];
};

export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context}) {
  const {storefront} = context;
  try {
    const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
    return {
      isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
      shopifyCollections: collections?.nodes ?? [],
    };
  } catch (error) {
    console.error('Error loading critical home data:', error);
    return {
      isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
      shopifyCollections: [],
    };
  }
}

function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error('Error loading recommended products:', error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData();

  // Helper function to map Shopify GraphQL product nodes to ProductModelType
  const mapProduct = (node) => {
    if (!node) return null;
    return {
      id: node.id,
      name: node.title,
      slug: node.handle,
      price: parseFloat(node.priceRange?.minVariantPrice?.amount || '0'),
      currency: node.priceRange?.minVariantPrice?.currencyCode || 'USD',
      image: node.featuredImage?.url || '',
      rating: 4.8,
      reviews_count: 86,
      stock_status: 'in_stock',
      colors: [],
      sizes: [],
      materials: [],
      gender: 'unisex',
    };
  };

  return (
    <Suspense fallback={<div className="h-screen bg-background flex items-center justify-center font-display text-lg tracking-widest text-muted-foreground">KENZ MAISON</div>}>
      <Await resolve={data.recommendedProducts}>
        {(productsResponse) => {
          const rawProducts = productsResponse?.products?.nodes ?? [];
          const mappedProducts = rawProducts.map(mapProduct).filter(Boolean);

          // Map collections
          const mappedCollections = data.shopifyCollections?.map((c) => ({
            name: c.title,
            slug: c.handle,
            image: c.image?.url ?? '',
            description: c.description || 'Editorial curated collection.',
          })).filter(c => c.image !== '');

          return (
            <Home 
              products={mappedProducts} 
              collections={mappedCollections?.length ? mappedCollections : undefined}
            />
          );
        }}
      </Await>
    </Suspense>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 3, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        description
        image {
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

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
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
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;
