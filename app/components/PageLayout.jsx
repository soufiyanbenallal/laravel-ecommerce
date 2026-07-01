import {Await} from 'react-router';
import {Suspense} from 'react';
import {Header} from '~/components/site/Header';
import {Footer} from '~/components/site/Footer';
import {CartDrawer} from '~/components/site/CartDrawer';

/**
 * PageLayout defines the custom "Quiet Luxury" storefront wrapper shell.
 * It coordinates the Header, Footer, and the slide-out Cart Drawer.
 */
export function PageLayout({
  cart,
  children = null,
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased selection:bg-accent/10">
      
      {/* Await the cart data asynchronously to display the Header with correct badge count */}
      <Suspense fallback={<Header cart={null} />}>
        <Await resolve={cart}>
          {(resolvedCart) => <Header cart={resolvedCart} />}
        </Await>
      </Suspense>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Slide-out Cart Drawer */}
      <Suspense fallback={null}>
        <Await resolve={cart}>
          {(resolvedCart) => <CartDrawer cart={resolvedCart} />}
        </Await>
      </Suspense>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
