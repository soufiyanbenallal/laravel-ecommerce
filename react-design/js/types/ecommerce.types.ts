export type ProductModelType = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    price: number;
    old_price?: number;
    currency: string;
    image?: string;
    gallery?: string[];
    rating: number;
    reviews_count: number;
    is_new?: boolean;
    discount_percentage?: number;
    stock_status: 'in_stock' | 'out_of_stock' | 'backorder';
    colors: string[];
    sizes?: string[];
    materials: string[];
    gender: string;
    badge?: string | null;
    category?: string;
    metadata?: Record<string, any>;
};

export type CategoryModelType = {
    id: number;
    name: string;
    slug: string;
    icon?: string;
    image?: string;
    products_count?: number;
    color?: string;
};

export type CollectionModelType = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    products_count?: number;
    color?: string;
};

export type TestimonialType = {
    id: number;
    name: string;
    city: string;
    avatar?: string;
    rating: number;
    text: string;
    product_name?: string;
    is_verified: boolean;
};

export type CheckoutCartItem = {
    id: number;
    name: string;
    slug: string;
    summary?: string;
    image: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
};

export type CheckoutTotals = {
    subtotal: number;
    discount: number;
    total: number;
    currency: string;
};

export type PaymentMethodItem = {
    id: number;
    title: string;
    slug: string;
    description?: string;
};

export type ReviewType = {
    id: number;
    rating: number;
    title?: string | null;
    content?: string | null;
    is_recommended: boolean;
    created_at: string;
    author: {
        name: string;
        avatar?: string;
    };
};

export type ReviewStatsType = {
    average: number;
    total: number;
    distribution: Record<number, number>;
    recommendation_rate: number;
};

export type HomePropsType = {
    categories: CategoryModelType[];
    flash_deals: ProductModelType[];
    new_arrivals: ProductModelType[];
    collections: CollectionModelType[];
    testimonials: TestimonialType[];
};
