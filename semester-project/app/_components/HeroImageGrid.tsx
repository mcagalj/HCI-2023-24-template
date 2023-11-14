import Image, { StaticImageData } from "next/image";

export type HeroImageObject = {
  image: StaticImageData;
  borderRadius: string;
};

export type HeroImageGridProps = {
  images: HeroImageObject[];
};

const HeroImageGrid = ({ images }: HeroImageGridProps) => {
  return (
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
  );
};

export default HeroImageGrid;
