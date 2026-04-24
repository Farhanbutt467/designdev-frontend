import { notFound } from "next/navigation";
import { getServiceBySlug, getServices, getImageUrl } from "@/lib/helper/api";
import MDXContent from "@/components/tools/MDXContent";
import SeoData from "@/components/tools/SeoData";
import ServiceDetailsFaq from "@/components/service/ServiceDetailsFaq";
import ClientArea from "@/components/clients/ClientArea";
import ContactBanner from "@/components/banner/ContactBanner";
import PricingArea from "@/components/pricing/PricingArea";
import { getMainPage } from "@/lib/helper/contentConverter";
import ServicesHero from "@/components/service/ServicesHero";

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
    brands: serviceBrands
  } = serviceData || {};

  const { data: brands } = getMainPage("/brands/brands1.mdx");

  return (
    <main>
      <SeoData
        title={title}
        meta_title={meta_title}
        description={meta_description}
      />
      <ServicesHero 
        title={title}
        description={description}
        image={getImageUrl(image)}
      />
      <div className="service-details-inner">
        <div className="container2 section-spacing">
            <MDXContent content={content} />
        </div>
        
        <AboutBanner 
            title={about_title || ""}
            description={about_description || ""}
            image={getImageUrl(about_image)}
            btn_text={btn_text || "Contact Us"}
            bgImage="/assets/imgs/banner/about-banner-bg.png"
        />

        <ServiceDetailsFaq faqs={faqs} faqTitle={faq_title} />
        <ClientArea brands={serviceBrands && serviceBrands.length > 0 ? serviceBrands : brands.brands} />
        <ContactBanner contactTitle={contact_title} btn_text={btn_text} />
      </div>
    </main>
  );
};

export default ServiceDetail;
