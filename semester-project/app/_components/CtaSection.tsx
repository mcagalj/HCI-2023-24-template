import Image from "next/image";
import Button from "@/components/Button";
import image from "@/public/cta/etty-fidele-AzVexpHvuKY-unsplash.jpg";

const CtaSection = () => (
  <div className="bg-brand-purple-800 w-full">
    <section className="pb-8 lg:container flex flex-wrap justify-center items-center gap-10 w-full ">
      <div className="relative h-96 w-full lg:h-80 lg:w-80 brightness-125 saturate-50">
        <Image
          src={image}
          placeholder="blur"
          alt={"CTA image"}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="lg:rounded-lg"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="px-5 lg:px-0 flex flex-col gap-5 max-w-lg">
        <div>
          <h1 className="sm:hidden font-roboto-condensed text-3xl font-extrabold text-brand-purple-50">
            Grow Your Business
          </h1>
          <h1 className="hidden sm:block font-roboto-condensed text-3xl font-extrabold text-brand-purple-50">
            Grow Your Business With Us
          </h1>
          <h4 className="font-roboto text-xl text-brand-purple-600">
            Beautify your website and brand
          </h4>
        </div>
        <p className="font-roboto text-brand-purple-200 whitespace-break-spaces">
          Our clients are the most creative and creative of any firm in the
          world. Whether it is a project to sell to or a design project to sell
          to, they all want unique results and products. Our design &
          development teams focuses on finding the perfect fit for all.
        </p>
        <Button orange className="text-base">
          Start your design journey
        </Button>
      </div>
    </section>
  </div>
);

export default CtaSection;
