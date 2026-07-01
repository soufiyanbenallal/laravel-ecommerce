import {useLoaderData, Await} from 'react-router';
import {Suspense} from 'react';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import ProductPage from '~/pages/product/product.show';

export const meta = ({data}) => {
  return [
    {title: `${data?.product?.title ?? ''} — KENZ Maison`},
    {
      name: 'description',
      content: data?.product?.description ?? '',
    },
    {
      rel: 'canonical',
      href: `/products/${data?.product?.handle}`,
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

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

function loadDeferredData({context, params}) {
  const {handle} = params;
  const {storefront} = context;

  // Load recommendations in the background
  const recommended = storefront
    .query(PRODUCT_RECOMMENDATIONS_QUERY, {variables: {handle}})
    .then((res) => res?.productRecommendations ?? [])
    .catch((err) => {
      console.error('Error loading recommendations:', err);
      return [];
    });

  return {
    recommended,
  };
}

export default function ProductRoute() {
  const {product, recommended} = useLoaderData();

  // Optimistically select variant
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sync search parameters to the variant options
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get option configuration arrays
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  // Mapper helper to translate raw product recommendations nodes
  const mapProductNode = (node) => {
    if (!node) return null;
    return {
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
    };
  };

  return (
    <>
      <Suspense fallback={<div className="h-screen bg-background flex items-center justify-center font-display text-lg tracking-widest text-muted-foreground">KENZ MAISON</div>}>
        <Await resolve={recommended}>
          {(resolvedRecommended) => {
            const mappedRelated = resolvedRecommended.map(mapProductNode).filter(Boolean);
            return (
              <ProductPage
                product={product}
                selectedVariant={selectedVariant}
                productOptions={productOptions}
                relatedProducts={mappedRelated}
              />
            );
          }}
        </Await>
      </Suspense>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    media(first: 10) {
      nodes {
        ... on MediaImage {
          id
          image {
            id
            url
            width
            height
            altText
          }
        }
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_RECOMMENDATIONS_QUERY = `#graphql
  query ProductRecommendations($handle: String!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    productRecommendations(productId: "", intent: RELATED, productHandle: $handle) {
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
      }
    }
  }
`;
