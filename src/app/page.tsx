import React from "react";
import { getAllPages, getMainPage } from "@/lib/helper/contentConverter";
import navigation from "@/config/navigation.json";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ToolsComponent from "@/components/tools";
import ScrollTop from "@/components/tools/ScrollTop";
import InnerHeader1 from "@/components/headers/InnerHeader1";
import Footer1 from "@/components/footer/Footer1";
import MarketingAbout from "@/components/about/MarketingAbout";
import MarketingBanner from "@/components/banner/MarketingBanner";
import MarketingBlog from "@/components/blog/marketing/MarketingBlog";
import MarketingClients from "@/components/clients/MarketingClients";
import MarketingFeature from "@/components/features/marketing/MarketingFeature";
import MarketingFunFact from "@/components/funFact/marketing/MarketingFunFact";
import MarketingHero from "@/components/hero/MarketingHero";
import MarketingImage from "@/components/image/MarketingImage";
import MarketingReport from "@/components/report/MarketingReport";
import MarketingService from "@/components/service/marketing/MarketingService";
import MarketingTestimonial from "@/components/testimonial/marketing/MarketingTestimonial";
import SeoData from "@/components/tools/SeoData";
import MarketingWork from "@/components/work/marketing/MarketingWork";
import { getPageSettings } from "@/lib/helper/api";

const Marketing = async () => {
  const { data: hero } = getMainPage("/heros/marketing-hero.mdx");
  const { data: image } = getMainPage("/image/marketing-image.mdx");
  const { data: feature } = getMainPage("/features/marketing-features.mdx");
  const { data: service } = getMainPage("/services/marketing/_main.mdx");
  const services = getAllPages("/services/marketing");
  const works = getAllPages("/works/marketing");
  const { data: workMain } = getMainPage("/works/marketing/_main.mdx");
  const { data: about } = getMainPage("/about/marketing-about.mdx");
  const { data: testimonial } = getMainPage("/testimonial/marketing-testimonial.mdx");
  const { data: funFact } = getMainPage("/funFact/marketing-fun-fact.mdx");
  const { data: banner } = getMainPage("/banner/marketing-banner.mdx");
  const { data: clients } = getMainPage("/brands/brands1.mdx");
  const { data: report } = getMainPage("/report/marketing-report.mdx");
  const { data: clientTitle } = getMainPage("/clients/marketing-clients.mdx");
  const { data: blog } = getMainPage("/blogs/marketing/_main.mdx");
  const blogs = getAllPages("/blogs/marketing");

  const pageSettings = await getPageSettings();

  return (
    <div className="plus-jakarta root-layout" theme-setting="style-5">
      <SeoData
        title="Arolax Marketing Agency"
        description="Arolax Marketing Agency Description"
      />
      <ScrollSmootherComponent />
      <ToolsComponent />
      <ScrollTop />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <InnerHeader1 />
          <main>
            <MarketingHero {...hero} />
            <MarketingImage {...image} />
            <MarketingFeature {...feature} />
            <MarketingService {...service} services={services} />
            <MarketingWork {...workMain} projects={works} />
            <MarketingAbout {...about} />
            <MarketingTestimonial {...testimonial} />
            <MarketingFunFact {...funFact} />
            <MarketingBanner {...banner} />
            <MarketingReport {...report} />
            <MarketingClients {...clientTitle} clients={clients.brands} />
            <MarketingBlog blogs={blogs} {...blog} />
          </main>
          <Footer1 footerNav={navigation.footer1} pageSettings={pageSettings} />
        </div>
      </div>
    </div>
  );
};

export default Marketing;
