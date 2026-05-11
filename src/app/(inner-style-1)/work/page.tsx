import SeoData from "@/components/tools/SeoData";
import WorkInner from "@/components/work/WorkInner";
import { getImageUrl, getpageData, getProjects } from "@/lib/helper/api";
import { TWorkType } from "@/types";

const Works = async () => {
  const pageData = await getpageData("work");
  const projectsData = await getProjects();

  const { title, content } = pageData || {};
  const { meta, description, icon } = content || {};

  const projects: TWorkType[] = projectsData.map((project: any) => ({
    data: {
      ...project,
      image: getImageUrl(project.image),
      thumb_img: getImageUrl(project.thumb_img),
      tags: Array.isArray(project.tags) ? project.tags : [],
    },
    slug: project.slug,
    content: project.content,
  }));

  const dynamicIcon = {
     dark: getImageUrl(icon?.dark),
     light: getImageUrl(icon?.light)
  };

  return (
    <main>
      <SeoData
        title={title || "Work"}
        meta_title={meta?.meta_title}
        description={meta?.meta_description}
        seo_meta={pageData?.seo_meta}
      />
      <div className="container2">
        <WorkInner
          title={content?.title || "Works"}
          description={description}
          icon={dynamicIcon}
          projects={projects}
        />
      </div>
    </main>
  );
};

export default Works;
