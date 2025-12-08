
const TopGuides = () => {
    const guides = [
  { name: 'Alice', rating: 4.9 },
  { name: 'Bob', rating: 4.8 },
  { name: 'Charlie', rating: 4.7 },
];
    return (
        <section className="py-20 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Top-Rated Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <div key={guide.name} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold">{guide.name}</h3>
            <p>Rating: {guide.rating} ⭐</p>
          </div>
        ))}
      </div>
    </section>
    );
};

export default TopGuides;