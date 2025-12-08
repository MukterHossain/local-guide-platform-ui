import React from 'react';

const PopularDestinations = () => {
    const destinations = ['Bali', 'Rome', 'Istanbul', 'Sydney'];

    return (
        <section className="py-20 px-6 bg-blue-50">
            <h2 className="text-3xl font-bold mb-8 text-center">Popular Destinations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {destinations.map((dest) => (
                    <div key={dest} className="bg-white p-6 rounded-lg text-center hover:shadow-md transition">
                        {dest}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularDestinations;