import Badges from "@/components/Badge";
import Button from "@/components/Button";
import TestimonialCard, { TestimonialCardProps } from "./TestimonialCard";

import testimonial1 from "@/public/testimonials/balazs-ketyi-LPWl2pEVGKc-unsplash.jpg";
import testimonial2 from "@/public/testimonials/hal-gatewood-tZc3vjPCk-Q-unsplash.jpg";
import testimonial3 from "@/public/testimonials/slidebean-TY3pj5q72tw-unsplash.jpg";
import testimonial4 from "@/public/testimonials/kelly-sikkema-sX_OIy4_HF8-unsplash.jpg";

const testimonials: TestimonialCardProps[] = [
  {
    image: testimonial1,
    title: "New Design System",
    body: "Our team's dedicated efforts culminated in the successful creation of a new design system for our valued customer, revolutionizing their digital presence.",
    badge: <Badges.design />,
  },
  {
    image: testimonial2,
    title: "Design From Scratch",
    body: "Empowering visions to life, our design company specializes in crafting extraordinary experiences from the ground up.",
    badge: <Badges.digital />,
  },
  {
    image: testimonial3,
    title: "Brand Transformation",
    body: "With strategic creativity and unwavering dedication, our design company orchestrates brand transformations that captivate audiences.",
    badge: <Badges.branding />,
  },
  {
    image: testimonial4,
    title: "Book Cover Design",
    body: "Crafting captivating visual stories, our book cover designs capture the essence of narratives, inviting readers on enchanting journeys with their creativity.",
    badge: <Badges.paper />,
  },
];

const TestimonialsSection = () => (
  <section className="container flex flex-col gap-10 lg:gap-20 items-center">
    <div className="text-center mt-4">
      <h1 className="sm:hidden font-roboto-condensed text-3xl font-extrabold text-brand-purple-900">
        Our Customers Stories
      </h1>
      <h1 className="hidden sm:block font-roboto-condensed text-3xl font-extrabold text-brand-purple-900">
        What our Customers are Saying
      </h1>
      <h4 className="sm:hidden font-roboto text-xl text-brand-purple-400">
        Check These Case Studies
      </h4>
      <h4 className="hidden sm:block font-roboto text-xl text-brand-purple-400">
        Read Case Studies of our Happy Customers
      </h4>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.title} {...testimonial} />
      ))}
    </div>
    <Button
      orange
      className="mb-10 text-base xl:text-lg xl:px-8"
      iconClassName="xl:w-4 xl:h-4"
    >
      View showcases
    </Button>
  </section>
);

export default TestimonialsSection;
