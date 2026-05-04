import { notFound } from "next/navigation";
import { getServiceBySlug, getServices, getImageUrl } from "@/lib/helper/api";
import MDXContent from "@/components/tools/MDXContent";
import SeoData from "@/components/tools/SeoData";
import ServiceDetailsFaq from "@/components/service/ServiceDetailsFaq";
import AiHero from "@/components/hero/Ai/AiHero";
import ClientArea from "@/components/clients/ClientArea";
import ContactBanner from "@/components/banner/ContactBanner";
import PricingArea from "@/components/pricing/PricingArea";
import { getAllPages, getMainPage } from "@/lib/helper/contentConverter";
import ServicesHero from "@/components/service/ServicesHero";
import AboutBanner from "@/components/banner/AboutBanner";

type Props = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const services = await getServices();
  const paths = services.map((service: any) => ({
    slug: service.slug,
  }));

  return paths;
};

const ServiceDetail = async ({ params }: Props) => {
  const { slug } = params;
  const serviceData = await getServiceBySlug(slug);
  const { data: hero } = getMainPage("/heros/ai-hero.mdx")
  if (!serviceData) {
    notFound();
  }

  const {
    title,
    content,
    faqs,
    faq_title,
    contact_title,
    btn_text,
    meta_title,
    meta_description,
    image,
    description,
    about_title,
    about_description,
    about_image,
    brands: serviceBrands,
    hero_customers,
    hero_customer_text,
    hero_customer_icon,
    hero_feature_text,
    hero_info_thumb_light,
    hero_info_thumb_dark,
    hero_info_action_btn_label,
    hero_info_action_btn_link,
    faq_image
  } = serviceData || {};

  const { data: brands } = getMainPage("/brands/brands1.mdx");

  return (
    <main className="instrument-ai" theme-setting="style-4">
      <SeoData title={title} meta_title={meta_title} description={meta_description} />
      <AiHero
        {...hero}
        title={title}
        customers={hero_customers || hero.customers}
        customer_text={hero_customer_text}
        client_img={hero_customer_icon ? {
          light: getImageUrl(hero_customer_icon),
          dark: getImageUrl(hero_customer_icon)
        } : hero.client_img}
        feature_text={hero_feature_text || hero.feature_text}
        image={image ? getImageUrl(image) : hero.image}
        info={{
          ...hero.info,
          description: description || hero.info.description,
          thumb: {
            light: hero_info_thumb_light ? getImageUrl(hero_info_thumb_light) : hero.info.thumb.light,
            dark: hero_info_thumb_dark ? getImageUrl(hero_info_thumb_dark) : hero.info.thumb.dark,
          },
          action_btn: {
            ...hero.info.action_btn,
            label: hero_info_action_btn_label || hero.info.action_btn.label,
            link: hero_info_action_btn_link || hero.info.action_btn.link,
          }
        }}
      />
      <div className="service-details-inner">
        <MDXContent content={content} serviceData={serviceData} />

        <ServiceDetailsFaq faqs={faqs} faqTitle={faq_title} faqImage={faq_image ? getImageUrl(faq_image) : undefined} />
        {/* <ClientArea brands={serviceBrands && serviceBrands.length > 0 ? serviceBrands : brands.brands} /> */}
        <ContactBanner contactTitle={contact_title} btn_text={btn_text} />
      </div>
    </main>
  );
};

export default ServiceDetail;
