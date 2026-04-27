import React from 'react';
import { useStore } from '../context/StoreContext';

export const BrandMessageSection = () => {
  const { brandMessage } = useStore();

  return (
    <section className="py-16 md:py-24 px-4 bg-white text-center flex flex-col items-center justify-center max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 uppercase tracking-wide leading-tight whitespace-pre-line">
        {brandMessage.heading}
      </h1>
      <p className="text-gray-600 text-lg md:text-xl max-w-2xl whitespace-pre-line mx-auto">
        {brandMessage.subHeading}
      </p>
    </section>
  );
};
