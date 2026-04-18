import TeamHero from "@/components/team/TeamHero";
import TeamImageArea from "@/components/team/TeamImageArea";
import TeamArea from "@/components/team/TeamArea";
import TeamCounterArea from "@/components/team/TeamCounterArea";
import TeamCommunity from "@/components/team/TeamCommunity";
import { getAllPages, getMainPage } from "@/lib/helper/contentConverter";
import SeoData from "@/components/tools/SeoData";
import { getpageData, getImageUrl } from "@/lib/helper/api";

const TeamPage = async () => {
  const { data: teamInnerData } = getMainPage("/team/main/_index.mdx");
  const staticMembers = getAllPages("/team/main");
  const dynamicTeamData = await getpageData("team");
  const teamContent = dynamicTeamData?.content || {};

  // Clone to avoid mutating original
  const finalData = { ...teamInnerData };

  // Override static data with dynamic data
  if (teamContent.hero) {
    finalData.hero = {
      ...(finalData.hero || {}),
      title: teamContent.hero.title || (finalData.hero?.title || ""),
      description: teamContent.hero.description || (finalData.hero?.description || ""),
      total_client: teamContent.hero.total_client || (finalData.hero?.total_client || ""),
      total_client_label: teamContent.hero.total_client_label || "Happy Clients",
      action_btn: {
        ...(finalData.hero?.action_btn || {}),
        label: teamContent.hero.action_btn?.label || (finalData.hero?.action_btn?.label || ""),
        link: teamContent.hero.action_btn?.link || (finalData.hero?.action_btn?.link || ""),
        enable: teamContent.hero.action_btn?.enable == "1" || teamContent.hero.action_btn?.enable === true
      }
    };
  }

  if (teamContent.image) {
    finalData.image = getImageUrl(teamContent.image);
  }

  if (teamContent.total_employee) {
    finalData.total_employee = teamContent.total_employee;
  }
  
  if (teamContent.total_employee_label) {
    finalData.total_employee_label = teamContent.total_employee_label;
  }

  if (teamContent.team_area) {
    finalData.team_area = {
      ...(finalData.team_area || {}),
      title: teamContent.team_area.title || (finalData.team_area?.title || ""),
      description: teamContent.team_area.description || (finalData.team_area?.description || "")
    };
  }


  // Handle Dynamic Team Members
  let finalMembers = staticMembers;
  if (teamContent.members) {
    const rawMembers = Array.isArray(teamContent.members) ? teamContent.members : Object.values(teamContent.members);
    if (rawMembers.length > 0) {
      finalMembers = rawMembers.map((m: any, index: number) => ({
        data: {
          id: index + 100, // Use offset to avoid ID collision
          name: m.name || "",
          post: m.designation || "",
          image: getImageUrl(m.image),
          avatar: getImageUrl(m.image), // Sometimes both are used
          social: "Linkedin",
          social_link: m.social_link || "#",
          description: ""
        },
        slug: `member-${index}`

      }));
    }
  }

  if (teamContent.counter_area) {
    finalData.counter_area = {
      ...(finalData.counter_area || {}),
      client_count: teamContent.counter_area.client_count !== null ? teamContent.counter_area.client_count : (finalData.counter_area?.client_count || 0),
      client_title: teamContent.counter_area.client_title || (finalData.counter_area?.client_title || ""),
      funding_count: teamContent.counter_area.funding_count !== null ? teamContent.counter_area.funding_count : (finalData.counter_area?.funding_count || 0),
      funding_title: teamContent.counter_area.funding_title || (finalData.counter_area?.funding_title || ""),
      thumb1: teamContent.counter_area.thumb1 ? getImageUrl(teamContent.counter_area.thumb1) : (finalData.counter_area?.thumb1 || ""),
      thumb2: teamContent.counter_area.thumb2 ? getImageUrl(teamContent.counter_area.thumb2) : (finalData.counter_area?.thumb2 || ""),
      thumb3: teamContent.counter_area.thumb3 ? getImageUrl(teamContent.counter_area.thumb3) : (finalData.counter_area?.thumb3 || ""),
    };
  }


  if (teamContent.community_area) {
    finalData.community_area = {
      ...(finalData.community_area || {}),
      title: teamContent.community_area.title || (finalData.community_area?.title || ""),
      description: teamContent.community_area.description || (finalData.community_area?.description || "")
    };

    if (teamContent.community_area.gallery) {
      const rawGallery = Array.isArray(teamContent.community_area.gallery) 
        ? teamContent.community_area.gallery 
        : Object.values(teamContent.community_area.gallery);
      
      if (rawGallery.length > 0) {
        finalData.community_area.gallery = rawGallery.map((img: any) => getImageUrl(img));
      }
    }
  }

  if (teamContent.meta) {
    finalData.meta = {
      ...finalData.meta,
      meta_title: teamContent.meta.meta_title || (finalData.meta?.meta_title || teamInnerData.meta?.meta_title),
      meta_description: teamContent.meta.meta_description || (finalData.meta?.meta_description || teamInnerData.meta?.meta_description),
    };
  }

  return (
    <main>
      <SeoData
        meta_title={finalData.meta?.meta_title}
        description={finalData.meta?.meta_description}
      />
      <TeamHero {...finalData.hero} />
      <TeamImageArea totalEmployee={finalData.total_employee} totalEmployeeLabel={finalData.total_employee_label} image={finalData.image} />

      <TeamArea teamMembers={finalMembers} {...finalData.team_area} />
      <TeamCounterArea {...finalData.counter_area} />
      <TeamCommunity {...finalData.community_area} />
    </main>
  );
};

export default TeamPage;

