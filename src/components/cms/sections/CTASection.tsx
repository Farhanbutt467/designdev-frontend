export default function CTASection({ data }: { data: any }) {
  return (
    <section className="bg-text text-background py-[80px]">
      <div className="container mx-auto text-center">
        {data.heading && <h2 className="text-4xl font-bold mb-6">{data.heading}</h2>}
        {data.content && (
          <p className="text-lg max-w-xl mx-auto mb-8">{data.content}</p>
        )}
        <button className="px-8 py-4 bg-theme text-text-fixed rounded-full font-bold uppercase tracking-wider hover:opacity-90">
          Get Started
        </button>
      </div>
    </section>
  );
}
