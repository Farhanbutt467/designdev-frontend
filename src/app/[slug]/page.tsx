import DynamicPage from "@/components/cms/DynamicPage";
import SeoData from "@/components/tools/SeoData";
import { getpageData } from "@/lib/helper/api";
import { notFound } from "next/navigation";

export default async function CMSPage({ params }: { params: { slug: string } }) {
  const pageData = await getpageData(params.slug);
  
  if (!pageData) {
    notFound();
  }

  const { title, seo_meta } = pageData;

  return (
    <>
      <SeoData 
        title={title} 
        seo_meta={seo_meta} 
      />
      <DynamicPage slug={params.slug} initialData={pageData} />
    </>
  );
}
