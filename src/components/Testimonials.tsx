import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Bride',
    content: 'The video invitation was absolutely stunning! Everyone loved it and it made our wedding announcement so special.',
    rating: 5,
  },
  {
    name: 'Rahul Mehta',
    role: 'Event Planner',
    content: 'Shreyas Magical Touch has the best collection of traditional yet modern templates. Their service is quick and professional.',
    rating: 5,
  },
  {
    name: 'Anjali Gupta',
    role: 'Mother',
    content: 'Ordered a birthday video for my son. It was so cute and the customization was exactly how I wanted it.',
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="bg-primary/5 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">WHAT PEOPLE ARE SAYING</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-md">
                <CardContent className="flex flex-col p-8">
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-6 flex-grow italic text-muted-foreground">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
