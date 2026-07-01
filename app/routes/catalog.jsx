import {useLoaderData} from 'react-router';
import ProductsList from '~/pages/catalog/catalog.index';

export const meta = () => {
  return [
    {title: 'The Shop — KENZ Maison'},
    {
      name: 'description',
      content: 'Browse premium clothing, footwear and accessories — sourced from artisan workshops across Europe and North Africa.',
    },
  ];
};

export async function loader({context}) {
  const {storefront} = context;

  const {products, collections} = await storefront.query(CATALOG_PAGE_QUERY);

  return {
    products: products?.nodes ?? [],
    collections: collections?.nodes ?? [],
  };
}

export default function CatalogRoute() {
  const {products, collections} = useLoaderData();

  // Map products to ProductModelType
  const mappedProducts = products.map((node) => {
    return {
      id: node.id,
      name: node.title,
      slug: node.handle,
      price: parseFloat(node.priceRange?.minVariantPrice?.amount || '0'),
      currency: node.priceRange?.minVariantPrice?.currencyCode || 'USD',
      image: node.featuredImage?.url || '',
      rating: 4.8,
      reviews_count: 32,
      stock_status: 'in_stock',
      colors: [],
      sizes: [],
      materials: [],
      gender: 'unisex',
      category: node.collections?.nodes?.[0]?.title ?? 'All',
    };
  });

  // Map collections to CategoryModelType
  const mappedCategories = collections.map((c) => ({
    id: c.id,
    name: c.title,
    slug: c.handle,
    image: c.image?.url ?? '',
  }));

  return (
    <ProductsList 
      products={mappedProducts} 
      categories={mappedCategories} 
    />
  );
}

const CATALOG_PAGE_QUERY = `#graphql
  query CatalogPage($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 48, sortKey: UPDATED_AT, reverse: true) {
      nodes {
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
        collections(first: 1) {
          nodes {
            title
          }
        }
      }
    }
    collections(first: 10) {
      nodes {
        id
        title
        handle
        image {
          id
          url
          altText
        }
      }
    }
  }
`;
