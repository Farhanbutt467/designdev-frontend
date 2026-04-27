"use client";
import Logo from "@/components/elements/logo/Logo";
import ThemeToggle from "../elements/ThemeToggle";
import SideNavModal from "@/components/sideNavModal/SideNavModal";
import ButtonFlip from "../elements/button/ButtonFlip";
import Menu from "../menu/Menu";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ButtonSwap from "../elements/button/ButtonSwap";

type Props = {
  onlyLight?: boolean;
};

const InnerHeader1 = ({ onlyLight = false }: Props) => {
  const { theme } = useTheme();
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      setIsLight(true);
    } else {
      setIsLight(false);
    }
  }, [theme]);

  return (
    <>
      <header className="absolute top-0 inset-x-0 z-50">
        <div className="container">
          <div className="flex h-[80px] 2xl:h-[100px] items-center gap-[20px] relative justify-between">
            <div>
              <Logo light={onlyLight ? true : isLight} />
            </div>
            <div className="pos-center hidden xl:block">
              <Menu
                textColor={cn("text-text", onlyLight && "text-text-fixed-2")}
              />
            </div>
            <div className="flex items-center gap-[20px]">
              <ThemeToggle />
              <div className="hidden md:block">
                <ButtonSwap
                  link="/contact"
                  bgColor={"bg-[#D8544D]"} 
                  textColor={"text-text-fixed-2 text-sm"}
                  arrowWidthHeight="w-[40px] h-[40px]"
                  textClassName="px-[22px] font-normal"
                  rootClassName="wc-swap-btn-sm"
                />
              </div>
              <SideNavModal />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default InnerHeader1;
