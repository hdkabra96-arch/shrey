import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How long does it take to customize the invitation?',
    answer: 'Typically, it takes 24-48 hours to customize and deliver your video invitation after we receive all the details and payment.',
  },
  {
    question: 'Can I change the music in the video?',
    answer: 'Yes, you can provide your own music or choose from our library. Please share the audio file or a YouTube link with us.',
  },
  {
    question: 'What details do I need to provide?',
    answer: 'We need the event date, time, venue, names of the hosts, and any other specific text you want to include in the invitation.',
  },
  {
    question: 'In what format will I receive the invitation?',
    answer: 'You will receive a high-quality MP4 video file that is optimized for sharing on WhatsApp, Instagram, and other social platforms.',
  },
  {
    question: 'Do you provide printed cards as well?',
    answer: 'Currently, we specialize in digital and video invitations. However, we can provide high-resolution PDF files that you can use for printing.',
  },
];

export const FAQ = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">FREQUENTLY ASKED QUESTIONS</h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
