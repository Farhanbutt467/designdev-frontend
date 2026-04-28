import AboutAward from "@/components/about/AboutAward";
import AboutHero from "@/components/about/AboutHero";
import AboutTestimonial from "@/components/about/AboutTestimonial";
import TeamCounterArea from "@/components/team/TeamCounterArea";
import ClientArea from "@/components/clients/ClientArea";
import { getAllPages, getMainPage } from "@/lib/helper/contentConverter";
import SeoData from "@/components/tools/SeoData";
import ContactBanner from "@/components/banner/ContactBanner";
import AboutBanner from "@/components/banner/AboutBanner";
import { getpageData, getImageUrl } from "@/lib/helper/api";

const About = async () => {
  const { data: about } = getMainPage("/about/branding-about.mdx");
  const { data: aboutBanner } = getMainPage("/banner/about-banner.mdx");
  const { data: testimonial } = getMainPage(
    "/testimonial/about_testimonial.mdx"
  );
  const { data: contactBanner } = getMainPage("/banner/contact-banner.mdx");
  const { data: brands } = getMainPage("/brands/brands1.mdx");
  const { title, hero, counter_area, award_area, meta } =
    about || {};
 const aboutuspageData = await getpageData("about-us");
 const aboutusContent = aboutuspageData?.content || {};
 
  //AboutHero Component Data Update from API
  if (aboutusContent.hero) {
    hero.title = aboutusContent.hero.title || hero.title;
    hero.sub_title = aboutusContent.hero.sub_title || hero.sub_title;
    hero.description = aboutusContent.hero.description || hero.description;
  }

  // TeamCounterArea Component Data Update from API
  if (aboutusContent.counter_area) {
    counter_area.client_count = aboutusContent.counter_area.client_count || counter_area.client_count;
    counter_area.client_title = aboutusContent.counter_area.client_title || counter_area.client_title;
    counter_area.funding_count = aboutusContent.counter_area.funding_count || counter_area.funding_count;
    counter_area.funding_title = aboutusContent.counter_area.funding_title || counter_area.funding_title;
    counter_area.thumb1 = getImageUrl(aboutusContent.counter_area.thumb1) || counter_area.thumb1;
    counter_area.thumb2 = getImageUrl(aboutusContent.counter_area.thumb2) || counter_area.thumb2;
    counter_area.thumb3 = getImageUrl(aboutusContent.counter_area.thumb3) || counter_area.thumb3;
    counter_area.bg_1 = getImageUrl(aboutusContent.counter_area.bg_1) || counter_area.bg_1;
    counter_area.bg_2 = getImageUrl(aboutusContent.counter_area.bg_2) || counter_area.bg_2;
  }

  // AboutAward Component Data Update from API
  if (aboutusContent.award_area) {
    award_area.title = aboutusContent.award_area.title || award_area.title;
    award_area.sub_title = aboutusContent.award_area.sub_title || award_area.sub_title;
    award_area.description = aboutusContent.award_area.description || award_area.description;
    if (aboutusContent.award_area.image1 || aboutusContent.award_area.image2) {
      award_area.images = [
        getImageUrl(aboutusContent.award_area.image1) || award_area.images[0],
        getImageUrl(aboutusContent.award_area.image2) || award_area.images[1]
      ];
    }
  }
  if (aboutusContent.awards_list && aboutusContent.awards_list.length > 0) {
    award_area.awards_list = aboutusContent.awards_list.map((award: any) => ({
      ...award,
      icon: {
        dark: getImageUrl(award.icon?.dark),
        light: getImageUrl(award.icon?.light)
      }
    }));
  }

  // AboutBanner Component Data Update from API
  if (aboutusContent.aboutBanner) {
    aboutBanner.title = aboutusContent.aboutBanner.title || aboutBanner.title;
    aboutBanner.description = aboutusContent.aboutBanner.description || aboutBanner.description;
    aboutBanner.btn_text = aboutusContent.aboutBanner.btn_text || aboutBanner.btn_text;
    aboutBanner.image = getImageUrl(aboutusContent.aboutBanner.image) || aboutBanner.image;
    aboutBanner.bgImage = getImageUrl(aboutusContent.aboutBanner.bgImage) || aboutBanner.bgImage;
  }

  // AboutTestimonial Component Data Update from API
  if (aboutusContent.testimonials && aboutusContent.testimonials.length > 0) {
    testimonial.testimonials = aboutusContent.testimonials.map((t: any) => ({
      quote: t.quote,
      author: t.author,
      designation: t.designation
    }));
  }
  if (aboutusContent.testimonial?.icons) {
    testimonial.icon = {
      dark: getImageUrl(aboutusContent.testimonial.icons.dark),
      light: getImageUrl(aboutusContent.testimonial.icons.light)
    };
  }

  // ContactBanner Component Data Update from API
  if (aboutusContent.contactBanner) {
    contactBanner.contactTitle = aboutusContent.contactBanner.contactTitle || contactBanner.contactTitle;
    contactBanner.btn_text = aboutusContent.contactBanner.btn_text || contactBanner.btn_text;
  }

  // ClientArea Component Data Update from API
  if (aboutusContent.brands && aboutusContent.brands.length > 0) {
    brands.brands = aboutusContent.brands.map((brand: any) => ({
      image: {
        dark: getImageUrl(brand.image?.dark),
        light: getImageUrl(brand.image?.light)
      }
    }));
  }

  return (
    <main>
      <SeoData 
        title={aboutuspageData?.title || title} 
        meta_title={aboutuspageData?.meta_title || meta?.meta_title} 
        meta_description={aboutuspageData?.meta_description || meta?.meta_description}
        meta_canonical={aboutuspageData?.meta_canonical}
        meta_open_graph={aboutuspageData?.meta_open_graph}
        meta_twitter={aboutuspageData?.meta_twitter}
      />
      <AboutHero {...hero} />
      <TeamCounterArea {...counter_area} />
      <AboutAward {...award_area} />
      <AboutBanner {...aboutBanner} />  
      <AboutTestimonial testimonials={testimonial.testimonials}  icons={testimonial.icon} />
      <ContactBanner {...contactBanner} />
      <ClientArea brands={brands.brands} />
    </main>
  );
};

export default About;
