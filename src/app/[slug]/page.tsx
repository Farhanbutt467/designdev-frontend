import DynamicPage from "@/components/cms/DynamicPage";
import SeoData from "@/components/tools/SeoData";
import { getpageData } from "@/lib/helper/api";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";
    const res = await fetch(`${baseUrl}/content-pages`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const pages = await res.json();
    const list = Array.isArray(pages) ? pages : (pages.data || []);
    return list.map((page: any) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params for [slug]:", error);
    return [];
  }
}

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
