import DynamicPage from "@/components/cms/DynamicPage";

export default function CMSPage({ params }: { params: { slug: string } }) {
  return <DynamicPage slug={params.slug} />;
}
