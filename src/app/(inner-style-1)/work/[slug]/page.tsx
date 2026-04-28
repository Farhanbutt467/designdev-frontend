import { notFound } from "next/navigation";
import { getImageUrl, getProjectBySlug, getProjects } from "@/lib/helper/api";
import MDXContent from "@/components/tools/MDXContent";
import WorkDetails from "@/components/work/WorkDetails";
import WorkDetailNav from "@/components/elements/workDetails/WorkDetailNav";
import SeoData from "@/components/tools/SeoData";
import { TWorkType } from "@/types";
import Statement from "@/components/tools/mdx/mdx-statement";
import ResultBox from "@/components/tools/mdx/mdx-result-box";

type Props = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  try {
    const projects = await getProjects();
    const paths = projects.map((project: any) => ({
      slug: project.slug,
    }));
    return paths;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
};

const ProjectDetail = async ({ params }: Props) => {
  const { slug } = params;
  const projectData = await getProjectBySlug(slug);

  if (!projectData) {
    notFound();
  }

  // Helper to map gallery safety
  const gallery = projectData.gallery || {};
  
  const processedGallery = {
    big: gallery.big ? getImageUrl(gallery.big) : null,
    split_1: gallery.split_1 ? getImageUrl(gallery.split_1) : null,
    split_2: gallery.split_2 ? getImageUrl(gallery.split_2) : null,
    bottom: gallery.bottom ? getImageUrl(gallery.bottom) : null,
  };

  const project: TWorkType = {
    data: {
      ...projectData,
      image: projectData.image ? getImageUrl(projectData.image) : null,
      thumb_img: projectData.thumb_img ? getImageUrl(projectData.thumb_img) : null,
      tags: Array.isArray(projectData.tags) ? projectData.tags : [],
      client: projectData.client,
      problem_title: projectData.problem_title,
      problem_description: projectData.problem_description,
      results_description: projectData.results_description,
      metrics: projectData.metrics,
      gallery: processedGallery,
    },
    slug: projectData.slug,
    content: projectData.content,
  };

  // Fetch all projects for navigation
  const allProjects = await getProjects();
  const slugs = allProjects.map((p: any) => p.slug);

  const { 
    title, 
    meta_title, 
    meta_description, 
    meta_canonical, 
    meta_open_graph, 
    meta_twitter 
  } = projectData || {};
  const { data } = project;

  return (
    <main>
      <SeoData
        title={title}
        meta_title={meta_title}
        meta_description={meta_description}
        meta_canonical={meta_canonical}
        meta_open_graph={meta_open_graph}
        meta_twitter={meta_twitter}
      />
      <WorkDetails {...project} />

      <div className="container2 result-area">
        {/* Problem Statement Section */}
        {data.problem_description && (
          <div className="pt-[100px] xl:pt-[130px]">
            <Statement 
              title={data.problem_title || "Problem Statement"} 
              description={data.problem_description} 
            />
          </div>
        )}

        {/* Gallery 1: Big Image */}
        {data.gallery?.big && (
          <div className="mt-[60px] xl:mt-[100px]">
             <img src={data.gallery.big} alt="Project main gallery" className="w-full h-auto rounded-sm" />
          </div>
        )}

        {/* Dynamic Content (Markdown Editor) */}
        {project.content && (
          <div className="mt-[60px] xl:mt-[100px]">
            <MDXContent content={project.content} />
          </div>
        )}

        {/* Results & Metrics Section */}
        {(data.results_description || (data.metrics && data.metrics.length > 0)) && (
          <div className="mt-[60px] xl:mt-[100px]">
            <h3 className="text-[24px] md:text-[30px] font-medium mb-[20px]">Results & Metrics</h3>
            {data.results_description && (
              <p className="text-text-3 max-w-[850px]">{data.results_description}</p>
            )}
            
            {data.metrics && data.metrics.length > 0 && (
              <div className="font-primary mt-[33px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {data.metrics.map((metric: any, idx: number) => (
                  <ResultBox key={idx} value={metric.value} title={metric.label} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Gallery 2: Split & Bottom Images */}
        {(data.gallery?.split_1 || data.gallery?.split_2 || data.gallery?.bottom) && (
          <div className="mt-[60px] xl:mt-[100px] pb-[100px] xl:pb-[150px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] lg:gap-[30px]">
              {data.gallery?.split_1 && (
                <img src={data.gallery.split_1} alt="Project gallery 1" className="object-cover w-full h-full rounded-sm" />
              )}
              {data.gallery?.split_2 && (
                <img src={data.gallery.split_2} alt="Project gallery 2" className="object-cover w-full h-full rounded-sm" />
              )}
            </div>
            {data.gallery?.bottom && (
              <img src={data.gallery.bottom} alt="Project gallery bottom" className="object-cover w-full h-full mt-[10px] lg:mt-[30px] rounded-sm" />
            )}
          </div>
        )}
      </div>

      <WorkDetailNav slugs={slugs} params={params} />
    </main>
  );
};

export default ProjectDetail;
