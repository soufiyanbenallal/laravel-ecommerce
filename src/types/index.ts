export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  description: string;
  description_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  tags: string[];
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  options: ShopifyOption[];
  url: string;
  featured_image: ShopifyImage | null;
}

export interface ShopifyVariant {
  id: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  sku: string | null;
  requires_shipping: boolean;
  taxable: boolean;
  available: boolean;
  price: string;
  compare_at_price: string | null;
  grams: number;
  image_id: number | null;
}

export interface ShopifyOption {
  name: string;
  position: number;
  values: string[];
}

export interface ShopifyImage {
  id: number;
  src: string;
  alt: string | null;
  width: number;
  height: number;
  position: number;
}

export interface ShopifyCollection {
  id: number;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products_count: number;
}

export interface CartItem {
  key: string;
  id: number;
  variant_id: number;
  quantity: number;
  title: string;
  variant_title: string | null;
  sku: string | null;
  vendor: string;
  product_id: number;
  properties: Record<string, string>;
  product_title: string;
  product_handle: string;
  image: string | null;
  grams: number;
  price: number;
  original_price: number;
  discounted_price: number;
  line_price: number;
  original_line_price: number;
  discounted_line_price: number;
  url: string;
}

export interface Cart {
  token: string;
  note: string | null;
  item_count: number;
  total_price: number;
  total_discount: number;
  requires_shipping: boolean;
  items: CartItem[];
}

export interface Customer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  orders_count: number;
  total_spent: string;
}
