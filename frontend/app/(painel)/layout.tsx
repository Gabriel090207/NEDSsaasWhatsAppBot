import Layout from "../../components/Layout/Layout";

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}