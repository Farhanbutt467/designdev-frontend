export default function FeaturesSection({ data }: { data: any }) {
  return (
    <section className="py-[100px]">
      <div className="container mx-auto text-center">
        {data.heading && <h2 className="text-4xl font-bold mb-10">{data.heading}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fallback layout for content, assuming pure text for now */}
          <div className="p-6 bg-background-2 rounded-lg">
            {data.content && <div dangerouslySetInnerHTML={{ __html: data.content }} />}
          </div>
        </div>
      </div>
    </section>
  );
}
