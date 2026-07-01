import ContactPage from '~/pages/contact/contact.index.tsx';

export const meta = () => {
  return [
    {title: 'Contact The Studio — KENZ Maison'},
    {
      name: 'description',
      content: 'Inquire about private appointments, wholesale orders, or custom fitting consultations.',
    },
  ];
};

export default function ContactRoute() {
  return <ContactPage />;
}
