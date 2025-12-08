
const Testimonials = () => {
    const testimonials = [
  { name: 'Emma', review: 'Amazing guide, had the best experience!' },
  { name: 'Liam', review: 'Highly recommend this platform!' },
  { name: 'Sophia', review: 'Easy booking, great service!' },
];
    return (
        <section className="py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-8">What People Say</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-gray-100 p-6 rounded-lg flex-1">
            <p>{t.review}</p>
            <p className="mt-4 font-semibold">- {t.name}</p>
          </div>
        ))}
      </div>
    </section>
    );
};

export default Testimonials;