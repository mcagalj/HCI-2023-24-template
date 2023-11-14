import Image, { StaticImageData } from "next/image";
import Button from "@/components/Button";
import { BadgeNode } from "@/components/Badge";

export type TestimonialCardProps = {
  image: StaticImageData;
  title: string;
  body: string;
  badge: BadgeNode;
};

const TesimonialCard = ({
  image,
  title,
  body,
  badge,
}: TestimonialCardProps) => (
  <div className="flex flex-col max-w-[550px] min-w-[300px] xl:max-w-[450px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <Image
      className="w-full h-48 object-cover object-center"
      sizes="50vw"
      src={image}
      placeholder="blur"
      alt="Card header"
    />
    <div className="flex-1 flex flex-col justify-between px-6 py-4">
      <div className="mb-8">
        <h2 className="text-2xl font-roboto-condensed font-bold text-brand-purple-800 mb-4">
          {title}
        </h2>
        <p className="font-roboto text-brand-gray-500 leading-6">{body}</p>
      </div>
      <div className="flex justify-between items-center">
        <Button purple className="text-sm px-4 py-2" iconClassName="w-3 h-3">
          Read more
        </Button>
        {badge}
      </div>
    </div>
  </div>
);

export default TesimonialCard;
