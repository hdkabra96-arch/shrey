import React from 'react';
import { Search, MessageSquare, CreditCard, Send } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    icon: Search,
    title: 'Browse through our templates',
    description: 'Select the template that fits your occasion and style perfectly.',
  },
  {
    icon: MessageSquare,
    title: 'Share the product code',
    description: 'Send us the product code via WhatsApp or our contact form.',
  },
  {
    icon: Send,
    title: 'We customize the invitation',
    description: 'Our designers will customize the template with your details and send it to you.',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">HOW DO I PLACE AN ORDER?</h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-primary" />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="absolute left-[calc(50%+2.5rem)] top-8 hidden w-[calc(100%-2rem)] border-t border-dashed border-muted-foreground/40 md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
