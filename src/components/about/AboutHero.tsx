"use client";

import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import MarketingSectionTitle from "../sectionTitle/MarketingSectionTitle";
import ImageComponent from "../tools/ImageComponent";

type Props = {
  title: string;
  sub_title: string;
  description: string;
};

const AboutHero = ({ title, sub_title, description }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  useGSAP(
    () => {
      hasFadeAnim();
    },
    { scope: containerRef }
  );
  return (
    <section ref={containerRef} className="container">
      <div className="pb-[53px] xl:pb-[83px] 2xl:pb-[133px] pt-[50px] xl:pt-[80px] 2xl:pt-[100px] flex flex-col items-center text-center">
        <div className="w-full text-center flex justify-center">
          <MarketingSectionTitle
            title={title}
            className="inner-section-title has_fade_anim large md:text-center font-normal"
            heading1
            animation="has_fade_anim"
          />
        </div>
        <div className="flex flex-col items-center text-center mt-6 xl:mt-11">
          <div className="has_fade_anim mb-4" data-fade-from="top">
            <span className="text-[16px] xl:text-[20px] uppercase font-plusjakartasans font-medium inline-flex gap-[15px] items-center">
              <ImageComponent
                src="/assets/imgs/shape/img-s-29.png"
                darkSrc="/assets/imgs/shape/img-s-29-light.png"
                width={60}
                height={15}
                alt="subtitle-shape img"
                className="h-[10px] xl:h-auto"
              />
              {sub_title}
            </span>
          </div>
          <div>
            <p className="has_fade_anim max-w-[800px] mx-auto text-[16px] md:text-[18px] xl:text-[20px] leading-[1.4]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
