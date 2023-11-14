type BadgeProps = {
  text: string;
  bgColor: string;
  textColor: string;
};

export type BadgeNode = React.ReactElement<BadgeProps, typeof Badge>;

const Badge = ({ text, bgColor, textColor }: BadgeProps) => (
  <div
    className={`inline-flex items-center  ${bgColor} ${textColor} text-xs font-roboto font-[500] px-4 py-1 rounded-full`}
  >
    {text}
  </div>
);

const Badges = {
  design: () => (
    <Badge
      text="Design"
      bgColor="bg-brand-purple-100"
      textColor="text-brand-purple-900"
    />
  ),
  digital: () => (
    <Badge
      text="Design"
      bgColor="bg-brand-purple-600"
      textColor="text-brand-purple-50"
    />
  ),
  branding: () => (
    <Badge
      text="Design"
      bgColor="bg-fuchsia-600"
      textColor="text-brand-purple-50"
    />
  ),
  paper: () => (
    <Badge
      text="Design"
      bgColor="bg-brand-purple-800"
      textColor="text-brand-purple-50"
    />
  ),
};

export default Badges;
