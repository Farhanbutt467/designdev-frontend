import ServicesHero from "@/components/service/ServicesHero";
import { getMainPage } from "@/lib/helper/contentConverter";
import ClientArea from "@/components/clients/ClientArea";
import ClientSlider from "@/components/clients/ClientSlider";
import ServiceInnerArea from "@/components/service/ServiceInnerArea";
import SeoData from "@/components/tools/SeoData";
import ContactBanner from "@/components/banner/ContactBanner";
import AboutBanner from "@/components/banner/AboutBanner";
import { getServices, getImageUrl, getpageData } from "@/lib/helper/api";
import { TServiceType } from "@/types";

const Services = async () => {
  const pageData = await getpageData("services");
  const { data: brands } = getMainPage("/brands/brands1.mdx");
  const { data: clients } = getMainPage("/brands/brands3.mdx");
  
  const servicesData = await getServices();
  const { data: aboutBanner } = getMainPage("/banner/about-banner.mdx");

  const services: TServiceType[] = servicesData.map((service: any) => ({
    data: {
      ...service,
      icon: {
        light: getImageUrl(service.icon_light),
        dark: getImageUrl(service.icon_dark),
      },
      image: getImageUrl(service.image),
      contactTitle: service.contact_title,
    },
    slug: service.slug,
    content: service.content,
  }));

  const { title, content } = pageData || {};
  const { hero, meta } = content || {};

  // ClientArea Component Data Update from API
  if (content?.brands && content.brands.length > 0) {
    brands.brands = content.brands.map((brand: any) => ({
      image: {
        dark: getImageUrl(brand.image?.dark),
        light: getImageUrl(brand.image?.light)
      }
    }));
  }

  return (
    <main>
      <SeoData
        title={title || "Services"}
        meta_title={meta?.meta_title}
        description={meta?.meta_description}
        seo_meta={pageData?.seo_meta}
      />
      <ServicesHero 
        title={hero?.title}
        description={hero?.description}
        image={getImageUrl(hero?.image)}
      />
      <ClientSlider clients={hero?.clients || clients.brands} />
      <ServiceInnerArea
        title={hero?.title2}
        description={hero?.description2}
        services={services}
      />
      <AboutBanner 
        title={hero?.about_title || aboutBanner.title}
        description={hero?.about_description || aboutBanner.description}
        image={getImageUrl(hero?.about_image) || aboutBanner.image}
        btn_text={hero?.about_btn_text || aboutBanner.btn_text}
        bgImage={aboutBanner.bgImage}
      />
      <ContactBanner contactTitle={hero?.contact_title} btn_text={hero?.btn_text} />
      <ClientArea brands={brands.brands} />
    </main>
  );
};

export default Services;
