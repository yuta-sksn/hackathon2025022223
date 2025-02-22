import TheHeader from '@/components/layouts/TheHeader/TheHeader';
import TheFooter from '@/components/layouts/TheFooter/TheFooter';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TheHeader />
      <div className="flex-1 pt-16 sm:pt-0">{children}</div>
      <TheFooter />
    </>
  );
}
