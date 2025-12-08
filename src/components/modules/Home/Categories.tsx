
const Categories = () => {
    const categories = ['Adventure', 'Cultural', 'Food & Drink', 'Nature', 'City Tours', 'Historical'];

    return (
        <section className="py-20 px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Tour Categories</h2>
            <div className="flex flex-wrap justify-center gap-4">
                {categories.map((cat) => (
                    <span
                        key={cat}
                        className="bg-gray-100 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition"
                    >
                        {cat}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default Categories;