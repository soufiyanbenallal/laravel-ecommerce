// Analytics Event Types
interface BaseEvent {
  event_name: string;
  timestamp: number;
}

interface PageViewEvent extends BaseEvent {
  event_name: 'page_view';
  page_title: string;
  page_location: string;
}

interface ProductViewEvent extends BaseEvent {
  event_name: 'product_view';
  product_id: string;
  product_name: string;
  product_price: string;
  product_category: string;
}

interface AddToCartEvent extends BaseEvent {
  event_name: 'add_to_cart';
  product_id: string;
  product_name: string;
  product_price: string;
  quantity: number;
}

interface PurchaseEvent extends BaseEvent {
  event_name: 'purchase';
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    item_id: string;
    item_name: string;
    price: string;
    quantity: number;
  }>;
}

type AnalyticsEvent = PageViewEvent | ProductViewEvent | AddToCartEvent | PurchaseEvent;

// Analytics Manager
class AnalyticsManager {
  private queue: AnalyticsEvent[] = [];
  private isInitialized = false;

  init(measurementId: string) {
    if (this.isInitialized) return;

    // Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    this.isInitialized = true;
    this.flush();
  }

  track(event: AnalyticsEvent) {
    if (!this.isInitialized) {
      this.queue.push(event);
      return;
    }

    this.sendEvent(event);
  }

  private sendEvent(event: AnalyticsEvent) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(['event', event.event_name, event]);
  }

  private flush() {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) this.sendEvent(event);
    }
  }

  // Convenience methods
  trackPageView(title: string, location: string) {
    this.track({
      event_name: 'page_view',
      page_title: title,
      page_location: location,
      timestamp: Date.now(),
    });
  }

  trackProductView(product: { id: string; name: string; price: string; category: string }) {
    this.track({
      event_name: 'product_view',
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      product_category: product.category,
      timestamp: Date.now(),
    });
  }

  trackAddToCart(product: { id: string; name: string; price: string }, quantity: number) {
    this.track({
      event_name: 'add_to_cart',
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      quantity,
      timestamp: Date.now(),
    });
  }

  trackPurchase(order: { id: string; total: number; currency: string; items: AnalyticsEvent['items'] }) {
    this.track({
      event_name: 'purchase',
      transaction_id: order.id,
      value: order.total,
      currency: order.currency,
      items: order.items,
      timestamp: Date.now(),
    });
  }
}

export const analytics = new AnalyticsManager();

// Shopify Events
export function trackShopifyEvents() {
  // Track product views on product pages
  if (window.ShopifyAnalytics?.meta?.product) {
    const product = window.ShopifyAnalytics.meta.product;
    analytics.trackProductView({
      id: String(product.id),
      name: product.type || 'Product',
      price: String(product.price / 100),
      category: product.type || '',
    });
  }

  // Track page views
  analytics.trackPageView(document.title, window.location.href);
}

// Declare ShopifyAnalytics types
declare global {
  interface Window {
    dataLayer: unknown[];
    ShopifyAnalytics?: {
      meta?: {
        product?: {
          id: number;
          type: string;
          price: number;
        };
        page?: {
          pageTitle: string;
          pageType: string;
        };
      };
    };
  }
}
