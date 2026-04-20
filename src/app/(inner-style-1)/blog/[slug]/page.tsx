import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogs, getImageUrl } from "@/lib/helper/api";
import MDXContent from "@/components/tools/MDXContent";
import BlogDetailsTop from "@/components/blog/BlogDetailsTop";
import BlogDetailsLeft from "@/components/blog/BlogDetailsLeft";
import BlogTags from "@/components/blog/BlogTags";
import CommentForm from "@/components/blog/CommentForm";
import BlogInnerArea from "@/components/blog/BlogInnerArea";
import SeoData from "@/components/tools/SeoData";
import { TBlogType } from "@/types";

type Props = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const blogs = await getBlogs();
  const paths = blogs.map((blog: any) => ({
    slug: blog.slug,
  }));

  return paths;
};

const BlogDetail = async ({ params }: Props) => {
  const { slug } = params;
  console.log(`[BlogDetail] Fetching blog for slug: ${slug}`);
  
  const blogData = await getBlogBySlug(slug);

  if (!blogData) {
    console.error(`[BlogDetail] Blog not found for slug: ${slug}`);
    notFound();
  }

  const blog: TBlogType = {
    data: {
      ...blogData,
      image: getImageUrl(blogData.image),
      thumb_img: getImageUrl(blogData.thumb_img),
    },
    slug: blogData.slug,
    content: blogData.content,
  };

  const { title, views, shares, tags, meta_title, meta_description } = blogData || {};
  
  // Fetch related blogs (all blogs for now, mapped correctly)
  const allBlogsData = await getBlogs();
  const allBlogs: TBlogType[] = allBlogsData.map((b: any) => ({
    data: {
      ...b,
      image: getImageUrl(b.image),
      thumb_img: getImageUrl(b.thumb_img),
    },
    slug: b.slug,
    content: b.content,
  }));

  return (
    <main>
      <SeoData
        title={title}
        meta_title={meta_title}
        description={meta_description}
      />
      <div className="container2">
        <div className="pt-[127px] xl:pt-[147px] 2xl:pt-[217px]">
          <BlogDetailsTop {...blog} />
          <div className="mt-[60px] lg:mt-20 xl:mt-[100px] grid lg:grid-cols-[80px,1fr] xl:grid-cols-[80px,850px] gap-y-[30px] gap-x-[60px] xl:gap-x-[140px]">
            <BlogDetailsLeft
              views={views}
              shares={shares}
              title={title}
              description={meta_description}
            />
            <div>
              <MDXContent content={blog.content} />
              <BlogTags tags={tags} />
              <CommentForm />
            </div>
          </div>
          <BlogInnerArea blogs={allBlogs.slice(0, 3)} />
        </div>
      </div>
    </main>
  );
};

export default BlogDetail;




