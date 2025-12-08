
const FeaturedCities = () => {
    const cities = ['Paris', 'Tokyo', 'New York', 'London', 'Bangkok', 'Dubai'];

    return (
        <section className="py-20 px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Cities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {cities.map((city) => (
          <div key={city} className="bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg transition">
            {city}
          </div>
        ))}
      </div>
    </section>
    );
};

export default FeaturedCities;