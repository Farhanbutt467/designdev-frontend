import React from "react";
import navigation from "@/config/navigation.json";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ToolsComponent from "@/components/tools";
import ScrollTop from "@/components/tools/ScrollTop";
import InnerHeader1 from "@/components/headers/InnerHeader1";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pageSettings = await getPageSettings();
  return (
    <div className="plus-jakarta root-layout" theme-setting="style-5">
      <ScrollSmootherComponent />
      <ToolsComponent />
      <ScrollTop />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <InnerHeader1 />
          <div className=" ">{children}</div>
          <Footer1 footerNav={navigation.footer1} pageSettings={pageSettings} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
