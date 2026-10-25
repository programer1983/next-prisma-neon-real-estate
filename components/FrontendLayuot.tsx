import Footer from "./Footer";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children} <Footer />
    </>
  );
}
