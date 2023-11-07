import { FC } from "react";

import LogoIcon from "./icons/LogoIcon";

const Logo: FC = () => (
  <div className="flex items-center justify-between max-w-min gap-2">
    <LogoIcon />
    <span className="font-roboto-condensed font-bold text-3xl whitespace-nowrap">
      design matters.
    </span>
  </div>
);

export default Logo;
