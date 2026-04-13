import React from "react";
import navigation from "@/config/navigation.json";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import Footer1 from "@/components/footer/Footer1";
import ToolsComponent from "@/components/tools";
import ScrollTop from "@/components/tools/ScrollTop";
import { getPageSettings } from "@/lib/helper/api";
import InnerHeader1 from "@/components/headers/InnerHeader1";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pageSettings = await getPageSettings();
  return (
    <div className="instrument-ai root-layout" theme-setting="style-4">
      <ScrollSmootherComponent />
      <ToolsComponent />
      <ScrollTop />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="pb-[15px] 2xl:pb-[50px]">
            <InnerHeader1 />
            <div>{children}</div>
            <Footer1 footerNav={navigation.footer1} pageSettings={pageSettings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
