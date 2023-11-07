import Image, { StaticImageData } from "next/image";

import heroImage1 from "@/public/hero/pierre-chatel-innocenti-pxoZSTdAzeU-unsplash.jpg";
import heroImage2 from "@/public/hero/alex-padurariu-ZR48YvUpk04-unsplash.jpg";
import heroImage4 from "@/public/hero/yoann-siloine-dyaxQ-aoGWY-unsplash.jpg";
import heroImage3 from "@/public/hero/matt-le-SJSpo9hQf7s-unsplash.jpg";

type HeroImageObject = {
  image: StaticImageData;
  borderRadius: string;
};

const images: HeroImageObject[] = [
  { image: heroImage1, borderRadius: "20% 0 0 0" },
  { image: heroImage2, borderRadius: "0 20% 0 0" },
  { image: heroImage3, borderRadius: "0 0 0 20%" },
  { image: heroImage4, borderRadius: "0 0 20% 0" },
];

const HeroSection = () => (
  <section className="container flex justify-between items-center gap-10 w-screen">
    <div className="flex flex-col justify-start gap-5 max-w-xl">
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
    </div>
    <div className="flex-shrink-0">
      <div className="grid grid-cols-2 grid-rows-2 gap-2 grow">
        {images.map((imageObj, index) => (
          <div key={index} className="relative h-52 w-52">
            <Image
              src={imageObj.image}
              alt={`Hero image ${index + 1}`}
              fill
              style={{
                objectFit: "cover",
                borderRadius: `${imageObj.borderRadius}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroSection;
