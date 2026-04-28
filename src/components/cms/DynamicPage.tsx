"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MarketingLayout from "@/app/(home)/marketing/layout";
import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import CTASection from "./sections/CTASection";
import TextSection from "./sections/TextSection";
import SeoData from "../tools/SeoData";

export default function DynamicPage({ slug }: { slug: string }) {
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";
        const res = await axios.get(`${baseUrl}/page/${slug}`);
        setPage(res.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setError("Page not found");
        } else {
          setError("Failed to load page content.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <MarketingLayout>
        <div className="flex justify-center items-center h-screen">Loading...</div>
      </MarketingLayout>
    );
  }

  if (error || !page) {
    return (
      <MarketingLayout>
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-4xl font-bold">{error || "Page Not Found"}</h1>
        </div>
      </MarketingLayout>
    );
  }

  return (
    <MarketingLayout>
      <SeoData
        title={page.title}
        meta_title={page.meta_title}
        meta_description={page.meta_description}
        meta_canonical={page.meta_canonical}
        meta_open_graph={page.meta_open_graph}
        meta_twitter={page.meta_twitter}
      />
      <main>
        {/* Dynamic section rendering based on section_key */}
        {page.sections?.map((section: any) => {
          switch (section.section_key) {
            case "hero":
              return <HeroSection key={section.id} data={section} />;
            case "features":
              return <FeaturesSection key={section.id} data={section} />;
            case "cta":
              return <CTASection key={section.id} data={section} />;
            case "text":
              return <TextSection key={section.id} data={section} />;
            default:
              return null;
          }
        })}
      </main>
    </MarketingLayout>
  );
}
