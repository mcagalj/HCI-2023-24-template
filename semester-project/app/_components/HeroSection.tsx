import HeroImageGrid, { HeroImageObject } from "./HeroImageGrid";
import Button from "@/components/Button";

import heroImage1 from "@/public/hero/pierre-chatel-innocenti-pxoZSTdAzeU-unsplash.jpg";
import heroImage2 from "@/public/hero/alex-padurariu-ZR48YvUpk04-unsplash.jpg";
import heroImage3 from "@/public/hero/matt-le-SJSpo9hQf7s-unsplash.jpg";
import heroImage4 from "@/public/hero/yoann-siloine-dyaxQ-aoGWY-unsplash.jpg";

const images: HeroImageObject[] = [
  { image: heroImage1, borderRadius: "20% 0 0 0" },
  { image: heroImage2, borderRadius: "0 20% 0 0" },
  { image: heroImage3, borderRadius: "0 0 0 20%" },
  { image: heroImage4, borderRadius: "0 0 20% 0" },
];

const HeroSection = () => (
  <section className="container flex justify-between items-center gap-10 w-screen">
    {/*                                                     v (m-auto lg:m-0)    ^mb-8    */}
    <div className="flex flex-col justify-start gap-5 max-w-xl">
      {/* font-playfair text-5xl text-center lg:text-left xl:text-6xl font-extrabold text-brand-purple-900 whitespace-break-spaces */}
      <h1 className="font-playfair text-6xl font-extrabold text-brand-purple-900 whitespace-break-spaces">
        Where Vision Meets Innovation
      </h1>
      <p className="font-roboto text-lg whitespace-break-spaces">
        Welcome to{" "}
        <span className="font-roboto-condensed font-bold text-xl text-brand-purple-900 whitespace-nowrap">
          design matters.
        </span>
        , where creativity knows no bounds and innovation is our guiding
        principle. At our design studio, we believe in the power of visionary
        thinking to transform ordinary concepts into extraordinary experiences.
      </p>

      <div className="flex gap-5 mt-4">
        <Button orange className="text-lg">
          Book a meeting
        </Button>
        <Button purple className="text-lg">
          Learn more
        </Button>
      </div>
    </div>
    {/* hidden lg:block flex-shrink-0 */}
    <div className="flex-shrink-0">
      <HeroImageGrid images={images} />
    </div>
  </section>
);

export default HeroSection;
