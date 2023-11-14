import { ReactNode, MouseEvent } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// ChatGPT
type ButtonProps = {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  orange?: boolean;
  purple?: boolean;
  className?: string;
  iconClassName?: string;
};

const Button = ({
  children,
  className,
  iconClassName,
  onClick,
  orange,
  purple,
}: ButtonProps) => {
  const buttonClasses = cn(
    "transition duration-300 ease-in-out",
    "group flex items-center gap-2 text-lg max-w-min whitespace-nowrap",
    "px-6 py-3 rounded-sm font-roboto font-medium",
    {
      "bg-brand-orange-600 hover:bg-brand-orange-800 text-brand-orange-50":
        orange,
      "text-brand-purple-800 hover:text-brand-purple-50": !orange,
      "border-2 border-brand-purple-800 hover:bg-brand-purple-800": purple,
    },
    className
  );

  return (
    <button className={buttonClasses} onClick={onClick}>
      <span>{children}</span>{" "}
      <ChevronRightIcon
        className={cn(
          "w-3 h-3 stroke-[3] transition-transform duration-300 ease-in-out transform group-hover:translate-x-1",
          iconClassName
        )}
      />
    </button>
  );
};

export default Button;
