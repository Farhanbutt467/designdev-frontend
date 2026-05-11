import BlogArea from "@/components/blog/BlogArea";
import BlogFeatureArea from "@/components/blog/BlogFeatureArea";
import FeaturedPost from "@/components/blog/FeaturedPost";
import SeoData from "@/components/tools/SeoData";
import { getBlogs, getFeaturedBlogs, getImageUrl, getpageData } from "@/lib/helper/api";
import { TBlogType } from "@/types";

const BlogPage = async () => {
  const blogsData = await getBlogs();
  const featuredBlogsData = await getFeaturedBlogs();
  const pageData = await getpageData("blog");

  const blogs: TBlogType[] = blogsData.map((blog: any) => ({
    data: {
      ...blog,
      image: getImageUrl(blog.image),
      thumb_img: getImageUrl(blog.thumb_img),
      author_image: getImageUrl(blog.author_image),
    },
    slug: blog.slug,
    content: blog.content,
  }));

  const featuredBlogs: TBlogType[] = featuredBlogsData.map((blog: any) => ({
    data: {
      ...blog,
      image: getImageUrl(blog.image),
      thumb_img: getImageUrl(blog.thumb_img),
      author_image: getImageUrl(blog.author_image),
    },
    slug: blog.slug,
    content: blog.content,
  }));

  const { title, content } = pageData || {};
  const { feature, blog_area, meta } = content || {};

  return (
    <main>
      <SeoData
        title={title || "Blog"}
        meta_title={meta?.meta_title}
        description={meta?.meta_description}
        seo_meta={pageData?.seo_meta}
      />
      <BlogFeatureArea 
        title={feature?.title} 
        description={feature?.description} 
        total_post={feature?.total_post}
        writer_count={feature?.writer_count}
        image={getImageUrl(feature?.image)} 
      />
      <FeaturedPost blogs={featuredBlogs} />
      <BlogArea blogs={blogs} title={blog_area?.title} />
    </main>
  );
};

export default BlogPage;
