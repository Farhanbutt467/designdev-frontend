export default function TextSection({ data }: { data: any }) {
  return (
    <section className="py-[60px]">
      <div className="container mx-auto">
        {data.heading && <h2 className="text-3xl font-bold mb-6">{data.heading}</h2>}
        {data.content && (
          <div className="prose max-w-none text-lg">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        )}
      </div>
    </section>
  );
}
