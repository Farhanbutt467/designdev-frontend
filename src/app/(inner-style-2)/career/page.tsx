import { getMainPage } from "@/lib/helper/contentConverter";
import { getAllPages } from "@/lib/helper/contentConverter";
import CareerHero from "@/components/career/CareerHero";
import TeamCommunity from "@/components/team/TeamCommunity";
import CareerHiring from "@/components/career/CareerHiring";
import CareerProcess from "@/components/career/CareerProcess";
import SeoData from "@/components/tools/SeoData";
import { getImageUrl, getpageData } from "@/lib/helper/api";

const Career = async () => {
  const { data: career } = getMainPage("/career/branding/_index.mdx");
  let jobs = getAllPages("/career/branding/positions");

  let { title, hero, community_area, hiring_title, process_area, meta } = career || {};
  const careerpageData = await getpageData("career");
  const careerContent = careerpageData?.content || {};

  // CareerHero Component Data Update from API
  if (careerContent.hero) {
    hero.title = careerContent.hero.title || hero.title;
    hero.subtitle = careerContent.hero.subtitle || hero.subtitle;
    hero.description = careerContent.hero.description || hero.description;
    hero.image = careerContent.hero.image ? getImageUrl(careerContent.hero.image) || hero.image : hero.image;
  }

  // TeamCommunity Component Data Update from API
  if (careerContent.community_area) {
    community_area.title = careerContent.community_area.title || community_area.title;
    community_area.description = careerContent.community_area.description || community_area.description;
  }
  if (careerContent.community_area?.gallery && careerContent.community_area.gallery.length > 0) {
    community_area.gallery = careerContent.community_area.gallery.map((img: any, index: number) => getImageUrl(img) || community_area.gallery[index]);
  }

  // CareerHiring Component Data Update from API
  if (careerContent.hiring_title?.title) {
    hiring_title = careerContent.hiring_title.title;
  }
  if (careerContent.jobs && careerContent.jobs.length > 0) {
    const apiJobs = careerContent.jobs.map((job: any) => ({
      data: {
        title: job.title,
        vacancy: parseInt(job.vacancy) || 0,
      },
      slug: job.slug || "#"
    }));
    jobs = apiJobs;
  }

  // CareerProcess Component Data Update from API
  if (careerContent.process_area) {
    process_area.title = careerContent.process_area.title || process_area.title;
    process_area.description = careerContent.process_area.description || process_area.description;

    if (careerContent.process_area.process_cards && careerContent.process_area.process_cards.length > 0) {
      process_area.process_cards = careerContent.process_area.process_cards.map((card: any, index: number) => ({
        ...process_area.process_cards[index] || {},
        ...card,
        icon: {
          dark: card.icon?.dark ? getImageUrl(card.icon.dark) : process_area.process_cards[index]?.icon?.dark,
          light: card.icon?.light ? getImageUrl(card.icon.light) : process_area.process_cards[index]?.icon?.light,
        }
      }));
    }
  }
  
  return (
    <main>
      <SeoData
        title={title}
        meta_title={meta?.meta_title}
        description={meta?.meta_description}
      />
      <CareerHero {...hero} />
      <TeamCommunity {...community_area} />
      <CareerHiring title={hiring_title} jobs={jobs} />
      <CareerProcess {...process_area} />
    </main>
  );
};

export default Career;
