import {useLoaderData} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import CollectionPage from '~/pages/collections/collections.show';

export const meta = ({data}) => {
  return [
    {title: `${data?.collection?.title ?? ''} Collection — KENZ Maison`},
    {
      name: 'description',
      content: data?.collection?.description ?? '',
    },
  ];
};

export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 36,
  });

  if (!handle) {
    throw new Response(`Expected collection handle to be defined`, {status: 400});
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
  };
}

function loadDeferredData({context}) {
  return {};
}

export default function CollectionRoute() {
  const {collection} = useLoaderData();

  // Map products to ProductModelType
  const mappedProducts = (collection.products?.nodes ?? []).map((node) => {
    return {
      id: node.id,
      name: node.title,
      slug: node.handle,
      price: parseFloat(node.priceRange?.minVariantPrice?.amount || '0'),
      currency: node.priceRange?.minVariantPrice?.currencyCode || 'USD',
      image: node.featuredImage?.url || '',
      rating: 4.8,
      reviews_count: 14,
      stock_status: 'in_stock',
      colors: [],
      sizes: [],
      materials: [],
      gender: 'unisex',
    };
  });

  const mappedCollection = {
    id: collection.id,
    name: collection.title,
    slug: collection.handle,
    description: collection.description,
    image: collection.image?.url ?? null,
  };

  return (
    <>
      <CollectionPage 
        collection={mappedCollection} 
        products={mappedProducts} 
      />

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
`;

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        id
        url
        altText
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;
