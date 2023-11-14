import { FC } from "react";

import LogoIcon from "./icons/LogoIcon";
import { cn } from "@/lib/utils";

interface LogoProps {
  isDark?: boolean;
}

const Logo: FC<LogoProps> = ({ isDark }) => (
  <div className="flex items-center justify-between max-w-min gap-2">
    <LogoIcon />
    <span
      className={cn(
        "font-roboto-condensed font-bold text-3xl whitespace-nowrap",
        { "text-brand-purple-900": !isDark, "text-brand-purple-200": isDark }
      )}
    >
      design matters.
    </span>
  </div>
);

export default Logo;
