import TopLineButton from "@/components/elements/button/TopLineButton";
import IntroSection from "@/components/elements/introSection/IntroSection";
import FaqSection from "@/components/faq/branding/FaqSection";
import SeoData from "@/components/tools/SeoData";
import { getMainPage } from "@/lib/helper/contentConverter";
import { getpageData } from "@/lib/helper/api";

const Faqs = async () => {
  const { data: faqsData } = getMainPage("/faqs/branding-faqs.mdx");
  const dynamicFaqData = await getpageData("faq");
  const faqContent = dynamicFaqData?.content || {};

  // Ensure we have a working object
  const finalData = { ...faqsData };

  // Override with dynamic content if available
  if (dynamicFaqData?.title) {
    if (!finalData.meta) finalData.meta = {};
    finalData.meta.meta_title = dynamicFaqData.title;
  }
  
  if (faqContent.title) {
    finalData.title = faqContent.title;
  }

  if (faqContent.description) {
    finalData.description = faqContent.description;
  }

  if (faqContent.action_btn) {
    finalData.action_btn = {
      ...(finalData.action_btn || {}),
      label: faqContent.action_btn.label || (finalData.action_btn?.label || ""),
      link: faqContent.action_btn.link || (finalData.action_btn?.link || ""),
      // In Laravel/PHP, checkboxes only exist if checked. Default to false if not present in action_btn object
      enable: faqContent.action_btn.enable == "1" || faqContent.action_btn.enable === true
    };
  }

  if (faqContent.faqs) {
    // Handle both array and object (common in PHP JSON responses)
    const rawFaqs = Array.isArray(faqContent.faqs) 
      ? faqContent.faqs 
      : Object.values(faqContent.faqs);
      
    if (rawFaqs.length > 0) {
      finalData.faqs = rawFaqs;
    }
  }

  if (faqContent.meta) {
    finalData.meta = {
      ...(finalData.meta || {}),
      meta_title: faqContent.meta.meta_title || (finalData.meta?.meta_title || ""),
      meta_description: faqContent.meta.meta_description || (finalData.meta?.meta_description || ""),
    };
  }


  return (
    <main>
      <SeoData
        title={dynamicFaqData?.title || finalData.title}
        meta_title={dynamicFaqData?.meta_title || finalData.meta?.meta_title}
        description={dynamicFaqData?.meta_description || finalData.meta?.meta_description}
        canonical={dynamicFaqData?.meta_canonical}
        seo_meta={dynamicFaqData?.seo_meta}
      />
      <div className="container">
        <div className="section-spacing-bottom pt-[60px] xl:pt-[100px] 2xl:pt-[100px]">
          <div className="grid gap-y-[30px] gap-x-[60px] lg:grid-cols-[300px_1fr] xl:grid-cols-[400px_1fr] 2xl:grid-cols-[485px_960px]">
            <div>
              {finalData.action_btn?.enable && <TopLineButton action_btn={finalData.action_btn} />}
            </div>
            <div>
              <IntroSection title={finalData.title} description={finalData.description} />
              <div className=" mt-[43px] xl:mt-[73px] 2xl:mt-[93px]">
                <FaqSection faqs={finalData.faqs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Faqs;

