import { MDXRemote } from "next-mdx-remote/rsc";
import mdx from "./mdx";
import WorkStep from "./mdx/mdx-work-step";
import FeatureContent from "./mdx/branding/mdx-feature-content";
import { getImageUrl } from "@/lib/helper/api";
import { title } from "process";

const MDXContent = ({ content, serviceData }: { content?: any, serviceData?: any }) => {
  const {
    mdx_title,
    items,
    intro_text_1,
    intro_text_2,
    working_steps,
    gallery_images,
    feature_heading,
    feature_image,
    feature_description_1,
    feature_description_2
  } = serviceData || {};

  const hasDynamicContent = (items && items.length > 0) || mdx_title || intro_text_1 || intro_text_2 || (working_steps && working_steps.length > 0) || (gallery_images && gallery_images.length > 0) || feature_heading || feature_image;

  if (hasDynamicContent) {
    return (
      <div className="container2 pt-[30px] lg:pt-[30px]">
        {(mdx_title || (items && items.length > 0)) && (
          <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[80px] items-start"> 
                {mdx_title && (
                  <h2 className="text-[40px] lg:text-[40px] xl:text-[50px] leading-[1.05] font-bold mt-[60px]">
                    {mdx_title}
                  </h2>
                )}

                {items && items.length > 0 && (
                <div className="grid grid-cols-1 mt-[40px] lg:grid-cols-2 gap-x-[60px] gap-y-[14px]">
                  {items.slice(0, 8).map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-[12px] text-[16px] lg:text-[18px]">
                      <span className="mt-[4px] text-[18px] font-medium leading-none">+</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
            )}
            </div>
          </div>
        )}
        {intro_text_1 && <p className="mb-6">{intro_text_1}</p>}
        {intro_text_2 && <p className="mb-6">{intro_text_2}</p>}

        {working_steps && working_steps.length > 0 && (
          <div className="border-0 lg:border-t-[1px] mt-[66px]">
            <div className="working-steps grid gap-y-[40px] gap-x-[30px] sm:grid-cols-2 lg:grid-cols-4">
              {working_steps.map((step: any, idx: number) => (
                <WorkStep key={idx} title={step.title} description={step.description}/>
              ))}
            </div>
          </div>
        )}

        {gallery_images && gallery_images.length > 0 && (
          <div className="mt-[53px] grid gap-[10px] grid-cols-2 lg:gap-[30px] sm:grid-cols-3">
            {gallery_images.map((img: string, idx: number) => (
              <img key={idx} src={getImageUrl(img)} alt={`gallery-${idx}`} className="w-full object-cover"/>
            ))}
          </div>
        )}

        {(feature_heading || feature_image) && (
          <div className="features-area section-spacing-top">
            {feature_heading && (
              <h2 className="text-[30px] lg:text-[40px] xl:text-[50px] leading-[1.1] mb-[30px] font-semibold">
                {feature_heading}
              </h2>
            )}
            {feature_image && (
              <FeatureContent 
                img={getImageUrl(feature_image)}
                description1={feature_description_1 || ''}
                description2={feature_description_2 || ''}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  if (!content) return null;

  // Check if content is HTML (likely from CKEditor)
  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  if (isHtml) {
    return (
      <div 
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  }

  return (
    <>
      {/* @ts-ignore */}
      <MDXRemote source={content} components={mdx} />
    </>
  );
};

export default MDXContent;
