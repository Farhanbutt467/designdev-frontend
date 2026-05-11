import React from "react";
import { getAllPages, getMainPage } from "@/lib/helper/contentConverter";
import navigation from "@/config/navigation.json";



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
import { getPageSettings, getpageData, getImageUrl, getBlogs, getServices, getProjects, getClientsArea } from "@/lib/helper/api";

const Marketing = async () => {
  const { data: hero } = getMainPage("/heros/marketing-hero.mdx");
  const { data: image } = getMainPage("/image/marketing-image.mdx");
  const { data: feature } = getMainPage("/features/marketing-features.mdx");
  const { data: service } = getMainPage("/services/marketing/_main.mdx");
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
  const homepageData = await getpageData("home");
  const homeContent = homepageData?.content || {};

  //Services
  const selectedServices = (await getServices())
  .slice(0, 4)
  .map((item: any) => ({
    slug: item.slug,
    data: {
      id: item.id,
      title: item.title,
      description: item.description,
      bg_video: "/assets/videos/services-bg-video.mp4",
    },
  }));
  if (homeContent.service) {
    service.title = homeContent.service.title || service.title;
    service.subtitle = homeContent.service.subtitle || service.subtitle;
    service.meta_text = homeContent.service.meta_text || service.meta_text;
    service.description = homeContent.service.description || service.description;
  }

  //Projects
  const allProjects = await getProjects();
  const latestProjects = allProjects.slice(0, 5);
  const displayWorks = latestProjects.map((item: any, index: number) => ({
    slug: item.slug,
    data: {
      id: item.id,
      title: item.title,
      image: getImageUrl(item.image),
      tags: item.tags ? (Array.isArray(item.tags) ? item.tags : [item.tags]) : ["Project"],
    },
  }));

 

  // If we have backend data, ensure we use it to override static sections
  // We'll prioritize dynamic content by assigning it to our variables used in components
  if (homeContent.hero) {
    hero.title = homeContent.hero.title || hero.title;
    hero.sub_title = homeContent.hero.sub_title || hero.sub_title;

    if (homeContent.hero.info) {
      hero.info.description = homeContent.hero.info.description || hero.info.description;
      hero.info.customers = homeContent.hero.info.customers || hero.info.customers;
      if (homeContent.hero.info.client_img?.light) {
        hero.info.client_img.light = getImageUrl(homeContent.hero.info.client_img.light);
        hero.info.client_img.dark = hero.info.client_img.light;
      }
      if (homeContent.hero.info.action_btn?.label) {
        hero.info.action_btn.label = homeContent.hero.info.action_btn.label;
      }
    }

    // New Customer Statistics field
    if (homeContent.hero.customer) {
      if (homeContent.hero.customer.text) {
        hero.info.customer_text = homeContent.hero.customer.text;
      }
      if (homeContent.hero.customer.icon) {
        hero.info.client_img.light = getImageUrl(homeContent.hero.customer.icon);
        hero.info.client_img.dark = hero.info.client_img.light;
      }
    }

    if (homeContent.hero.shape_1?.light) {
      hero.shape_1.light = getImageUrl(homeContent.hero.shape_1.light);
      hero.shape_1.dark = hero.shape_1.light;
    }
    if (homeContent.hero.shape_2?.light) {
      hero.shape_2.light = getImageUrl(homeContent.hero.shape_2.light);
      hero.shape_2.dark = hero.shape_2.light;
    }

    // Dynamic Banner Image and Video for MarketingImage section
    if (homeContent.hero.banner_image) {
      image.image = getImageUrl(homeContent.hero.banner_image);
    }
    if (homeContent.hero.banner_video) {
      image.video = getImageUrl(homeContent.hero.banner_video);
    }
  }


  if (homeContent.feature?.title) {
    feature.title = homeContent.feature.title;
  }

  // Handle dynamic features list
  const rawFeatures = homeContent.features ? (Array.isArray(homeContent.features) ? homeContent.features : Object.values(homeContent.features)) : [];
  const processedFeatures = rawFeatures
    .filter((f: any) => f && f.title)
    .map((f: any) => ({
      icon: getImageUrl(f.icon),
      title: f.title,
      description: f.description || ""
    }));

  if (processedFeatures.length > 0) {
    feature.features = processedFeatures;
  }


  if (homeContent.about) {
    about.title = homeContent.about.title || about.title;
    about.sub_title = homeContent.about.sub_title || about.sub_title;
    about.description = homeContent.about.description || about.description;
    about.image = getImageUrl(homeContent.about.image) || about.image;
  }

  if (homeContent.testimonial?.title) {
    testimonial.title = homeContent.testimonial.title;
  }

  // Handle dynamic testimonials list
  const rawTestimonials = homeContent.testimonials ? (Array.isArray(homeContent.testimonials) ? homeContent.testimonials : Object.values(homeContent.testimonials)) : [];
  if (rawTestimonials.length > 0) {
    const dynamicTestimonials = rawTestimonials
      .filter((t: any) => t && t.author?.name)
      .map((t: any) => ({
        text: t.text || "",
        icon: testimonial.testimonials[0]?.icon || { light: "", dark: "" }, // keep default icon/quote
        author: {
          name: t.author.name,
          post: t.author.post || "",
          avatar: getImageUrl(t.author.avatar) || ""
        }
      }));

    if (dynamicTestimonials.length > 0) {
      testimonial.testimonials = dynamicTestimonials;
    }
  }

  if (homeContent.funFact) {
    funFact.title = homeContent.funFact.title || funFact.title;
    funFact.sub_title = homeContent.funFact.sub_title || funFact.sub_title;
    funFact.description = homeContent.funFact.description || funFact.description;
    funFact.projects = homeContent.funFact.projects || funFact.projects;
    funFact.customers = homeContent.funFact.customers || funFact.customers;
    funFact.experiences = homeContent.funFact.experiences !== undefined ? Number(homeContent.funFact.experiences) : funFact.experiences;
    funFact.awards = homeContent.funFact.awards !== undefined ? Number(homeContent.funFact.awards) : funFact.awards;
  }

  if (homeContent.blog) {
    blog.title = homeContent.blog.title || blog.title;
    blog.subtitle = homeContent.blog.subtitle || blog.subtitle;
    blog.description = homeContent.blog.description || blog.description;
  }

  // Handle dynamic blogs from API
  const allBlogs = await getBlogs();
  const latestBlogs = allBlogs.slice(0, 3).map((blog: any) => ({
    data: {
      ...blog,
      title2: blog.title,
      short_description: blog.content ? blog.content.substring(0, 150) + "..." : "",
      location: blog.category || "Marketing",
      image: getImageUrl(blog.image),
      thumb_img: getImageUrl(blog.thumb_img),
      author_image: getImageUrl(blog.author_image),
      date: blog.published_date,
    },
    slug: blog.slug,
    content: blog.content,
  }));

  if (homeContent.banner) {
    banner.title = homeContent.banner.title || banner.title;
    banner.sub_title = homeContent.banner.sub_title || banner.sub_title;
    banner.image = getImageUrl(homeContent.banner.image) || banner.image;
  }

 

  if (homeContent.workMain) {
    workMain.title = homeContent.workMain.title || workMain.title;
    workMain.sub_title = homeContent.workMain.sub_title || "";
    if (homeContent.workMain.action_btn) {
      workMain.action_btn = {
        ...workMain.action_btn,
        label: homeContent.workMain.action_btn.label || workMain.action_btn.label,
        link: homeContent.workMain.action_btn.link || workMain.action_btn.link,
      };
    }
  }


  if (homeContent.report) {
    report.title = homeContent.report.title || report.title;
    report.sub_title = homeContent.report.sub_title || report.sub_title;
    report.description = homeContent.report.description || report.description;
    report.image = getImageUrl(homeContent.report.image) || report.image;
  }

  if (homeContent.clientTitle) {
    clientTitle.title = homeContent.clientTitle.title || clientTitle.title;
    clientTitle.image = getImageUrl(homeContent.clientTitle.image) || clientTitle.image;
  }

  // Handle dynamic brands list from Client Area API
  const clientAreaData = await getClientsArea();
  const displayBrands = clientAreaData.map((item: any) => ({
    image: {
      dark: getImageUrl(item.image_dark),
      light: getImageUrl(item.image_light),
    },
  }));

  return (
    <div className="plus-jakarta root-layout" theme-setting="style-5">
      <SeoData
        title={homepageData?.title || "Arolax Marketing Agency"}
        seo_meta={homepageData?.seo_meta}
      />
      <main>
        <MarketingHero {...hero} />
        <MarketingImage {...image} />
        <MarketingFeature {...feature} />
        <MarketingService {...service} services={selectedServices} />
        <MarketingWork {...workMain} projects={displayWorks} />
        <MarketingAbout {...about} />
        <MarketingTestimonial {...testimonial} />
        <MarketingFunFact {...funFact} />
        <MarketingBanner {...banner} />
        <MarketingReport {...report} />
        <MarketingClients {...clientTitle} clients={displayBrands} />
        <MarketingBlog blogs={latestBlogs} {...blog} />
      </main>
    </div>
  );
};

export default Marketing;
