export default function HeroSection({ data }: { data: any }) {
  return (
    <section className="bg-theme text-text-fixed pt-[150px] pb-[100px] text-center">
      <div className="container mx-auto">
        {data.heading && <h1 className="text-5xl md:text-7xl font-bold mb-6">{data.heading}</h1>}
        {data.content && <p className="text-xl max-w-2xl mx-auto mb-8">{data.content}</p>}
        {data.image && (
          <div className="mt-10">
            <img src={`http://localhost:8000/storage/${data.image}`} alt={data.heading} className="mx-auto rounded-lg shadow-lg max-w-full" />
          </div>
        )}
      </div>
    </section>
  );
}
