import WishlistPage from '~/pages/wishlist/wishlist.index.tsx';

export const meta = () => {
  return [
    {title: 'Your Saved Items — KENZ Maison'},
    {
      name: 'description',
      content: 'View your saved luxury garments and accessories.',
    },
  ];
};

export default function WishlistRoute() {
  return <WishlistPage />;
}
