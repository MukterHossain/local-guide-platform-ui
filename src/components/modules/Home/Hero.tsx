import React from 'react';

const Hero = () => {
    return (
        <section className="bg-blue-600 text-white py-32 px-6 text-center">
      <h1 className="text-5xl font-bold mb-6">Discover Your Next Adventure</h1>
      <p className="mb-8 text-lg">Find local guides and unique experiences worldwide.</p>
      <input
        type="text"
        placeholder="Where are you going?"
        className="w-full max-w-md p-4 rounded-lg text-black"
      />
    </section>
    );
};

export default Hero;