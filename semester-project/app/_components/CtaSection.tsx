import Image from "next/image";
import Button from "@/components/Button";
import image from "@/public/cta/etty-fidele-AzVexpHvuKY-unsplash.jpg";

const CtaSection = () => (
  <div className="bg-brand-purple-800 w-full">
    <section className="container flex justify-center items-center gap-10 w-full ">
      <div>
        <div className="relative h-80 w-80 brightness-125 saturate-50">
          <Image
            src={image}
            alt={"CTA image"}
            fill
            style={{
              objectFit: "cover",
              borderRadius: "10%",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 max-w-lg whitespace-nowrap">
        <div>
          <h1 className="font-roboto-condensed text-3xl font-extrabold text-brand-purple-50">
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
