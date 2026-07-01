import About from '~/pages/about/about.index.tsx';

export const meta = () => {
  return [
    {title: 'The Atelier — KENZ Maison'},
    {
      name: 'description',
      content: 'How KENZ Maison works with independent makers across Europe and North Africa.',
    },
  ];
};

export default function AboutRoute() {
  return <About />;
}
