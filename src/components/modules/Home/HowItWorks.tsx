import React from 'react';

const HowItWorks = () => {
    const steps = ['Search a city', 'Choose a guide', 'Book your tour', 'Enjoy the experience'];

    return (
        <section className="py-20 px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
                {steps.map((step) => (
                    <div key={step} className="bg-gray-100 p-6 rounded-lg flex-1">
                        {step}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;