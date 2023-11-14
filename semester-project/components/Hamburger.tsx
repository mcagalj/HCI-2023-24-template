import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

export type HamburgerProps = {
  open: boolean;
  clickHandler: Dispatch<SetStateAction<boolean>>;
};

const Hamburger = ({ open, clickHandler }: HamburgerProps) => {
  return (
    <div
      className="lg:hidden rounded-full hover:bg-brand-purple-100 hover:cursor-pointer p-2 z-50"
      onClick={() => clickHandler(!open)}
    >
      <Bars3Icon
        className={cn("text-brand-purple-800 w-8 h-8", { hidden: open })}
      />
      <XMarkIcon
        className={cn("text-brand-purple-800 w-8 h-8", { hidden: !open })}
      />
    </div>
  );
};

export default Hamburger;
