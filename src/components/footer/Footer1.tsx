import Logo from "@/components/elements/logo/Logo";
import FooterNav from "@/components/footer/FooterNav";
import siteConfig from "@/config/siteConfig.json";
import EmailInput from "@/components/elements/input/EmailInput";
import { SocialShare1 } from "../tools/Social";

type Props = {
  footerNav: {
    id: number;
    title: string;
    children?: {
      name: string;
      path: string;
      isLocation?: boolean;
    }[];
  }[];
  pageSettings?: {
    slug: string;
    title: string;
    value: string;
  }[];
};

const Footer1 = ({ footerNav, pageSettings = [] }: Props) => {
  const { site_info, footer_info, social } = siteConfig;
  const { label, label_2, company } = footer_info?.copyright || {};
  const [firstWord, ...remainingWords] = company.split(" ");

  // Create a map of settings for easy lookup (stores full setting object)
  const settingsMap = (pageSettings || []).reduce((acc: Record<string, any>, curr) => {
    acc[curr.slug] = curr;
    return acc;
  }, {});

  // Dynamically update footer navigation based on database settings
  let locationItemUsed = false;
  const updatedFooterNav = footerNav.reduce((acc: any[], item) => {
    // Identify if this item is a location block (contains isLocation, tel, or mailto)
    const isLocationBlock = item.children?.some(
      (child) =>
        child.isLocation ||
        child.path.startsWith("tel:") ||
        child.path.startsWith("mailto:")
    );

    if (isLocationBlock) {
      // If we already added a location block, skip this one
      if (locationItemUsed) return acc;
      locationItemUsed = true;

      const updatedChildren = (item.children || []).map((child) => {
        if (child.isLocation && settingsMap["address"]?.value) {
          return { ...child, name: settingsMap["address"].value };
        }
        if (child.path.startsWith("tel:") && settingsMap["phone-number"]?.value) {
          return {
            ...child,
            name: settingsMap["phone-number"].value,
            path: `tel:${settingsMap["phone-number"].value}`,
          };
        }
        if (child.path.startsWith("mailto:") && settingsMap["email"]?.value) {
          return {
            ...child,
            name: settingsMap["email"].value,
            path: `mailto:${settingsMap["email"].value}`,
          };
        }
        return child;
      });

      acc.push({
        ...item,
        title: settingsMap["country"]?.value || item.title, // Dynamic country from DB
        children: updatedChildren,
      });
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  return (
    <footer className="main-section-style !rounded-none !mt-0 !pb-0 bg-background-fixed">
      <div className="container large">
        <div className="section-spacing-top pb-[54px] xl:pb-[94px] overflow-hidden grid gap-y-[50px] gap-x-[60px] xl:gap-y-20 xl:gap-x-[60px] justify-between grid-cols-[auto] sm:grid-cols-[auto,auto] md:grid-cols-[auto,auto,auto] xl:grid-cols-[300px,200px,200px,385px] 2xl:grid-cols-[300px,200px,300px,500px]">
          <div className="relative xl:row-span-2">
            <Logo
              light={true}
              url={site_info?.logo_light_2}
              customWidth={200}
              customHeight={54}
              className="max-h-[34px] xl:max-h-[54px] !w-auto"
            />
            <div className="absolute w-[1px] h-[calc(100%+400px)] bg-[#202020] end-0 top-[-200px] hidden xl:block"></div>
          </div>
          {updatedFooterNav.map((item) => (
            <FooterNav key={item.id} {...item} />
          ))}
          <div className=" sm:col-span-2 xl:col-auto lg:row-start-2 xl:row-start-1 xl:col-start-4 order-1 sm:order-0">
            <h2 className="title text-text-fixed-2 text-[22px] xl:text-[30px] leading-[.73]">
              {settingsMap["news-letter"]?.title || "Newsletter"}
            </h2>
            <div className="newstaller_text mt-[29px] text-text-fixed-2">
              <p className="text-[#999999]">
                {settingsMap["news-letter"]?.value || "Feel free to reach out if you want to collaborate with us, or simply have a chat."}
              </p>
            </div>
            <EmailInput />
          </div>

          <div className="">
            <h2 className="title text-text-fixed-2 text-[22px] xl:text-[30px] leading-[.73]">
              Follow Us
            </h2>
            <ul className="flex gap-5 mt-9 ">
              {[
                { name: "facebook", slugs: ["facebook", "facebook-link", "fb"] },
                { name: "instagram", slugs: ["instagram", "instagram-link", "in"] },
                { name: "linkedin", slugs: ["linkedin", "linkedin-link", "li"] },
                { name: "tiktok", slugs: ["tiktok", "tiktok-link"] },
              ].map((item, i) => {
                // Find first available slug in settingsMap
                const dynamicLink = item.slugs.map(s => settingsMap[s]?.value).find(v => v);
                
                // Fallback to siteConfig using broad matching
                const fallbackLink = social.find(s => 
                  item.slugs.some(slug => s.name.toLowerCase().includes(slug) || slug.includes(s.name.toLowerCase()))
                )?.link || "#";
                
                return (
                  <li key={`social_share-${i}`}>
                    {SocialShare1(
                      { 
                        name: item.name, 
                        link: dynamicLink || fallbackLink 
                      },
                      " text-text-fixed-3 hover:text-text-fixed-2 text-2xl"
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className=" border-t border-[#202020]">
        <div className="container large">
          <div className=" py-[22px] xl:py-8 relative">
            <div className="">
              <p className=" text-center font-medium">
                {label}
                <span className="text-text-fixed-2">{firstWord}</span>{" "}
                {remainingWords.join(" ")}
                {label_2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
